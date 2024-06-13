import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="flex justify-end bg-primary">
        <nav className="px-3 py-4">
          <ul>
            <li>
              <Button
                asChild
                variant="link"
                className="text-primary-foreground"
              >
                <Link className="text-primary-foreground" to="/login">
                  Iniciar Sesión
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex-1 flex h-full flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-primary mb-4">Hi, I'm Albert Deiz</h1>
        <h3 className="text-2xl font-thin text-primary tracking-wide mb-6">Frontend software developer based in 🇨🇱</h3>
        <div className="flex gap-4">
          <Button>Get in touch</Button>
          <Button variant="secondary">More about me</Button>
        </div>
      </div>
    </div>
  );
};
