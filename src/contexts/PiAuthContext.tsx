
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { authenticateWithPi, initializePiSDK } from '@/config/piNetwork';

type PiUser = {
  username: string;
  uid?: string;
  accessToken?: string;
  walletAddress?: string;
};

interface PiAuthContextType {
  user: PiUser | null;
  isAuthenticating: boolean;
  login: () => Promise<PiUser | null>;
  logout: () => void;
}

const PiAuthContext = createContext<PiAuthContextType>({
  user: null,
  isAuthenticating: false,
  login: async () => null,
  logout: () => {},
});

export const usePiAuth = () => useContext(PiAuthContext);

export const PiAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PiUser | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  useEffect(() => {
    // Initialize Pi SDK when component mounts
    const Pi = initializePiSDK();
    
    // Check for existing authenticated session
    const checkAuth = async () => {
      try {
        if (Pi && Pi.currentUser) {
          const auth = await Pi.currentUser();
          if (auth) {
            setUser({
              username: auth.username,
              uid: auth.uid,
              accessToken: auth.accessToken,
              walletAddress: auth.walletAddress
            });
          }
        }
      } catch (error) {
        console.error('Error checking Pi authentication:', error);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (): Promise<PiUser | null> => {
    setIsAuthenticating(true);
    
    try {
      const auth = await authenticateWithPi();
      
      if (auth) {
        const userData: PiUser = {
          username: auth.username,
          uid: auth.uid,
          accessToken: auth.accessToken,
          walletAddress: auth.walletAddress
        };
        
        setUser(userData);
        toast.success(`مرحباً ${auth.username}!`);
        return userData;
      } else {
        toast.error('فشل تسجيل الدخول باستخدام Pi Network');
        return null;
      }
    } catch (error) {
      console.error('Error during Pi login:', error);
      toast.error('حدث خطأ أثناء محاولة تسجيل الدخول');
      return null;
    } finally {
      setIsAuthenticating(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    toast.info('تم تسجيل الخروج بنجاح');
  };
  
  return (
    <PiAuthContext.Provider value={{ user, isAuthenticating, login, logout }}>
      {children}
    </PiAuthContext.Provider>
  );
};

export default PiAuthProvider;
