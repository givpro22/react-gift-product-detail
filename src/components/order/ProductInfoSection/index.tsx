import { useParams } from "react-router-dom";
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

  const { setProductPrice, setProductName } = useOrder();

  const { data: product } = useProductSummaryQuery(productId);

  useEffect(() => {
    if (product) {
      setProductPrice(product.price);
      setProductName(product.name);
    }
  }, [product, setProductName, setProductPrice]);

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
