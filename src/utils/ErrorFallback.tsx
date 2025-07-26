import NotFoundPage from "@/pages/NotFoundPage";
import { Navigate } from "react-router-dom";
import { AxiosError } from "axios";

interface Props {
  error: Error;
}

export function ErrorFallback({ error }: Props) {
  const axiosError = error as AxiosError;
  if (axiosError.response?.status === 404) {
    return <Navigate to="/home" replace />;
  }

  return <NotFoundPage />;
}
