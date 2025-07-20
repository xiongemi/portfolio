'use client';

import { useState, useLayoutEffect, useCallback, RefObject } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(elementRef?: RefObject<HTMLElement | null>, delay = 100): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const updateSize = useCallback(() => {
    if (elementRef?.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setWindowSize({
        width: rect.width,
        height: rect.height,
      });
    } else {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, [elementRef]);

  const debouncedUpdateSize = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, delay);
    };
  }, [updateSize, delay]);

  useLayoutEffect(() => {
    const handleResize = debouncedUpdateSize();

    updateSize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [debouncedUpdateSize, updateSize]);

  return windowSize;
}