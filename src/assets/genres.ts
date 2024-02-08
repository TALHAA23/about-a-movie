export const GENRES = [
  "family",
  "adventure",
  "fantasy",
  ,
  "animation",
  "fiction",
  "science fiction",
  "romance",
  "triller",
  "horror",
  "mystery",
  "historical fiction",
  "drama",
  "poetry",
  "nonfiction",
  "westren",
  "comedy",
  "horror fiction",
  "literary fiction",
  "adventure fiction",
  "action",
  "crime fiction",
  "magical realism",
  "young adult",
  "action fiction",
  "science fantasy",
  "true crime",
];

interface GenersResult {
  geners: string[];
  movieGenres: string[];
  matchedGeners: string[];
  unMatchGenres: string[];
}

export default function generResult(
  userSelectedGener: [],
  genersFromMovie: string
): GenersResult {
  const movieGener = genersFromMovie
    .split(",")
    .map((gener) => gener.toLocaleLowerCase())
    .map((gener) => gener.trim());

  let matchedGeners: string[] = [];
  let unMatchGenres: string[] = [];
  userSelectedGener.map((gener) =>
    movieGener.includes(gener)
      ? matchedGeners.push(gener)
      : unMatchGenres.push(gener)
  );
  return {
    movieGenres: movieGener,
    geners: userSelectedGener,
    matchedGeners,
    unMatchGenres,
  };
}
