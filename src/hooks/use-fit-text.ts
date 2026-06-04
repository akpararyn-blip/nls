import { useEffect, useRef, type RefObject } from "react";

type Options = {
  /** Min font size in rem */
  min?: number;
  /** Max font size in rem */
  max?: number;
  /** CSS custom property name to set on the container */
  cssVar?: string;
};

/**
 * Measures every element matching `selector` inside `containerRef` and finds
 * the largest font-size (within [min, max] rem) at which the LONGEST element
 * still fits its parent's content box. Writes that size to `cssVar` on the
 * container so all elements share the same size.
 */
export function useFitText(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  { min = 0.7, max = 1, cssVar = "--fit-text-size" }: Options = {}
) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const els = Array.from(
          container.querySelectorAll<HTMLElement>(selector)
        );
        if (els.length === 0) return;

        // Reset to max to get an unconstrained measurement
        container.style.setProperty(cssVar, `${max}rem`);

        let ratio = 1;
        for (const el of els) {
          const parent = el.parentElement;
          if (!parent) continue;
          const cs = getComputedStyle(parent);
          const padX =
            parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
          const available = parent.clientWidth - padX;
          if (available <= 0) continue;
          // scrollWidth = needed width at current font-size (max rem)
          const needed = el.scrollWidth;
          if (needed > available) {
            ratio = Math.min(ratio, available / needed);
          }
        }

        const size = Math.max(min, Math.min(max, max * ratio));
        container.style.setProperty(cssVar, `${size.toFixed(3)}rem`);
      });
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(container);

    window.addEventListener("resize", measure);
    // Re-measure after web fonts load
    if (typeof document !== "undefined" && (document as any).fonts?.ready) {
      (document as any).fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, selector, min, max, cssVar]);
}
