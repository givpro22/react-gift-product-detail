import type {
  ProductData,
  ProductDetailData,
  ProductHighlightReview,
  ProductWishCount,
} from "@/types/orderDetailData";
import { apiClient } from "./client";

export async function fetchProductData(
  productId: string
): Promise<ProductData> {
  const response = await apiClient.get(`/api/products/${productId}`);
  return response.data.data;
}

export async function fetchProductDetailData(
  productId: string
): Promise<ProductDetailData> {
  const response = await apiClient.get(`/api/products/${productId}/detail`);
  return response.data.data;
}

export async function fetchProductHighlightReview(
  productId: string
): Promise<ProductHighlightReview> {
  const response = await apiClient.get(
    `/api/products/${productId}/highlight-review`
  );
  return response.data.data;
}

export async function fetchProductWishCount(
  productId: string
): Promise<ProductWishCount> {
  const response = await apiClient.get(`/api/products/${productId}/wish`);
  return response.data.data;
}
