import ProductActionBar from "@/components/productDetail/ProductActionBar";
import ProductSummary from "@/components/productDetail/ProductSummary";
import ProductTabSection from "@/components/productDetail/ProductTabSection";
import { useParams } from "react-router-dom";

function OrderDetailPage() {
  const { productId } = useParams();

  return (
    <>
      <ProductSummary />
      <ProductTabSection />
      <ProductActionBar />
    </>
  );
}

export default OrderDetailPage;
