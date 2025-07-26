import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function PaymentCanceled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-orange-600">
            <XCircle className="h-6 w-6" />
            Payment Canceled
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your payment was canceled. No charges were made to your account.
          </p>
          <p className="text-sm">
            You can try again anytime or contact support if you need help.
          </p>
          
          <div className="flex flex-col gap-2">
            <Link to="/">
              <Button className="w-full">Return Home</Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full">
                Try Payment Again
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}