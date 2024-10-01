import { useLikedRecipes } from "../context/liked-contex";
import RecipeCard from "./recipe/recipe-card";

export default function FavoritesComponent() {
  const { likedRecipes } = useLikedRecipes();

  return (
    <div className="w-[100vw] flex flex-col">
      <div className="self-center">
        <h1 className="font-bold text-2xl my-5">FAVORITES</h1>
        {likedRecipes.length > 0 ? (
          <RecipeCard data={likedRecipes} />
        ) : (
          <span>Add some favorites first!</span>
        )}
      </div>
    </div>
  );
}
