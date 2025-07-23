import { useTheme } from "@emotion/react";
import {
  titleStyle,
  gridStyle,
  itemStyle,
  imageStyle,
  nameStyle,
} from "./styles";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import { fetchThemes } from "@/api/themes";
import LoadingPage from "@/pages/LoadingPage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

export default function CategorySection() {
  const theme = useTheme();

  const navigate = useNavigate();
  const { user } = useAuth();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["themes"],
    queryFn: fetchThemes,
  });

  const handleItemClick = (themeId: number) => {
    if (user) {
      navigate(`/themes/${themeId}`);
    } else {
      navigate("/login", { state: { from: `/themes/${themeId}` } });
    }
  };

  if (isLoading) return <LoadingPage css={whiteSectionStyle()} />;
  if (isError || !data) return null;

  return (
    <div css={whiteSectionStyle()}>
      <h2 css={titleStyle(theme)}>선물 테마</h2>
      <div css={gridStyle}>
        {data.map((item) => (
          <div
            key={item.themeId}
            css={itemStyle}
            onClick={() => handleItemClick(item.themeId)}
          >
            <img src={item.image} alt={item.name} css={imageStyle} />
            <span css={nameStyle(theme)}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
