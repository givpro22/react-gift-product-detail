import { AiOutlineHeart } from "react-icons/ai";
import {
  actionBarWrapperStyle,
  orderButtonStyle,
  wishSectionStyle,
} from "./styles";
import { useParams } from "react-router-dom";
import { useProductWishCount } from "@/api/query";

function ProductActionBar() {
  const { productId } = useParams();
  const { data } = useProductWishCount(productId);
  console.log(data);
  if (!data) return null;

  return (
    <div css={actionBarWrapperStyle}>
      <div css={wishSectionStyle}>
        <AiOutlineHeart size={20} />
        <span>{data?.data.wishCount}</span>
      </div>
      <button css={orderButtonStyle}>주문하기</button>
    </div>
  );
}

export default ProductActionBar;
