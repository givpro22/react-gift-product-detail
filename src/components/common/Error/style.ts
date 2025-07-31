import { css } from "@emotion/react";
import fontSizes from "@/styles/theme/fontSizes";
import spacing from "@/styles/theme/spacing";

export const errorContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100px;
  padding: ${spacing.spacing4}; /* 1rem */
  background-color: #fff0f0; /* TODO: theme.colors.semantic.errorBg 등으로 교체 권장 */
  border: 1px solid #ffc0c0; /* TODO: theme.colors.semantic.errorBorder 등으로 교체 권장 */
  border-radius: 8px;
  color: #d8000c; /* TODO: theme.colors.semantic.errorText 등으로 교체 권장 */
  box-sizing: border-box;
  text-align: center;
`;

export const errorMessageStyle = css`
  margin-top: ${spacing.spacing2}; /* 0.5rem */
  font-size: ${fontSizes.title1Bold}; /* 0.9rem, 테마에 맞게 body2 또는 다른 값으로 조정하세요. */
`;
