import { useProductTabSection } from "@/api/query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  tabListStyle,
  contentStyle,
  descriptionStyle,
  announcementListStyle,
  announcementItemStyle,
  announcementTitleStyle,
  announcementValueStyle,
  getTabItemStyle,
} from "./styles";

const TAB_ITEMS = ["상품설명", "선물후기", "상세정보"] as const;
type TabType = (typeof TAB_ITEMS)[number];

function ProductTabSection() {
  const { productId } = useParams();
  const [detailQuery, reviewQuery] = useProductTabSection(productId!);
  const [selectedTab, setSelectedTab] = useState<TabType>("상품설명");
  return (
    <div>
      <ul css={tabListStyle}>
        {TAB_ITEMS.map((tab) => (
          <li
            key={tab}
            onClick={() => setSelectedTab(tab)}
            css={getTabItemStyle(selectedTab === tab)}
          >
            {tab}
          </li>
        ))}
      </ul>

      <div css={contentStyle}>
        {selectedTab === "상품설명" && (
          <>
            <div
              css={descriptionStyle}
              dangerouslySetInnerHTML={{
                __html: detailQuery.data?.data.description ?? "",
              }}
            />
          </>
        )}
        {selectedTab === "선물후기" && (
          <div>
            <ul css={descriptionStyle}>
              {reviewQuery.data?.data.reviews?.map((review) => (
                <li key={review.id} css={announcementItemStyle}>
                  <div css={announcementTitleStyle}>{review.authorName}</div>
                  <div css={announcementValueStyle}>{review.content}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedTab === "상세정보" && (
          <div>
            <ul css={announcementListStyle}>
              {detailQuery.data?.data.announcements?.map((item) => (
                <li key={item.displayOrder} css={announcementItemStyle}>
                  <div css={announcementTitleStyle}>
                    <strong>{item.name}</strong>
                  </div>
                  <div css={announcementValueStyle}>{item.value}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductTabSection;
