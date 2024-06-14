import { ThemeProvider } from "@/contexts/theme";
import { RouterProvider } from "@/contexts/routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider />
    </ThemeProvider>
  );
}

export default App;
