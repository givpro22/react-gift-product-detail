import LoadingPage from "@/pages/LoadingPage";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import { useParams, useNavigate } from "react-router-dom";
import {
  sectionStyle,
  nameStyle,
  titleStyle,
  descriptionStyle,
} from "./styles";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { useThemeInfoQuery } from "@/api/query";
import { ROUTES } from "@/routes/Router";

function ThemeHeroSection() {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const { data, isError, isLoading, error } = useThemeInfoQuery(themeId);

  useEffect(() => {
    if (!error) return;

    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      navigate(ROUTES.ROOT);
    }
  }, [error, navigate]);

  if (!data) return null;
  if (isLoading) return <LoadingPage css={whiteSectionStyle()} />;
  if (isError) return null;

  return (
    <section css={sectionStyle(data.backgroundColor)}>
      <p css={nameStyle}>{data.name}</p>
      <h2 css={titleStyle}>{data.title}</h2>
      <p css={descriptionStyle}>{data.description}</p>
    </section>
  );
}

export default ThemeHeroSection;
