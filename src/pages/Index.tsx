import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { PaymentButton } from '@/components/PaymentButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Crown, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, isPro } = useProfile();

  // Show loading only briefly for auth check
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Pro App Demo</h1>
            <p className="text-muted-foreground">
              {user ? `Welcome back, ${user.email}` : 'Experience our Pro features demo'}
            </p>
          </div>
          <div className="flex gap-2">
            {user ? (
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline">Sign In / Sign Up</Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Account Status
                {isPro && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
                    <Crown className="w-3 h-3 mr-1" />
                    PRO
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Plan:</span>
                <span className="font-medium">
                  {isPro ? 'Pro (Lifetime)' : 'Free'}
                </span>
              </div>
              {user && (
                <div className="flex items-center justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
              )}
              {!user && (
                <div className="p-3 bg-blue-50 rounded-lg border">
                  <p className="text-sm text-blue-700">
                    <strong>Demo Mode:</strong> Sign in to access your personal account and make purchases.
                  </p>
                </div>
              )}
              {isPro && (
                <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border">
                  <div className="flex items-center gap-2 text-orange-700">
                    <Crown className="w-4 h-4" />
                    <span className="font-medium">Pro Features Unlocked!</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pro Plan Features */}
          <Card>
            <CardHeader>
              <CardTitle>Pro Plan Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Unlimited access to all features</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Priority customer support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Crown className="w-4 h-4 text-purple-500" />
                  <span>Exclusive Pro-only content</span>
                </div>
              </div>

              {!isPro && (
                <div className="pt-4">
                  <PaymentButton />
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    One-time payment • Lifetime access
                  </p>
                </div>
              )}

              {isPro && (
                <div className="pt-4 text-center">
                  <p className="text-green-600 font-medium">
                    ✓ You have lifetime Pro access!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Feature Demo */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>App Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Basic Feature</h3>
                <p className="text-sm text-muted-foreground">
                  Available to all users
                </p>
              </div>
              <div className={`p-4 border rounded-lg ${!isPro ? 'opacity-50' : ''}`}>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  Pro Feature 1
                  <Crown className="w-4 h-4 text-yellow-500" />
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isPro ? 'Unlocked with Pro plan' : 'Requires Pro plan'}
                </p>
              </div>
              <div className={`p-4 border rounded-lg ${!isPro ? 'opacity-50' : ''}`}>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  Pro Feature 2
                  <Crown className="w-4 h-4 text-yellow-500" />
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isPro ? 'Unlocked with Pro plan' : 'Requires Pro plan'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
