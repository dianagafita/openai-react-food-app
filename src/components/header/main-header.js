import { useState, useEffect } from "react";
import headerImage from "./headerImage.jpeg";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";
    setInputValue(query);
  }, [location]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      navigate(`/search-results?query=${inputValue}`);
    }
  };

  return (
    <div className="w-[100vw] flex flex-col">
      <div
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundSize: "cover",
        }}
        className="w-full h-[250px] md:h-[300px] flex flex-col items-center justify-center relative"
      >
        <div className="flex w-[400px] md:w-[300px] items-center bg-white p-2 rounded shadow-md">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="What do you feel like eating?"
            className="focus:outline-none text-[16px] focus:ring-0 text-gray-400 form-control py-1 flex-grow mr-2"
          />
          <CiSearch
            onClick={handleSearch}
            className="cursor-pointer text-primary text-gray-400 hover:text-gray-600 active:text-gray-600"
            size={20}
            strokeWidth={0.4}
          />
        </div>{" "}
      </div>
    </div>
  );
}
