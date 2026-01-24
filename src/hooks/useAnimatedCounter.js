import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for animating numbers from 0 to target value
 * Production-ready version with better error handling
 */
export const useAnimatedCounter = (target, duration = 2000, startOnMount = true) => {
  const [count, setCount] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!startOnMount || !target || target <= 0) {
      setCount(target || 0);
      return;
    }

    // Reset
    setCount(0);
    startTimeRef.current = null;

    // Clear any existing animation
    if (animationRef.current) {
      if (typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = null;
    }

    const animate = (timestamp) => {
      if (!mountedRef.current) {
        return;
      }

      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * target);

      if (mountedRef.current) {
        setCount(currentValue);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact
        if (mountedRef.current) {
          setCount(target);
        }
        animationRef.current = null;
      }
    };

    // Start animation after a short delay to ensure component is ready
    const timeoutId = setTimeout(() => {
      if (mountedRef.current && typeof requestAnimationFrame === 'function') {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Fallback: set final value immediately
        if (mountedRef.current) {
          setCount(target);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        if (typeof cancelAnimationFrame === 'function') {
          cancelAnimationFrame(animationRef.current);
        }
        animationRef.current = null;
      }
      startTimeRef.current = null;
    };
  }, [target, duration, startOnMount]);

  // Reset and restart animation
  const restart = () => {
    setCount(0);
    startTimeRef.current = null;
    if (animationRef.current) {
      if (typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = null;
    }
  };

  return { count, restart };
};
