import { css } from "@emotion/react";

export const actionBarWrapperStyle = css`
  position: sticky;
  bottom: 0;
  padding: 0px 0px 0px 16px;
  z-index: 1000;
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;

export const wishSectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #222;

  svg {
    stroke: #222;
  }
`;

export const orderButtonStyle = css`
  flex: 1;
  margin-left: 16px;
  height: 56px;
  background-color: #ffe600;
  color: #222;
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
