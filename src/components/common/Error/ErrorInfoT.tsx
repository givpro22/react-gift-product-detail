import { errorContainerStyle, errorMessageStyle } from "./style";

interface Props {
  error: Error | null;
}

const ErrorInfoT = ({ error }: Props) => {
  return (
    <div css={errorContainerStyle} role="alert">
      <p>⚠️ 오류가 발생했습니다.</p>
      <p css={errorMessageStyle}>{error?.message}</p>
    </div>
  );
};

export default ErrorInfoT;
