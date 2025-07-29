import ApiErrorBoundary from "@/components/common/Error/ApiErrorBoundary";
import { HorizontalSpacing } from "@/components/common/Spacing/HorizontalSpacing";
import ProductActionBar from "@/components/productDetail/ProductActionBar";
import ProductBasicSummary from "@/components/productDetail/ProductBasicSummary";
import ProductTabSection from "@/components/productDetail/ProductTabSection";

function OrderDetailPage() {
  return (
    <>
      <ApiErrorBoundary>
        <ProductBasicSummary />
      </ApiErrorBoundary>
      <HorizontalSpacing size="spacing2" />
      <ApiErrorBoundary>
        <ProductTabSection />
      </ApiErrorBoundary>
      <ApiErrorBoundary>
        <ProductActionBar />
      </ApiErrorBoundary>
    </>
  );
}

export default OrderDetailPage;
