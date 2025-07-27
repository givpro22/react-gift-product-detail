import { useQuery } from "@tanstack/react-query";
import { fetchThemeInfo } from "./themes";
import { fetchProductSummary } from "./products";
import type { ProductSummary } from "./products";
import type { AxiosError } from "axios";
import { fetchProductData } from "./orderDetail";

export const useThemeInfoQuery = (themeId: string | undefined) => {
  return useQuery({
    queryKey: ["themeInfo", themeId],
    queryFn: () => fetchThemeInfo(themeId!),
    enabled: !!themeId,
  });
};

export const useProductSummaryQuery = (productId: string | undefined) => {
  return useQuery<ProductSummary, AxiosError>({
    queryKey: ["productSummary", productId],
    queryFn: () => fetchProductSummary(productId!),
    enabled: !!productId,
  });
};

export const useProductBasicSummary = (productId: string | undefined) => {
  return useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => fetchProductData(productId!),
    enabled: !!productId,
  });
};

// export const useProductTabSection = (productId: string | undefined) => {
//   return useQuery({
//     queryKey: ["productDetail", productId],
//     queryFn: () => fetchProductData(productId!),
//     enabled: !!productId,
//   });
// };
