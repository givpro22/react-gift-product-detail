import { useProductBasicSummary } from "@/api/query";
import { useParams } from "react-router-dom";
import {
  brandImageStyle,
  brandWrapper,
  imageStyle,
  nameStyle,
  priceStyle,
  textBlock,
  wrapperStyle,
} from "./styles";

function ProductBasicSummary() {
  const { productId } = useParams();
  const { data } = useProductBasicSummary(productId);

  if (!data) return null;

  const { imageURL, name, price, brandInfo } = data.data;

  return (
    <div css={wrapperStyle}>
      <img src={imageURL} alt={name} css={imageStyle} />
      <div css={textBlock}>
        <p css={nameStyle}>{name}</p>
        <p css={priceStyle}>{price.sellingPrice.toLocaleString()}원</p>
        <div css={brandWrapper}>
          <img
            src={brandInfo.imageURL}
            alt={brandInfo.name}
            css={brandImageStyle}
          />
          <span>{brandInfo.name}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductBasicSummary;
