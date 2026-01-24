import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for animating numbers from 0 to target value
 * @param {number} target - The target number to animate to
 * @param {number} duration - Animation duration in milliseconds (default: 2000)
 * @param {boolean} startOnMount - Whether to start animation on mount (default: true)
 * @returns {number} - Current animated value
 */
export const useAnimatedCounter = (target, duration = 2000, startOnMount = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!startOnMount) return;

    // Start animation when component mounts
    const startAnimation = () => {
      setHasStarted(true);
      startTimeRef.current = performance.now();

      const animate = (currentTime) => {
        if (!startTimeRef.current) {
          startTimeRef.current = currentTime;
        }

        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOut * target);

        setCount(currentValue);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Ensure we end at exactly the target value
          setCount(target);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Small delay to ensure component is mounted
    const timeoutId = setTimeout(startAnimation, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [target, duration, startOnMount]);

  // Reset and restart animation
  const restart = () => {
    setCount(0);
    setHasStarted(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    startTimeRef.current = null;
  };

  return { count, hasStarted, restart };
};
