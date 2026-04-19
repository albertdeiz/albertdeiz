import { Button } from "@/components/ui/button";
import { Linkedin, Github } from "lucide-react";
import { MainAnimation } from "./components/main-animation";

export const HomePage = () => {
  return (
    <main className="relative w-full min-h-screen flex flex-col justify-center">
      <div
          aria-hidden
          className="z-10 pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.08),_transparent_60%)]"
        />
      <div className="absolute w-full h-full top-0 left-0">
        <MainAnimation />
      </div>
      <div className="max-w-7xl px-8 mx-auto">
        <div className="flex-wrap md:flex-nowrap flex h-full items-center justify-center">
          <section className="relative flex flex-col w-full md:w-1/2">
            <div className="flex flex-col items-start gap-8">
              <h1 className="text-5xl md:text-6xl font-thin text-primary leading-tight tracking-tight">
                Hey there, I'm Albert, a <strong className="font-normal">frontend developer</strong> based in Chile 🇨🇱
              </h1>
              <h3 className="text-xl font-thin text-muted-foreground leading-relaxed">
                With <strong className="font-normal text-primary">+10 years</strong> in frontend development, I specialize in app
                architecture and design systems. My focus is on creating user
                interfaces that prioritize user experience, aiming for intuitive
                and engaging products.
              </h3>
              <div className="flex gap-4">
                <Button asChild>
                  <a
                    href="http://linkedin.com/in/albertdeiz/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a
                    href="https://github.com/albertdeiz/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </a>
                </Button>
              </div>
            </div>
          </section>
          <section className="w-full md:w-1/2" />
        </div>
      </div>
    </main>
  );
};
