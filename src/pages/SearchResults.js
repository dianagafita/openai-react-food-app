import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import RecipeCard from "../components/recipe/recipe-card";
import Loader from "../components/util/loader";
import { IoIosArrowBack } from "react-icons/io";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [promptResponses, setPromptResponses] = useState([]);
  const [previousResponses, setPreviousResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);

  const sanitizeString = (str) => {
    return str.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
  };

  const parseRecipeBlock = (block) => {
    try {
      const recipe = JSON.parse(block);
      return {
        name: recipe.name.trim(),
        time: recipe.time.trim(),
        ingredients: recipe.ingredients.trim(),
        instructions: recipe.instructions.trim(),
        image: recipe.image ? recipe.image.trim() : null,
      };
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  const getResponseForGivenPrompt = async (includePrevious = false) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      let formattedPrompt = `System: You are a helpful assistant that provides recipes with images. Generate elements content based on prompts and prepare and return all elements such as: {'name': '<value>'}. The response should be like: {"name": "Pasta Carbonara", "time": "20 min.", "ingredients": "-pasta -salt -piper etc.", "instructions": "1. put water into pasta 2. stir the pasta etc."};\nUser: Give me 3 recipe suggestions for ${query}`;

      if (includePrevious && previousResponses.length > 0) {
        const previousNames = previousResponses
          .map((recipe) => recipe.name)
          .join(", ");
        formattedPrompt += ` Please provide different recipes than: ${previousNames}.`;
      }

      const result = await model.generateContent(formattedPrompt);
      const response = result.response;
      const text = await response.text();

      const recipeBlocks = text.match(/{[^}]+}/g);

      const parsedRecipes = recipeBlocks
        .map((block) => {
          const sanitizedBlock = sanitizeString(block);
          return parseRecipeBlock(sanitizedBlock);
        })
        .filter((recipe) => recipe !== null);

      setPreviousResponses(promptResponses);
      setPromptResponses(parsedRecipes);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      getResponseForGivenPrompt();
    }
  }, [query]);

  const handleSearchAgain = () => {
    getResponseForGivenPrompt(true);
  };

  return (
    <>
      {" "}
      <Link
        className="px-5 flex items-center mb-10 text-gray-700 hover:text-gray-800"
        to="/"
      >
        <IoIosArrowBack size={20} />
        <span className="text-[17px] ml-3">Favorites </span>
      </Link>
      <div className="w-[100vw] flex flex-col items-center justify-center">
        {loading ? (
          <div className="mx-auto mt-4">
            <Loader />
          </div>
        ) : (
          <>
            {promptResponses.length > 0 && (
              <>
                {" "}
                <div className="flex flex-col items-center ">
                  {promptResponses.map((recipe, index) => (
                    <RecipeCard key={index} data={[recipe]} />
                  ))}
                </div>{" "}
                <button
                  className="mt-5 px-4 py-2 bg-orange-500 text-white rounded mb-40"
                  onClick={handleSearchAgain}
                >
                  Get Different Recipes
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SearchResults;
