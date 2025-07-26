import { fetchThemeProducts } from "@/api/themes";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  sectionStyle,
  gridStyle,
  cardStyle,
  imageStyle,
  brandStyle,
  nameStyle,
  priceStyle,
} from "./styles";
import NotFoundPage from "@/pages/NotFoundPage";
import { useInfiniteQuery } from "@tanstack/react-query";

function ThemeProductList() {
  const { themeId } = useParams<{ themeId: string }>();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: ["themeProducts", themeId],
      queryFn: ({ pageParam = 0 }) =>
        fetchThemeProducts(themeId || "", pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasMoreList ? lastPage.cursor : undefined,
      enabled: !!themeId,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (error) {
    return <NotFoundPage />;
  }
  return (
    <section css={sectionStyle}>
      <div css={gridStyle}>
        {data?.pages.flatMap((page) =>
          page.list.map((item) => (
            <div key={item.id} css={cardStyle}>
              <img src={item.imageURL} alt={item.name} css={imageStyle} />
              <div css={brandStyle}>{item.brandInfo.name}</div>
              <div css={nameStyle}>{item.name}</div>
              <div css={priceStyle}>
                {item.price.sellingPrice.toLocaleString()} 원
              </div>
            </div>
          ))
        )}
      </div>
      {hasNextPage && <div ref={observerRef} style={{ height: 1 }} />}
    </section>
  );
}

export default ThemeProductList;
