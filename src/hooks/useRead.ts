import { type AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export type ApiError = {
  status: string;
  statusCode: number;
  message: string;
};

export type ApiErrorResponse = {
  data: ApiError;
};

type UseReadParams<T, P> = {
  fetch: (params: P) => Promise<AxiosResponse<T>>;
  initFetchParams: P;
};

type UseReadReturn<T> = {
  loading: boolean;
  data: T | undefined;
  error: string | undefined;
};

export const useRead = <T, P>({
  fetch,
  initFetchParams,
}: UseReadParams<T, P>): UseReadReturn<T> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UseReadReturn<T>["data"]>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchData = useCallback(
    async (params: P) => {
      setLoading(true);
      setError(undefined);
      try {
        const { data } = await fetch(params);
        setData(data);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [fetch]
  );

  useEffect(() => {
    fetchData(initFetchParams);
  }, [fetchData, initFetchParams]);

  return { data, loading, error };
};
