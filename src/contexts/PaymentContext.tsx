
import React, { createContext, useContext, useState } from 'react';
import { usePiAuth } from './PiAuthContext';
import { createPayment, completePayment } from '@/config/piNetwork';
import { toast } from 'sonner';

interface PaymentContextType {
  isProcessingPayment: boolean;
  payWithPi: (amount: number, memo: string) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType>({
  isProcessingPayment: false,
  payWithPi: async () => false
});

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, login } = usePiAuth();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const payWithPi = async (amount: number, memo: string): Promise<boolean> => {
    // If user is not logged in, try to authenticate first
    if (!user) {
      const authResult = await login();
      if (!authResult) {
        toast.error('يجب تسجيل الدخول أولاً للدفع باستخدام Pi');
        return false;
      }
    }
    
    setIsProcessingPayment(true);
    
    try {
      // Create the payment
      const paymentData = await createPayment(amount, memo);
      
      if (!paymentData) {
        toast.error('فشل في إنشاء عملية الدفع');
        return false;
      }
      
      // Get payment ID based on the structure returned from Pi SDK
      const paymentId = typeof paymentData === 'object' ? 
        (paymentData as any).identifier || (paymentData as any).paymentId || (paymentData as any)._id : 
        paymentData;
        
      if (!paymentId) {
        toast.error('لم يتم الحصول على رقم تعريف للدفع');
        return false;
      }
      
      // Complete the payment
      const completedPayment = await completePayment(paymentId);
      
      if (completedPayment && (completedPayment as any).status === 'COMPLETED') {
        toast.success('تمت عملية الدفع بنجاح!');
        return true;
      } else {
        toast.error('فشلت عملية الدفع');
        return false;
      }
    } catch (error) {
      console.error('Error processing Pi payment:', error);
      toast.error('حدث خطأ أثناء معالجة الدفع');
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };
  
  return (
    <PaymentContext.Provider value={{ 
      isProcessingPayment,
      payWithPi
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
