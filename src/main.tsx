import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme/index";
import { AuthProvider } from "./contexts/AuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import { OrderFormProvider } from "./contexts/OrderFormContext";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OrderFormProvider>
        <OrderProvider>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </AuthProvider>
        </OrderProvider>
      </OrderFormProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
