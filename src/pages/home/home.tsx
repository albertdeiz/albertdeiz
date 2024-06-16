import { Button } from "@/components/ui/button";
import { Linkedin, Github } from "lucide-react";
import { MainAnimation } from "./components/main-animation";

export const HomePage = () => {
  return (
    <main className="relative w-full min-h-screen flex flex-col justify-center">
      <div className="absolute w-full h-full top-0 left-0">
        <MainAnimation />
      </div>
      <div className="max-w-7xl px-8 mx-auto">
        <div className="flex-wrap md:flex-nowrap flex h-full items-center justify-center">
          <section className="relative flex flex-col w-full md:w-1/2">
            <h1 className="text-4xl font-thin text-primary mb-4 leading-snug">
              Hey there, I'm <strong className="font-normal">Albert</strong>,
              <br />A{" "}
              <strong className="font-normal">frontend developer</strong>
              <br />
              based in Chile 🇨🇱
            </h1>
            <h3 className="text-xl font-thin text-primary tracking-wide mb-6">
              With +10 years in frontend development, I specialize in app
              architecture and design systems. My focus is on creating user
              interfaces that prioritize user experience, aiming for intuitive
              and engaging products.
            </h3>
            <div className="flex gap-4">
              <Button asChild>
                <a
                  href="http://linkedin.com/in/aado29"
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
          </section>
          <section className="w-full md:w-1/2" />
        </div>
      </div>
    </main>
  );
};
