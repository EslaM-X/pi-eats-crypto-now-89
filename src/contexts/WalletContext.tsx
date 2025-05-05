
import { WalletProvider, useWallet } from './wallet/WalletContext';
import { 
  Transaction, 
  TransactionType, 
  TransactionStatus, 
  WalletContextType,
  WalletBalance
} from './wallet/WalletTypes';

export { 
  WalletProvider, 
  useWallet 
};

export type {
  Transaction,
  TransactionType,
  TransactionStatus,
  WalletContextType,
  WalletBalance
};

// Export the context as default
export default WalletProvider;
