import { Link } from "@tanstack/react-router";
import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import { resolveLink, USE_INTERNAL_ROUTING } from "@/config/links";

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children: ReactNode;
  /** Дополнительные пропсы для TanStack Link, например activeProps */
  activeProps?: Record<string, unknown>;
}

/**
 * SmartLink — обёртка над <Link>. В обычном режиме работает как Link.
 * В режиме «отдельные поддомены» (USE_INTERNAL_ROUTING = false) автоматически
 * перенаправляет ссылки на услуги на соответствующие поддомены.
 *
 * Чтобы избежать рассинхрона SSR ↔ клиент, на сервере и в первом рендере
 * всегда отдаём внутренний <Link>, а уже после mount подменяем на внешний href.
 */
export function SmartLink({ to, children, onClick, ...rest }: SmartLinkProps) {
  const [host, setHost] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.hostname);
    }
  }, []);

  // В internal-режиме всегда обычный Link
  if (USE_INTERNAL_ROUTING) {
    return (
      <Link to={to} onClick={onClick as never} {...(rest as never)}>
        {children}
      </Link>
    );
  }

  const resolved = resolveLink(to, host);

  if (resolved.externalHref) {
    return (
      <a
        href={resolved.externalHref}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const internalTo = resolved.internalTo ?? to;
  return (
    <Link to={internalTo} onClick={onClick as never} {...(rest as never)}>
      {children}
    </Link>
  );
}
