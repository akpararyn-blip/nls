import { useEffect, useState } from "react";

/**
 * Returns true once the user has scrolled to the trigger element (e.g. the
 * calculator section). The mobile pricing bar should appear from that point
 * on and stay visible while scrolling further down.
 *
 * Also toggles `body.has-mobile-bar` so other fixed UI (e.g. floating
 * contact widget) can shift up to avoid overlap.
 */
export function useMobileBarVisibility(triggerId: string) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(triggerId);
      if (!el) {
        setVisible(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      // Visible once the top of the trigger reaches the bottom 70% of the viewport
      const shouldShow = rect.top <= viewportH * 0.7;
      setVisible(shouldShow);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [triggerId]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (visible) document.body.classList.add("has-mobile-bar");
    else document.body.classList.remove("has-mobile-bar");
    return () => {
      document.body.classList.remove("has-mobile-bar");
    };
  }, [visible]);

  return visible;
}
