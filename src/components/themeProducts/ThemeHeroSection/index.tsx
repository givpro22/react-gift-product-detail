import { useParams, useNavigate } from "react-router-dom";
import {
  sectionStyle,
  nameStyle,
  titleStyle,
  descriptionStyle,
} from "./styles";
import { useRead } from "@/hooks/useRead";
import { fetchThemeInfo } from "@/api/themes";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ROUTES } from "@/routes/Router";

function ThemeHeroSection() {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useRead({
    fetch: fetchThemeInfo,
    initFetchParams: themeId || "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      navigate(ROUTES.ROOT);
    }
  }, [error, navigate]);

  if (!data || loading) return null;

  const { backgroundColor, name, title, description } = data.data;

  return (
    <section css={sectionStyle(backgroundColor)}>
      <p css={nameStyle}>{name}</p>
      <h2 css={titleStyle}>{title}</h2>
      <p css={descriptionStyle}>{description}</p>
    </section>
  );
}

export default ThemeHeroSection;
