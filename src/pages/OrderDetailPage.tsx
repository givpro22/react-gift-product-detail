import ProductActionBar from "@/components/productDetail/ProductActionBar";
import ProductBasicSummary from "@/components/productDetail/ProductBasicSummary";
import ProductTabSection from "@/components/productDetail/ProductTabSection";
import { useParams } from "react-router-dom";

function OrderDetailPage() {
  const { productId } = useParams();

  return (
    <>
      <ProductBasicSummary />
      <ProductTabSection />
      <ProductActionBar />
    </>
  );
}

export default OrderDetailPage;
