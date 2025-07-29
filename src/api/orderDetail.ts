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
  try {
    const response = await apiClient.get(`/api/products/${productId}`);
    const productData = response.data;
    if (!productData) {
      throw new Error(`ID ${productId}에 해당하는 상품 정보가 없습니다.`);
    }
    return productData;
  } catch (error) {
    console.error(
      `상품 정보(ID: ${productId})를 가져오는 중 오류 발생:`,
      error
    );
    throw new Error("상품 정보를 불러오는 중 문제가 발생했습니다.");
  }
}

export async function fetchProductDetailData(
  productId: string
): Promise<ProductDetailData> {
  try {
    const response = await apiClient.get(`/api/products/${productId}/detail`);
    const detailData = response.data;
    if (!detailData) {
      throw new Error(`ID ${productId}에 해당하는 상품 상세 정보가 없습니다.`);
    }
    return detailData;
  } catch (error) {
    console.error(
      `상품 상세 정보(ID: ${productId})를 가져오는 중 오류 발생:`,
      error
    );
    throw new Error("상품 상세 정보를 불러오는 중 문제가 발생했습니다.");
  }
}

export async function fetchProductHighlightReview(
  productId: string
): Promise<ProductHighlightReview> {
  try {
    const response = await apiClient.get(
      `/api/products/${productId}/highlight-review`
    );
    const reviewData = response.data;
    if (!reviewData) {
      throw new Error(`ID ${productId}에 해당하는 하이라이트 리뷰가 없습니다.`);
    }
    return reviewData;
  } catch (error) {
    console.error(
      `하이라이트 리뷰(ID: ${productId})를 가져오는 중 오류 발생:`,
      error
    );
    throw new Error("하이라이트 리뷰를 불러오는 중 문제가 발생했습니다.");
  }
}

export async function fetchProductWishCount(
  productId: string
): Promise<ProductWishCount> {
  try {
    const response = await apiClient.get(`/api/products/${productId}/wish`);
    const wishCountData = response.data;
    if (wishCountData === null || wishCountData === undefined) {
      throw new Error(
        `ID ${productId}에 해당하는 위시 카운트 정보가 없습니다.`
      );
    }
    return wishCountData;
  } catch (error) {
    console.error(
      `위시 카운트(ID: ${productId})를 가져오는 중 오류 발생:`,
      error
    );
    throw new Error("위시 카운트를 불러오는 중 문제가 발생했습니다.");
  }
}
