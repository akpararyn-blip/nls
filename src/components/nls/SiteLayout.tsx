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
      <main className="site-content">{children}</main>
      <Footer />
      <Modals />
      <CookieBanner />
      <FloatingContact />
    </>
  );
}
