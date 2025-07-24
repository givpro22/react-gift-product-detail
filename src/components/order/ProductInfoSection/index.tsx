import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import {
  titleStyle,
  cardStyle,
  imageStyle,
  nameStyle,
  brandStyle,
  priceStyle,
  priceValueStyle,
} from "./styles";
import { useEffect } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { useProductSummaryQuery } from "@/api/query";

function ProductInfoSection() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { setProductPrice, setProductName } = useOrder();

  const { data: product, error } = useProductSummaryQuery(productId);

  useEffect(() => {
    if (error) {
      toast.error("상품 정보를 불러오지 못했습니다.");
      navigate("/");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (product) {
      setProductPrice(product.price);
      setProductName(product.name);
    }
  }, [product, setProductName, setProductPrice]);

  if (!product) return null;

  return (
    <div css={whiteSectionStyle()}>
      <h3 css={titleStyle}>상품 정보</h3>
      <div css={cardStyle}>
        <img src={product.imageURL} alt={product.name} css={imageStyle} />
        <div>
          <div css={nameStyle}>{product.name}</div>
          <div css={brandStyle}>{product.brandName}</div>
          <div css={priceStyle}>
            상품가{" "}
            <span css={priceValueStyle}>
              {product.price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoSection;
