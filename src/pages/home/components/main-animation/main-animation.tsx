import { Suspense, useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  // We turn this into a spring animation that interpolates between 0 and 1
  const props = useSpring({ open: Number(open) });

  const handleToggleTheme = (e: ThreeEvent<MouseEvent>): void => {
    e.stopPropagation();
    setTheme(open ? "light" : "dark");
    setOpen((open) => !open);
  };

  useEffect(() => {
    const isOpen = theme === "dark";
    setOpen(isOpen);
  }, []);

  return (
    <web.main
      className="w-full h-full relative"
      //f0f0f0
      style={{ background: props.open.to([0, 1], ["#fff", "#0a0a0a"]) }}
    >
      <web.h1
        className="text-foreground"
        style={{
          margin: 0,
          padding: 0,
          position: "absolute",
          top: "50%",
          left: "70%",
          // transform: translate3d(-50%, -50%, 0);
          fontWeight: "400",
          fontSize: "8em",
          letterSpacing: "-0.045em",
          whiteSpace: "nowrap",
          opacity: props.open.to([0, 1], [1, 0]),
          transform: props.open.to(
            (o: number) => `translate3d(-50%,${o * 50 - 100}px,0)`
          ),
        }}
      >
        click
      </web.h1>
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
