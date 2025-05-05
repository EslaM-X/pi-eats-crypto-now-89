
import { Transaction, TransactionType, TransactionStatus } from './WalletTypes';
import { v4 as uuidv4 } from 'uuid';

// Generate mock transactions for demonstration purposes
export const generateMockTransactions = (count: number = 10): Transaction[] => {
  const transactions: Transaction[] = [];
  
  const types: TransactionType[] = ['send', 'receive', 'reward'];
  const statuses: TransactionStatus[] = ['completed', 'pending', 'failed'];
  const descriptions = [
    'Food order payment',
    'Restaurant deposit',
    'Transfer to PiEat wallet',
    'Weekly mining reward',
    'Friend payment',
    'Grocery purchase',
    'Service fee',
    'Subscription payment',
    'Top-up bonus',
    'Referral reward'
  ];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Generate timestamp within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    transactions.push({
      id: uuidv4(),
      amount: parseFloat((Math.random() * 50 + 1).toFixed(2)),
      type,
      status: Math.random() > 0.2 ? 'completed' : (Math.random() > 0.5 ? 'pending' : 'failed'),
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      timestamp: date
    });
  }
  
  // Sort by timestamp, newest first
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Create a new transaction with automatically generated id and timestamp
export const createTransaction = (
  amount: number, 
  type: TransactionType, 
  status: TransactionStatus, 
  description: string
): Transaction => {
  return {
    id: uuidv4(),
    amount,
    type,
    status,
    description,
    timestamp: new Date()
  };
};
