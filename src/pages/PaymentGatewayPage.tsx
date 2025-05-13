import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils'; // Assuming cn utility for classnames

interface PaymentMethodProps {
  method: string;
  description: string;
  icon?: React.ReactNode; // Optional icon for payment method
  onClick: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodProps> = ({ method, description, icon, onClick }) => {
  return (
    <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={onClick}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {method}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const PaymentGatewayPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handlePaymentMethodClick = (method: string) => {
    setSelectedMethod(method);
  };

  const renderPaymentFields = () => {
    switch (selectedMethod) {
      case 'Internet Banking':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Your Bank</h3>
            {/* Placeholder for bank selection dropdown */}
            <select className="w-full p-2 border rounded">
              <option value="">Select Bank</option>
              <option value="bank1">Bank 1</option>
              <option value="bank2">Bank 2</option>
              <option value="bank3">Bank 3</option>
            </select>
            <Button className="w-full">Proceed with Internet Banking</Button>
          </div>
        );
      case 'UPI':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enter UPI ID</h3>
            {/* Placeholder for UPI ID input */}
            <input type="text" placeholder="Your UPI ID" className="w-full p-2 border rounded" />
            <Button className="w-full">Proceed with UPI</Button>
          </div>
        );
      case 'Card':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enter Card Details</h3>
            {/* Placeholder for card details input */}
            <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Expiry Date (MM/YY)" className="p-2 border rounded" />
              <input type="text" placeholder="CVV" className="p-2 border rounded" />
            </div>
            <input type="text" placeholder="Cardholder Name" className="w-full p-2 border rounded" />
            <Button className="w-full">Pay with Card</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center mb-8">
        {/* Placeholder for project logo */}
        <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-lg font-bold">
          Logo
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Payment Method</h1>

      <div className="max-w-md mx-auto space-y-4">
        <PaymentMethodCard
          method="Internet Banking"
          description="Pay using your preferred bank's net banking portal."
          onClick={() => handlePaymentMethodClick('Internet Banking')}
        />

        <PaymentMethodCard
          method="UPI"
          description="Pay instantly using your UPI app."
          onClick={() => handlePaymentMethodClick('UPI')}
        />

        <PaymentMethodCard
          method="Credit/Debit Card"
          description="Pay securely with your Visa, Mastercard, or other cards."
          onClick={() => handlePaymentMethodClick('Card')}
        />

        <PaymentMethodCard
          method="Digital Wallets"
          description="Use popular digital wallets like Paytm, Google Pay, etc."
          onClick={() => handlePaymentMethodClick('Wallet')}
        />

        <Separator className="my-6" />

        {selectedMethod && renderPaymentFields()}

        <div className="text-center text-sm text-muted-foreground">
          Your payment is secure and encrypted.
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayPage;