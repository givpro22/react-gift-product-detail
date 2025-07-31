import { css } from "@emotion/react";

export const tabListStyle = css`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 16px;
`;

export const tabItemStyle = css`
  padding: 12px 16px;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  border-bottom: 2px solid transparent;
  transition:
    color 0.3s,
    border-color 0.3s;

  &:hover {
    color: #000;
  }
`;

export const activeTabStyle = css`
  color: #000;
  border-color: #000;
  font-weight: 700;
`;

export const getTabItemStyle = (isActive: boolean) => css`
  ${tabItemStyle};
  ${isActive ? activeTabStyle : ""}
`;

export const contentStyle = css`
  padding: 16px 0;
`;

export const descriptionStyle = css`
  font-size: 14px;
  line-height: 1.5;
  color: #333;

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

export const announcementListStyle = css`
  padding: 0;
  margin: 0;
`;

export const announcementItemStyle = css`
  margin-bottom: 8px;
`;

export const announcementTitleStyle = css`
  font-weight: 700;
  margin-right: 8px;
  color: #555;
`;

export const announcementValueStyle = css`
  color: #777;
`;

export const imageStyle = css`
  max-width: 100%;
  height: auto;
  margin-top: 16px;
`;
