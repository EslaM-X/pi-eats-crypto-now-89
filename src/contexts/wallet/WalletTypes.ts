
import { ReactNode } from 'react';

export type TransactionType = 'send' | 'receive' | 'reward';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  timestamp: Date;
}

export interface WalletBalance {
  pi: number;
  ptm: number;
}

export interface WalletContextType {
  balance: WalletBalance;
  transactions: Transaction[];
  piTransactions: Transaction[];
  loading: boolean;
  error: string | null;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  sendPi: (amount: number, recipient: string, memo?: string) => Promise<boolean>;
  refreshWallet: () => void;
  refreshPiWallet: () => void;
  fetchBalance: () => void;
}

export interface WalletProviderProps {
  children: ReactNode;
}
