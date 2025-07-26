import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { refreshProfile } = useProfile();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    } else {
      setVerifying(false);
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { session_id: sessionId }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        setVerified(true);
        // Refresh profile to get updated Pro status
        refreshProfile();
        toast({
          title: "Payment Successful!",
          description: "Your Pro plan has been activated.",
        });
      } else {
        toast({
          title: "Payment verification failed",
          description: data.message || "Please contact support.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast({
        title: "Verification Error",
        description: "Unable to verify payment. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-red-600">Invalid Payment Link</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This payment confirmation link is invalid.
            </p>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            {verifying ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Verifying Payment...
              </>
            ) : verified ? (
              <>
                <CheckCircle className="h-6 w-6 text-green-600" />
                Payment Successful!
              </>
            ) : (
              "Payment Verification Failed"
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {verifying ? (
            <p className="text-muted-foreground">
              Please wait while we verify your payment...
            </p>
          ) : verified ? (
            <>
              <p className="text-muted-foreground">
                Congratulations! Your Pro plan has been activated successfully.
              </p>
              <p className="text-sm text-green-600 font-medium">
                You now have lifetime access to all Pro features!
              </p>
            </>
          ) : (
            <p className="text-muted-foreground">
              We couldn't verify your payment. Please contact support if this issue persists.
            </p>
          )}
          
          <Link to="/">
            <Button className="w-full">
              {verified ? "Go to Dashboard" : "Return Home"}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}