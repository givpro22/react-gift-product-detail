import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  actionBarWrapperStyle,
  orderButtonStyle,
  wishSectionStyle,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useProductWishCount } from "@/api/query";
import { useUpdateWishCountMutation } from "@/api/mutations";

function ProductActionBar() {
  const { productId } = useParams();
  const { data } = useProductWishCount(productId);
  const navigate = useNavigate();
  const { mutate } = useUpdateWishCountMutation();

  if (!data) return null;
  if (!productId) {
    return;
  }
  const handleOrderClick = () => {
    navigate(`/order/${productId}`);
  };

  return (
    <div css={actionBarWrapperStyle}>
      <div
        css={wishSectionStyle}
        onClick={() => {
          mutate(productId);
        }}
      >
        {data.data.isWished ? (
          <AiFillHeart size={20} color="red" />
        ) : (
          <AiOutlineHeart size={20} />
        )}
        <span>{data?.data.wishCount}</span>
      </div>
      <button css={orderButtonStyle} onClick={handleOrderClick}>
        주문하기
      </button>
    </div>
  );
}

export default ProductActionBar;
