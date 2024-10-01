import { Route, Routes } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import RecipeDetails from "./pages/RecipeDetails";
import FavoritesComponent from "./components/FavoritesComponent";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FavoritesComponent />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/recipes/:name" element={<RecipeDetails />} />
    </Routes>
  );
}
