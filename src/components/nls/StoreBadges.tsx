import type { SVGProps } from "react";

const APP_STORE_URL = "https://apps.apple.com/ru/app/nls-kz/id6447656407";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=kz.nls.cabinet";

function AppleLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor" {...props}>
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
  
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
