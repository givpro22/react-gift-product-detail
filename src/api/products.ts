import { apiClient } from "./client";

export interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
  gender?: string;
}

const mainMap: Record<string, string> = {
  전체: "ALL",
  여성: "FEMALE",
  남성: "MALE",
  청소년이: "TEEN",
};

const subMap: Record<string, string> = {
  "받고 싶어한": "MANY_WISH",
  "많이 선물한": "MANY_RECEIVE",
  "위시로 받은": "MANY_WISH_RECEIVE",
};

export async function fetchRankingProducts({
  mainFilter,
  subFilter,
}: {
  mainFilter: string | null;
  subFilter: string | null;
}): Promise<Product[]> {
  const queryParams = new URLSearchParams();

  const targetType = mainFilter && mainMap[mainFilter];
  if (targetType) queryParams.append("targetType", targetType);

  const rankType = subFilter && subMap[subFilter];
  if (rankType) queryParams.append("rankType", rankType);

  const response = await apiClient.get("/api/products/ranking", {
    params: Object.fromEntries(queryParams),
  });

  return response.data?.data || [];
}

export interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

export async function fetchProductSummary(
  productId: string
): Promise<ProductSummary> {
  try {
    const response = await apiClient.get(`/api/products/${productId}/summary`);

    const productData = response.data?.data;
    if (!productData) {
      throw new Error(`ID ${productId}에 해당하는 상품 요약 정보가 없습니다.`);
    }

    return productData;
  } catch {
    throw new Error(`상품 정보를 불러오는 중 문제가 발생했습니다.`);
  }
}
