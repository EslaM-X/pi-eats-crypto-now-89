
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { WalletContextType, WalletProviderProps, Transaction } from './WalletTypes';
import { generateMockTransactions, createTransaction } from './WalletUtils';

// Create the context with a default undefined value
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Custom hook to use the wallet context
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
};

// Provider component
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);
  const [piBalance, setPiBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [piTransactions, setPiTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize with mock data
  useEffect(() => {
    refreshWallet();
    refreshPiWallet();
  }, []);
  
  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction = createTransaction(
      transaction.amount,
      transaction.type,
      transaction.status,
      transaction.description
    );
    
    // Update the appropriate transaction list
    if (transaction.type === 'send' || transaction.type === 'receive') {
      setPiTransactions(prev => [newTransaction, ...prev]);
      
      // Update balances
      if (transaction.status === 'completed') {
        if (transaction.type === 'send') {
          setPiBalance(prev => prev - transaction.amount);
        } else {
          setPiBalance(prev => prev + transaction.amount);
        }
      }
    } else {
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Update balance for rewards
      if (transaction.status === 'completed' && transaction.type === 'reward') {
        setBalance(prev => prev + transaction.amount);
      }
    }
    
    toast.success(`Transaction ${newTransaction.id} added successfully`);
  };
  
  // Send Pi to another user (mock implementation)
  const sendPi = async (amount: number, recipient: string, memo?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        try {
          if (amount <= 0) {
            setError('Amount must be greater than 0');
            setLoading(false);
            resolve(false);
            return;
          }
          
          if (amount > piBalance) {
            setError('Insufficient balance');
            setLoading(false);
            resolve(false);
            return;
          }
          
          // Add a new send transaction
          addTransaction({
            amount,
            type: 'send',
            status: 'completed',
            description: memo || `Payment to ${recipient}`
          });
          
          setLoading(false);
          resolve(true);
        } catch (e: any) {
          setError(e.message || 'Failed to send Pi');
          setLoading(false);
          resolve(false);
        }
      }, 1000); // Simulate network delay
    });
  };
  
  // Refresh wallet data
  const refreshWallet = () => {
    setLoading(true);
    
    setTimeout(() => {
      try {
        // Generate mock PiEat wallet data
        setBalance(parseFloat((Math.random() * 100 + 10).toFixed(2)));
        setTransactions(generateMockTransactions(15));
        setLoading(false);
      } catch (e: any) {
        setError(e.message || 'Failed to refresh wallet data');
        setLoading(false);
      }
    }, 800); // Simulate network delay
  };
  
  // Refresh Pi wallet data
  const refreshPiWallet = () => {
    setLoading(true);
    
    setTimeout(() => {
      try {
        // Generate mock Pi wallet data
        setPiBalance(parseFloat((Math.random() * 100 + 25).toFixed(2)));
        setPiTransactions(generateMockTransactions(20));
        setLoading(false);
      } catch (e: any) {
        setError(e.message || 'Failed to refresh Pi wallet data');
        setLoading(false);
      }
    }, 800); // Simulate network delay
  };

  // Build the value object for the context provider
  const value: WalletContextType = {
    balance,
    piBalance,
    transactions,
    piTransactions,
    loading,
    error,
    addTransaction,
    sendPi,
    refreshWallet,
    refreshPiWallet
  };

  // Return the context provider
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export default WalletContext;
