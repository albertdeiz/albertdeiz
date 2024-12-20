import { Suspense, useState } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a as web } from "@react-spring/web";
import { a as three } from "@react-spring/three";
import { Model } from "./model";
import { useTheme } from "@/contexts/theme";

export const MainAnimation = () => {
  const { theme, setTheme } = useTheme();
  // This flag controls open state, alternates between true & false
  const [open, setOpen] = useState(() => theme === "dark");
  // We turn this into a spring animation that interpolates between 0 and 1
  const props = useSpring({ open: Number(open) });

  const handleToggleTheme = (e: ThreeEvent<MouseEvent>): void => {
    e.stopPropagation();
    setOpen(!open);
    setTheme(open ? "light" : "dark");
  };

  return (
    <web.main
      className="w-full h-full relative"
      style={{ background: props.open.to([0, 1], ["#fff", "#0a0a0a"]) }}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, -40], fov: 35 }}>
        <three.pointLight
          position={[10, 10, 10]}
          intensity={1.5}
          color={props.open.to([0, 1], ["#fff", "#0a0a0a"])}
        />
        <Suspense fallback={null}>
          <group
            rotation={[0, Math.PI, 0]}
            onClick={handleToggleTheme}
            position={[-5.5, 0.5, 0]}
          >
            <Model open={open} hinge={props.open.to([0, 1], [1.575, -0.425])} />
          </group>
          <Environment preset="city" />
        </Suspense>
        <ContactShadows
          position={[0, -4.5, 0]}
          opacity={0.4}
          scale={20}
          blur={1.75}
          far={4.5}
        />
      </Canvas>
    </web.main>
  );
};
