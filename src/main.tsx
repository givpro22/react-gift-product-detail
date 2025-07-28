import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme/index";
import { AuthProvider } from "./contexts/AuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import { OrderFormProvider } from "./contexts/OrderFormContext";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query";
import { ErrorBoundary } from "./utils/ErrorBoundary";
import LoadingPage from "./pages/LoadingPage";
import NotFoundPage from "./pages/NotFoundPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<NotFoundPage />}>
        <Suspense fallback={<LoadingPage />}>
          <OrderFormProvider>
            <OrderProvider>
              <AuthProvider>
                <ThemeProvider theme={theme}>
                  <App />
                </ThemeProvider>
              </AuthProvider>
            </OrderProvider>
          </OrderFormProvider>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);
