import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const useFancybox = (): void => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox]");

    return () => {
      Fancybox.unbind("[data-fancybox]");
      Fancybox.close();
    };
  }, []);
};

export default useFancybox;
