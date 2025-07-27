import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import HomePage from "@/pages/HomePage";
import LogoutPage from "@/pages/LogoutPage";
import OrderPage from "@/pages/OrderPage";
import AppLayout from "@/components/layout/AppLayout";
import RequireAuth from "@/components/auth/RequireAuth";
import ThemeProductsPage from "@/pages/ThemeProductsPage";
import OrderDetailPage from "@/pages/OrderDetailPage";

export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  MYPAGE: "/my",
  ORDER: "/order/:productId",
  PRODCUT: "/themes/:themeId",
  ORDERDETAIL: "/product/:productId",
  NOT_FOUND: "*",
};

export default function Router() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={ROUTES.ROOT} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path={ROUTES.MYPAGE} element={<LogoutPage />} />
            <Route path={ROUTES.ORDERDETAIL} element={<OrderDetailPage />} />
            <Route path={ROUTES.ORDER} element={<OrderPage />} />
          </Route>

          <Route path={ROUTES.PRODCUT} element={<ThemeProductsPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
