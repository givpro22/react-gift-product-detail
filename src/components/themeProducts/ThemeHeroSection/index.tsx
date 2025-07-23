import { fetchThemeInfo } from "@/api/themes";
import LoadingPage from "@/pages/LoadingPage";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import { useParams, useNavigate } from "react-router-dom";
import {
  sectionStyle,
  nameStyle,
  titleStyle,
  descriptionStyle,
} from "./styles";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";

function ThemeHeroSection() {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["themeInfo", themeId],
    queryFn: () => fetchThemeInfo(themeId!),
    enabled: !!themeId,
  });

  useEffect(() => {
    if (!error) return;

    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      navigate("/home");
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
