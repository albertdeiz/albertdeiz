import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const LoginPage = () => {
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
      <div className="flex-1 flex h-full items-center justify-center">
        <h1 className="text-5xl font-bold text-primary">SchoolWallet</h1>
      </div>
    </div>
  );
};
