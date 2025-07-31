import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { fetchThemeInfo } from "./themes";
import { fetchProductSummary } from "./products";

import {
  fetchProductData,
  fetchProductDetailData,
  fetchProductHighlightReview,
  fetchProductWishCount,
} from "./orderDetail";

export const useThemeInfoQuery = (themeId: string | undefined) => {
  return useSuspenseQuery({
    queryKey: ["themeInfo", themeId],
    queryFn: () => fetchThemeInfo(themeId!),
  });
};

export const useProductSummaryQuery = (productId: string | undefined) => {
  return useSuspenseQuery({
    queryKey: ["productSummary", productId],
    queryFn: () => fetchProductSummary(productId!),
  });
};

export const useProductBasicSummary = (productId: string | undefined) => {
  return useSuspenseQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => fetchProductData(productId!),
  });
};

export const useProductWishCount = (productId: string | undefined) => {
  return useSuspenseQuery({
    queryKey: ["productWishCount", productId],
    queryFn: () => fetchProductWishCount(productId!),
  });
};

export const useProductTabSection = (productId: string) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: ["product", productId],
        queryFn: () => fetchProductDetailData(productId),
      },

      {
        queryKey: ["highlightReview", productId],
        queryFn: () => fetchProductHighlightReview(productId),
      },
    ],
  });
};
