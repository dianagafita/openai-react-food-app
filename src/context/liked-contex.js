import React, { createContext, useContext, useState, useEffect } from "react";

const LikedRecipesContext = createContext();

export const LikedRecipesProvider = ({ children }) => {
  const [likedRecipes, setLikedRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem("likedRecipes")) || [];
  });

  const handleLike = (recipe) => {
    const existingLikes = [...likedRecipes];
    const isLiked = existingLikes.some(
      (likedRecipe) => likedRecipe.name === recipe.name
    );

    if (!isLiked) {
      existingLikes.push(recipe);
    } else {
      const updatedLikes = existingLikes.filter(
        (likedRecipe) => likedRecipe.name !== recipe.name
      );
      setLikedRecipes(updatedLikes);
      localStorage.setItem("likedRecipes", JSON.stringify(updatedLikes));
      return;
    }

    setLikedRecipes(existingLikes);
    localStorage.setItem("likedRecipes", JSON.stringify(existingLikes));
  };

  return (
    <LikedRecipesContext.Provider value={{ likedRecipes, handleLike }}>
      {children}
    </LikedRecipesContext.Provider>
  );
};

export const useLikedRecipes = () => {
  return useContext(LikedRecipesContext);
};
