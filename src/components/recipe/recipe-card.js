import React from "react";
import noimage from "./noimage.jpg";
import LikeButton from "../util/like-icon";
import { Link } from "react-router-dom";
import { useLikedRecipes } from "../../context/liked-contex";

export default function RecipeCard({ data }) {
  const { handleLike, likedRecipes } = useLikedRecipes();
  const isLiked = likedRecipes.some(
    (likedRecipe) => likedRecipe.name === data[0].name
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {data.map((recipe, i) => (
        <div
          key={i}
          className="flex shadow-md border mb-5 rounded-md w-[400px] md:w-[500px] h-[150px] overflow-hidden"
        >
          <div className="border-r w-[200px]">
            <img
              src={noimage}
              alt={recipe.name || "Recipe image"}
              className="w-full h-full"
            />
          </div>
          <div className="flex justify-between w-full items-center">
            <Link
              state={{ recipe }}
              to={`/recipes/${recipe.name}`}
              className="flex flex-col p-5 h-full self-center justify-center"
            >
              <h3 className="text-lg font-semibold">{recipe.name}</h3>
              <p className="mt-2 text-gray-600">
                <strong>Time:</strong> {recipe.time}
              </p>
            </Link>
            <div className={`justify-end m-5 ${isLiked ? "liked" : ""}`}>
              <LikeButton onClick={() => handleLike(recipe)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
