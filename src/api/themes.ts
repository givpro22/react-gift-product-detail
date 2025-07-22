import type { ApiErrorResponse } from "@/hooks/useRead";
import { apiClient } from "./client";
import type { AxiosResponse } from "axios";

export interface ThemeType {
  themeId: number;
  name: string;
  image: string;
}

export interface ThemeProduct {
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
}

export interface ThemeProductResponse {
  list: ThemeProduct[];
  cursor: number;
  hasMoreList: boolean;
}

type ThemeBaseData = {
  themeId: string;
  name: string;
};

export type ThemeInfo = ThemeBaseData & {
  title: string;
  description: string;
  backgroundColor: string;
};

export async function fetchThemes(): Promise<ThemeType[]> {
  const response = await apiClient.get("/api/themes");
  return response.data.data;
}

export async function fetchThemeProducts(
  themeId: string,
  cursor: number = 0,
  limit: number = 10
): Promise<ThemeProductResponse> {
  const response = await apiClient.get(`/api/themes/${themeId}/products`, {
    params: { cursor, limit },
  });
  return response.data.data;
}

export async function fetchThemeInfo(
  themeId: string
): Promise<AxiosResponse<{ data: ThemeInfo }, ApiErrorResponse>> {
  return await apiClient.get(`/api/themes/${themeId}/info`);
}
