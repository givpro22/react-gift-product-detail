import { css, keyframes } from "@emotion/react";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

function LoadingPage() {
  return (
    <div
      css={css({
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <div
        css={css({
          width: "48px",
          height: "48px",
          border: "3px solid transparent",
          borderTop: "3px solid rgb(0, 0, 0)",
          borderRadius: "50%",
          animation: `${spin} 700ms linear infinite`,
          display: "inline-block",
        })}
      />
    </div>
  );
}

export default LoadingPage;
