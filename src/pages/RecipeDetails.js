import LikeButton from "../components/util/like-icon";
import noimage from "../components/recipe/noimage.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useLikedRecipes } from "../context/liked-contex";
import { IoIosArrowBack } from "react-icons/io";

const RecipeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { recipe } = location.state || {};
  const { handleLike, likedRecipes } = useLikedRecipes();
  const isLiked = likedRecipes.some(
    (likedRecipe) => likedRecipe.name === recipe.name
  );

  return recipe ? (
    <>
      <button
        className="pt-10 px-10 flex items-center mb-10 text-gray-700 hover:text-gray-800"
        onClick={goBack}
      >
        <IoIosArrowBack size={20} />
        <span className="text-[17px] ml-3">Search Page </span>
      </button>
      <div
        className="flex flex-col  md:flex-row w-full px-10 pb-10 "
        style={{}}
      >
        <div className=" flex flex-col w-full md:w-1/2">
          <img src={noimage} />
          <div
            className={`flex justify-between w-full py-10 ${
              isLiked ? "liked" : ""
            }`}
          >
            <div className="flex flex-col">
              <h1 className="font-bold">{recipe.name}</h1>
              <p className="font-[500]">{recipe.time}</p>
            </div>
            <LikeButton onClick={() => handleLike(recipe)} />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 max-h-[100vh] overflow-auto md:px-10">
          <div className="mb-10">
            <h1 className="mb-3 text-[17px] font-[500] md:text-[20px]">
              Ingredients:
            </h1>
            {recipe.ingredients
              .split("-")
              .filter((ingredient) => ingredient.trim() !== "")
              .map((ingredient, index) => (
                <p key={index}>- {ingredient.trim()}</p>
              ))}
          </div>

          <div className="mb-10">
            <h1 className="text-[17px] font-[500] md:text-[20px]">
              Instructions:
            </h1>
            {recipe.instructions
              .split(/(?=\d+\.\s)/)
              .filter((instruction) => instruction.trim() !== "")
              .map((instruction, index) => (
                <p className="my-3" key={index}>
                  {instruction.trim()}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Recipe not found</p>
  );
};

export default RecipeDetails;
