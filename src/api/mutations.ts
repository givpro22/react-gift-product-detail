import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrderApi } from "@/api/order";
import { fetchLoginApi } from "@/api/auth";
import type { AxiosError } from "axios";
import type { NavigateFunction } from "react-router-dom";
import type { UserInfo } from "@/api/auth";
import { ROUTES } from "@/routes/Router";
import axios from "axios";
import type { ProductWishCount } from "@/types/orderDetailData";

export const useOrderMutation = (
  productName: string,
  quantity: number,
  navigate: NavigateFunction
) => {
  return useMutation({
    mutationFn: fetchOrderApi,
    onSuccess: (_, variables) => {
      alert(
        `주문이 완료되었습니다.\n` +
          `상품명: ${productName}\n` +
          `구매 수량: ${quantity}\n` +
          `발신자 이름: ${variables.ordererName}\n` +
          `메시지: ${variables.message}`
      );
      navigate(ROUTES.ROOT);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        navigate(ROUTES.LOGIN);
      }
    },
  });
};

export const useLoginMutation = (setUser: (user: UserInfo) => void) => {
  return useMutation({
    mutationFn: fetchLoginApi,
    onSuccess: (result) => {
      sessionStorage.setItem("userInfo", JSON.stringify(result));
      setUser(result);
    },
  });
};

export const useUpdateWishCountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => {
      // 낙관적 업데이트를 적용할 POST API가 없어 임시로 사용
      return axios.post(`/api/products/${productId}/wish`, {});
    },
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["productWishCount", productId],
      });

      const previousData = queryClient.getQueryData<ProductWishCount>([
        "productWishCount",
        productId,
      ]);

      if (!previousData) return;

      const isWished = !previousData.data.isWished;
      const wishCount = previousData.data.wishCount + (isWished ? 1 : -1);

      queryClient.setQueryData<ProductWishCount>(
        ["productWishCount", productId],
        {
          data: {
            isWished,
            wishCount,
          },
        }
      );

      return { previousData, productId };
    },
  });
};
