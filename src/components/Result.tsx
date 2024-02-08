import { useContext } from "react";
import generResult from "../assets/genres";
import { FilterAndMovieContext } from "../MovieForMe";
import capitalizer from "../assets/capitalizer";
import ratingsResult from "../assets/ratings";
import ratingsFromSrcResult from "../assets/ratingSources";
export default function Result() {
  const movie = useContext(FilterAndMovieContext)[1];
  if ("Error" in movie) return <h1>{movie.Error}</h1>;
  return (
    <div className="relative font-[poppins] font-light h-screen grid grid-cols-3 grid-rows-[8] auto-rows-[auto_auto_auto_auto_15%_15%_auto_auto] gap-1 result">
      <div className=" col-span-full md:col-start-1 md:col-end-3">
        {<Gener />}
      </div>
      <div className=" col-span-full md:col-start-3 md:col-end-4 row-start-8 md:row-start-1 md:row-end-4">
        {<SrcRating />}
      </div>
      <div className=" col-start-1 col-end-3 md:col-end-2 row-start-2 row-end-4">
        {<YearOfRelease />}
      </div>
      <div className=" col-start-3 md:col-start-2 col-end-3 row-start-2 row-end-4">
        {<Rating />}
      </div>
      <div className=" col-span-4 row-start-4 row-end-5 flex items-center justify-center">
        <p className=" px-6 text-sm md:text-base">{movie.Plot}</p>
      </div>
      <div className="col-start-1 col-end-2 row-start-5 row-end-7">
        <img
          className="h-full mx-auto hover:absolute top-0"
          src={movie.Poster}
          alt="img"
        />
      </div>
      <div className=" col-start-2 col-end-4 row-start-5 row-end-6 flex items-center justify-center text-2xl md:text-3xl font-semibold">
        <p>{movie.BoxOffice}</p>
      </div>
      <div className=" col-start-2 col-end-4 row-start-6 row-end-7 flex items-center justify-center text-2xl md:text-3xl font-semibold">
        {movie.imdbVotes} <span className="text-lg">votes</span>{" "}
      </div>
      <div className=" col-span-full row-start-7 row-end-8 flex items-center justify-center font-semibold">
        <div>
          <p className="text-2xl">{movie.Awards.split("&")[0]}</p>
          <p className="text-xl">{movie.Awards.split("&")[1]}</p>
        </div>
      </div>
    </div>
  );
}

function Gener() {
  const [filter, movie] = useContext(FilterAndMovieContext);
  const { matchedGeners, movieGenres } = generResult(filter.gener, movie.Genre);

  const resultantElement = movieGenres.map((genre) => (
    <div
      className={`flex items-center justify-center  relative rounded-md  grow py-1 text-sm md:text-base border ${
        matchedGeners.includes(genre) ? "border-green-400" : "border-red-400"
      }`}
    >
      <img
        className=" absolute right-0 scale-50 md:scale-75"
        src={`/${matchedGeners.includes(genre) ? "tick" : "cross"}.svg`}
        alt=""
      />
      <p>{capitalizer(genre)}</p>
    </div>
  ));
  return (
    <div className="p-1 w-full h-full flex items-center gap-1">
      {resultantElement}
    </div>
  );
}

function YearOfRelease() {
  const [filter, movie] = useContext(FilterAndMovieContext);
  const releaseYear = parseInt(movie.Year);
  const isReleaseYearInbetweenRange =
    filter.yearOfRelease.start <= releaseYear &&
    filter.yearOfRelease.end >= releaseYear;

  return (
    <div className="relative p-1 w-full h-full flex items-center justify-center text-4xl md:text-6xl font-semibold rounded-md">
      <img
        className=" absolute bottom-0 right-0"
        src={`/${isReleaseYearInbetweenRange ? "tick" : "cross"}.svg`}
        alt=""
      />
      <p>{releaseYear}</p>
    </div>
  );
}
function Rating() {
  const [filter, movie] = useContext(FilterAndMovieContext);
  const rating = movie.Rated;
  const isDesirRated = ratingsResult(filter.rating, rating).matchedRating
    ?.length
    ? true
    : false;
  return (
    <div className="relative p-1 w-full h-full flex items-center justify-center text-2xl md:text-6xl font-semibold rounded-md">
      <img
        className=" absolute bottom-0 right-0"
        src={`/${isDesirRated ? "tick" : "cross"}.svg`}
        alt=""
      />
      <p>{rating}</p>
    </div>
  );
}

function SrcRating() {
  const [filter, movie] = useContext(FilterAndMovieContext);
  const result = ratingsFromSrcResult(filter.ratingFromSrc, movie.Ratings);
  const ratings = movie.Ratings;
  const tailwind =
    "w-3/4 p-1 rounded flex items-center justify-between border-2 border-black";

  return (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <div
        className={`${tailwind} ${
          result.imdb ? "border-green-400" : "border-red-400"
        }`}
      >
        <img className="h-6 " src={`/imdb-logo.png`} alt="" />
        <p>IMDB</p>
        <p className=" font-semibold">{parseInt(ratings[0].Value)}</p>
      </div>

      {ratings[1] && (
        <div
          className={`${tailwind}  ${
            result.rottenTomato ? "border-green-400" : "border-red-400"
          }`}
        >
          <img className="h-6 " src={`/rotten Tomato-logo.png`} alt="" />
          <p>Rotten Tomatoes</p>
          <p className=" font-semibold">{parseInt(ratings[1].Value) / 10}</p>
        </div>
      )}

      {ratings[2] && (
        <div
          className={`${tailwind}  ${
            result.metacritic ? "border-green-400" : "border-red-400"
          }`}
        >
          <img className="h-6 " src={`/metacritic-logo.png`} alt="" />
          <p>Metacritic</p>
          <p className=" font-semibold">{parseInt(ratings[2].Value) / 10}</p>
        </div>
      )}
    </div>
  );
}
