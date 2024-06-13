import { useEffect, useRef } from "react";
import { Animation } from "./model.logic";

import type { ReactElement } from "react";

export const Model = (): ReactElement => {
  const modelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  const handleClick = (): void => {
    const anim = animationRef.current;
    if (anim) {
      anim.addGeometry();
    }
  }

  useEffect(() => {
    const el = modelRef.current;

    if (!el) {
      return;
    }

    animationRef.current = new Animation(el);

    return () => {
      el.innerHTML = "";
    };
  }, []);

  return <div><button onClick={handleClick}>click here</button><div ref={modelRef} /></div>;
};
