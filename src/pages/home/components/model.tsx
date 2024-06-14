import { useEffect, useRef } from "react";
import { Animation } from "./model.logic";

import type { ReactElement } from "react";
import { useTheme } from "@/contexts/theme";

export const Model = (): ReactElement => {
  const { theme, setTheme } = useTheme();
  const modelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  const handleClick = (): void => {
    const anim = animationRef.current;
    if (anim) {
      // anim.addGeometry();
    }
  };

  useEffect(() => {
    const el = modelRef.current;

    if (!el) {
      return;
    }

    animationRef.current = new Animation(el);
    animationRef.current.setTheme("light");

    return () => {
      el.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      animationRef.current?.setTheme(systemTheme);
    } else {
      animationRef.current?.setTheme(theme);
    }
  }, [theme]);

  return (
    <div>
      <div ref={modelRef} />
    </div>
  );
};
