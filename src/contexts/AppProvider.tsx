
import React from "react";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import { PiAuthProvider } from "./PiAuthContext";
import { PiPriceProvider } from "./PiPriceContext";
import { PaymentProvider } from "./PaymentContext";
import { CartProvider } from "./CartContext";
import { HomeFoodProvider } from "./homefood/HomeFoodContext";
import { OrdersProvider } from "./OrdersContext";
import { WalletProvider } from "./wallet/WalletContext";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PiAuthProvider>
          <PiPriceProvider>
            <WalletProvider>
              <PaymentProvider>
                <CartProvider>
                  <OrdersProvider>
                    <HomeFoodProvider>
                      {children}
                    </HomeFoodProvider>
                  </OrdersProvider>
                </CartProvider>
              </PaymentProvider>
            </WalletProvider>
          </PiPriceProvider>
        </PiAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
