"use client";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useRouter } from "../../framework/client/utils.js";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}
export const Link = ({ href, children, ...props }: Props) => {
  const { navigate } = useRouter();
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href && typeof navigate === "function") {
      e.preventDefault();
      navigate(href);
    }
  };
  return (
    <a onClick={onClick} href={href} {...props}>
      {children}
    </a>
  );
};
