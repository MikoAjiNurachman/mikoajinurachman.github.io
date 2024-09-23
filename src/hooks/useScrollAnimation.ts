import { useEffect, useRef } from "react";

const useScrollAnimation = (): React.RefObject<any> => {
  const ref = useRef<any>(null);
  const hasAnimated = useRef<boolean>(false);

  const handleScroll = () => {
    if (ref.current) {
      const { top, bottom } = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the element is in the viewport
      if (top < windowHeight && bottom > 0) {
        if (!hasAnimated.current) {
          // Add the animation class
          ref.current.classList.add('animate-scroll');

          // Mark that the animation has been triggered
          hasAnimated.current = true;

          // Remove the animation class after the animation completes
          ref.current.addEventListener('animationend', () => {
            ref.current?.classList.remove('animate-scroll');
          }, { once: true });
        }
      } else {
        // Reset the animation state when the element is out of view
        hasAnimated.current = false;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Check on mount in case the element is already in view
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return ref;
};

export default useScrollAnimation;
