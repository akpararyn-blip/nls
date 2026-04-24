import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { Footer } from "./Footer";
import { Modals } from "./Modals";
import { CookieBanner } from "./CookieBanner";
import { FloatingContact } from "./FloatingContact";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MobileNav />
      {children}
      <Footer />
      <Modals />
      <CookieBanner />
      <FloatingContact />
    </>
  );
}
