'use client';

import { type RefObject, useLayoutEffect, useState } from 'react';

/**
 * Rendered height of an element, in pixels, kept current by a ResizeObserver.
 *
 * A window `resize` listener was not enough: the content this measures reflows
 * when the web font swaps in or when text wraps at a width the window never
 * changed to, and the old debounced listener also leaked its pending timeout on
 * unmount. Returns 0 until the first measurement, which happens before paint.
 */
export function useElementHeight(elementRef: RefObject<HTMLElement | null>): number {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef]);

  return height;
}
