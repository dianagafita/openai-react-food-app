import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./AppRouter";
import Header from "./components/header/main-header";
import { LikedRecipesProvider } from "./context/liked-contex";

function MainApp() {
  const location = useLocation();
  const hideHeaderOnRecipeDetails = location.pathname.startsWith("/recipes/");

  return (
    <div className="w-full">
      {!hideHeaderOnRecipeDetails && <Header />}
      <AppRoutes />
    </div>
  );
}

export default function App() {
  return (
    <LikedRecipesProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </LikedRecipesProvider>
  );
}
