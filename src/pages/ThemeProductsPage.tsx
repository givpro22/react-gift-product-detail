import ThemeHeroSection from "@/components/themeProducts/ThemeHeroSection";
import ThemeProductList from "@/components/themeProducts/ThemeProductList";
import { Suspense } from "react";
import LoadingPage from "../components/common/Loading/LoadingPage";

function ThemeProductsPage() {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <ThemeHeroSection />
        <ThemeProductList />
      </Suspense>
    </>
  );
}

export default ThemeProductsPage;
