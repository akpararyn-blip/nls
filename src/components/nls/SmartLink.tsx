import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { resolveLink, USE_INTERNAL_ROUTING } from "@/config/links";

interface SmartLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

/**
 * SmartLink — обёртка над <Link>. В обычном режиме работает как Link.
 * В режиме «отдельные поддомены» (USE_INTERNAL_ROUTING = false) ссылки на
 * услуги автоматически меняются на соответствующие поддомены.
 *
 * На SSR и в первом рендере отдаём внутренний <Link>, чтобы избежать рассинхрона
 * client/server — после mount уже знаем hostname и можем переключиться.
 */
export function SmartLink({ to, children, ...rest }: SmartLinkProps) {
  const [host, setHost] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.hostname);
    }
  }, []);

  if (USE_INTERNAL_ROUTING) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Link to={to} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  const resolved = resolveLink(to, host);

  if (resolved.externalHref) {
    return (
      <a href={resolved.externalHref} {...rest}>
        {children}
      </a>
    );
  }

  const internalTo = resolved.internalTo ?? to;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Link to={internalTo} {...(rest as any)}>
      {children}
    </Link>
  );
}
