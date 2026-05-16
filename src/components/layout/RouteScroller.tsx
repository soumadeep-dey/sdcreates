import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteScroller = () => {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;
    if (hash) {
      // Attempt to scroll to hash after a short delay to let the page render
      const id = hash.replace("#", "");
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          // Wait one more tick so layout settles
          requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: "smooth" });
          });
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 150);
        }
      };
      tryScroll();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);

  return null;
};

export default RouteScroller;
