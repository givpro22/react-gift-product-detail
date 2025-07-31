import { useTheme } from "@emotion/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  gridStyle,
  itemStyle,
  rankStyle,
  imageStyle,
  nameStyle,
  emptyResultsStyle,
} from "./styles";
import { fetchRankingProducts, type Product } from "@/api/products";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function RankingGrid() {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mainFilter = searchParams.get("main");
  const subFilter = searchParams.get("sub");
  const { data = [] } = useSuspenseQuery<Product[]>({
    queryKey: ["rankingProducts", mainFilter, subFilter],
    queryFn: () => fetchRankingProducts({ mainFilter, subFilter }),
  });

  const handleItemClick = (id: number) => () => {
    navigate(`/product/${id}`);
  };

  if (data.length === 0) {
    return (
      <div css={emptyResultsStyle(theme)}>
        <p>선물 랭킹 상품이 없습니다</p>
      </div>
    );
  }

  return (
    <div css={gridStyle(theme)}>
      {data.map((item, index) => (
        <div key={item.id} css={itemStyle} onClick={handleItemClick(item.id)}>
          <div css={rankStyle(theme)}>{index + 1}</div>
          <img src={item.imageURL} alt={item.name} css={imageStyle} />
          <div css={nameStyle(theme)}>{item.name}</div>
        </div>
      ))}
    </div>
  );
}
