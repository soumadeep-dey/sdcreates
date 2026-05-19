import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const useFancybox = (): void => {
  useEffect(() => {
    let scrollPos = 0;

    // Store scroll position before fancybox opens
    const handleBeforeOpen = (e: Event) => {
      if ((e.target as HTMLElement).hasAttribute("data-fancybox")) {
        scrollPos = window.scrollY;
      }
    };

    // Restore scroll position after fancybox closes
    const handleAfterClose = () => {
      setTimeout(() => {
        window.scrollTo(0, scrollPos);
      }, 50);
    };

    // Bind fancybox
    Fancybox.bind("[data-fancybox]", {
      placeFocusBack: true,
    });

    // Add event listeners for scroll restoration
    document.addEventListener("click", handleBeforeOpen, true);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") handleAfterClose();
    });

    // Hide fancybox nav buttons and toolbar via CSS
    const style = document.createElement("style");
    style.textContent = `
      .fancybox__nav { display: none !important; }
      .fancybox__toolbar { display: none !important; }
      .fancybox__button { display: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      Fancybox.unbind("[data-fancybox]");
      Fancybox.close();
      document.removeEventListener("click", handleBeforeOpen, true);
      document.head.removeChild(style);
    };
  }, []);
};

export default useFancybox;
