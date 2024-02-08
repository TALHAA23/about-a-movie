import { ChangeEvent, useState } from "react";
import fetchMovieData from "../assets/fetchMovie";

export default function Search({ movieSetter }: any) {
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  async function getMovieData() {
    setLoading(true);
    const search: HTMLInputElement | null = document.querySelector(
      "input[name='search']"
    );
    const searchParams = search?.value;
    try {
      if (!searchParams) return;
      const data = await fetchMovieData(searchParams);
      movieSetter(data);
      setIsSearched(true);
    } catch (err) {
      movieSetter(false);
      setIsSearched(false);
    } finally {
      setLoading(false);
    }
  }

  function changeSearchBarPosition() {
    setIsSearched(false);
  }
  function showResultIfExist(event: ChangeEvent<HTMLInputElement>) {
    event.target.value.length && setIsSearched(true);
  }

  return (
    <div
      className={` w-full flex items-center justify-center px-[10%] transition-all duration-1000 ${
        isSearched ? "h-[15%]" : "h-full"
      } search`}
    >
      {loading && <Spinner />}
      <input
        onFocus={changeSearchBarPosition}
        onBlur={(e) => showResultIfExist(e)}
        name="search"
        type="text"
        placeholder="Movie Name"
        className=" group-hover:scale-x-0 origin-right transition-all duration-1000 font-semibold max-w-[1000px]  flex-grow  border-2 border-blue-400 rounded-full rounded-r-none py-3 pl-3"
      />
      <button
        onClick={getMovieData}
        className=" group-hover:bg-white group-hover:text-black transition duration-1000 border-2 border-blue-400 rounded-full rounded-l-none bg-blue-400 py-3 px-5 text-white font-semibold hover:bg-blue-300"
      >
        Search
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className=" animate-spin scale-125 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
    >
      <path
        fill="blue"
        d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
      />
    </svg>
  );
}
