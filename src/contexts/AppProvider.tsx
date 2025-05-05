
import React from "react";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import { PiAuthProvider } from "./PiAuthContext";
import { PiPriceProvider } from "./PiPriceContext";
import { PaymentProvider } from "./PaymentContext";
import { CartProvider } from "./CartContext";
import { HomeFoodProvider } from "./homefood/HomeFoodContext";
import { OrdersProvider } from "./OrdersContext";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PiAuthProvider>
          <PiPriceProvider>
            <PaymentProvider>
              <CartProvider>
                <OrdersProvider>
                  <HomeFoodProvider>
                    {children}
                  </HomeFoodProvider>
                </OrdersProvider>
              </CartProvider>
            </PaymentProvider>
          </PiPriceProvider>
        </PiAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
