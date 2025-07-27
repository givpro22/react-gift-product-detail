import { HorizontalSpacing } from "@/components/common/Spacing/HorizontalSpacing";
import ProductActionBar from "@/components/productDetail/ProductActionBar";
import ProductBasicSummary from "@/components/productDetail/ProductBasicSummary";
import ProductTabSection from "@/components/productDetail/ProductTabSection";

function OrderDetailPage() {
  return (
    <>
      <ProductBasicSummary />
      <HorizontalSpacing size="spacing2" />
      <ProductTabSection />
      <ProductActionBar />
    </>
  );
}

export default OrderDetailPage;
