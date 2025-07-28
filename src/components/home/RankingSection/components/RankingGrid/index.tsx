import { useTheme } from "@emotion/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  gridStyle,
  itemStyle,
  rankStyle,
  imageStyle,
  nameStyle,
  emptyResultsStyle,
  loadingContainerStyle,
} from "./styles";
import { fetchRankingProducts, type Product } from "@/api/products";
import LoadingPage from "@/pages/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function RankingGrid() {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mainFilter = searchParams.get("main");
  const subFilter = searchParams.get("sub");
  const {
    data = [],
    isError,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["rankingProducts", mainFilter, subFilter],
    queryFn: () => fetchRankingProducts({ mainFilter, subFilter }),
  });

  const handleItemClick = (id: number) => () => {
    navigate(`/product/${id}`);
  };

  if (isLoading) {
    return <LoadingPage css={loadingContainerStyle(theme)} />;
  }

  if (isError) {
    return (
      <div css={emptyResultsStyle(theme)}>
        <p>
          {error instanceof AxiosError
            ? error.response?.data?.message || "서버 에러 발생"
            : "알 수 없는 에러가 발생했습니다."}
        </p>
      </div>
    );
  }

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
