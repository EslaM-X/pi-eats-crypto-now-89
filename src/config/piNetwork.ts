
/**
 * Pi Network SDK Integration
 * Documentation: https://github.com/pi-apps/pi-platform-docs
 */

// Initialize Pi SDK
export const initializePiSDK = () => {
  if (typeof window.Pi === 'undefined') {
    console.error('Pi SDK is not loaded. Please check if the script is included properly.');
    return null;
  }

  try {
    // Initialize Pi SDK with your app configurations
    const Pi = window.Pi;
    Pi.init({ 
      version: "2.0",
      sandbox: false // Set to true for testing
    });
    
    console.log('Pi SDK initialized successfully');
    return Pi;
  } catch (error) {
    console.error('Error initializing Pi SDK:', error);
    return null;
  }
};

// Authenticate user with Pi Network
export const authenticateWithPi = async () => {
  const Pi = window.Pi;

  if (!Pi) {
    console.error('Pi SDK not available');
    return null;
  }

  try {
    // Authenticate and get user info
    const auth = await Pi.authenticate(
      ['username', 'payments', 'wallet_address'], 
      onIncompletePaymentFound
    );

    console.log('Pi authentication successful:', auth);
    return auth;
  } catch (error) {
    console.error('Pi authentication error:', error);
    return null;
  }
};

// Handle incomplete payments
const onIncompletePaymentFound = (payment: any) => {
  console.log("Incomplete payment found:", payment);
  // Implement your incomplete payment handling logic here
  return;
};

// Create a payment
export const createPayment = async (amount: number, memo: string) => {
  const Pi = window.Pi;
  
  if (!Pi) {
    console.error('Pi SDK not available');
    return null;
  }

  try {
    const paymentData = await Pi.createPayment({
      amount: amount.toString(),
      memo: memo,
      metadata: { order_id: generateOrderId() }
    });
    
    console.log('Payment created:', paymentData);
    return paymentData;
  } catch (error) {
    console.error('Error creating payment:', error);
    return null;
  }
};

// Complete a payment
export const completePayment = async (paymentId: string) => {
  const Pi = window.Pi;
  
  if (!Pi) {
    console.error('Pi SDK not available');
    return null;
  }

  try {
    const completedPayment = await Pi.completePayment(paymentId);
    console.log('Payment completed:', completedPayment);
    return completedPayment;
  } catch (error) {
    console.error('Error completing payment:', error);
    return null;
  }
};

// Generate a random order ID
const generateOrderId = () => {
  return 'ORDER_' + Math.floor(Math.random() * 1000000).toString();
};

// Declare Pi global type
declare global {
  interface Window {
    Pi?: any;
  }
}
