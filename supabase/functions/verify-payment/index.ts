import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting payment verification process");

    const { session_id } = await req.json();
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("Session retrieved:", session.id, "Status:", session.payment_status);

    // Use service role key to update records
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    if (session.payment_status === "paid") {
      // Update order status
      const { error: orderError } = await supabaseService
        .from("orders")
        .update({ status: "paid" })
        .eq("stripe_session_id", session_id);

      if (orderError) {
        console.error("Order update error:", orderError);
        throw new Error(`Failed to update order: ${orderError.message}`);
      }

      // Get the order to find the user
      const { data: order, error: fetchError } = await supabaseService
        .from("orders")
        .select("user_id")
        .eq("stripe_session_id", session_id)
        .single();

      if (fetchError || !order) {
        console.error("Order fetch error:", fetchError);
        throw new Error("Failed to find order");
      }

      // Update user profile to Pro status
      const { error: profileError } = await supabaseService
        .from("profiles")
        .update({ is_pro: true })
        .eq("user_id", order.user_id);

      if (profileError) {
        console.error("Profile update error:", profileError);
        throw new Error(`Failed to update profile: ${profileError.message}`);
      }

      console.log("Payment verified and user upgraded to Pro");

      return new Response(JSON.stringify({ 
        success: true, 
        message: "Payment verified and Pro status activated" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Payment not completed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});