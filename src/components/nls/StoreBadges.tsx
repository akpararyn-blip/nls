import type { SVGProps } from "react";

const APP_STORE_URL = "https://apps.apple.com/ru/app/nls-kz/id6447656407";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=kz.nls.cabinet";

function AppleLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" {...props}>
      <path d="M16.365 1.43c0 1.14-.42 2.21-1.16 3.05-.84.95-2.21 1.69-3.34 1.6-.13-1.11.44-2.27 1.18-3.06.84-.93 2.32-1.65 3.32-1.59zm3.6 16.78c-.62 1.43-.92 2.07-1.72 3.34-1.13 1.78-2.72 4-4.69 4.02-1.75.02-2.2-1.14-4.58-1.13-2.38.01-2.88 1.15-4.63 1.13-1.97-.02-3.48-2.03-4.61-3.81C-.78 17.56-.99 11.83 1.93 8.85c1.04-1.06 2.46-1.73 3.94-1.75 1.79-.03 3.48 1.21 4.58 1.21 1.1 0 3.16-1.49 5.32-1.27.9.04 3.43.36 5.06 2.74-.13.08-3.02 1.77-2.99 5.27.04 4.18 3.66 5.57 3.7 5.59-.03.09-.58 1.99-1.92 4.07z" />
    </svg>
  );
}

function GooglePlayLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 512 512" width={24} height={24} {...props}>
      <path fill="#00d8ff" d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1z" />
      <path fill="#ffce00" d="m408.6 191-93 53.3 81.5 81.5 90.4-52.2c27-15.6 27-54.7-78.9-82.6z" />
      <path fill="#ff3a44" d="M104.6 499 325.3 277.7l60.1 60.1L104.6 499z" />
      <path fill="#00f076" d="m104.6 13 220.7 220.7L104.6 499c-7.5-4.3-12.5-12.4-12.5-22.6V35.6c0-10.2 5-18.3 12.5-22.6z" />
    </svg>
  );
}

export function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`store-badges ${className}`}>
      <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="store-badge" aria-label="Скачать в App Store">
        <AppleLogo />
        <span className="store-badge-text">
          <small>Загрузите в</small>
          <strong>App Store</strong>
        </span>
      </a>
      <a href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer" className="store-badge" aria-label="Скачать в Google Play">
        <GooglePlayLogo />
        <span className="store-badge-text">
          <small>Доступно в</small>
          <strong>Google Play</strong>
        </span>
      </a>
    </div>
  );
}
