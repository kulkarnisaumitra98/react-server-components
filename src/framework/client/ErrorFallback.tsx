import { HTMLTemplate } from "../../shared/HTMLTemplate.js";
import type { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error }: FallbackProps) => {
  return (
    <HTMLTemplate>
      <div>
        <h1>Application Error</h1>
        <pre style={{ whiteSpace: "pre-wrap" }}>{error.stack}</pre>
      </div>
    </HTMLTemplate>
  );
};
