export const RATINGSRC = ["imdb", "rotten Tomato", "metacritic"];

interface SrcRating {
  imdb: boolean;
  rottenTomato: boolean;
  metacritic: boolean;
}

interface RatingInterfaceFromAPI {
  Source: string;
  Value: string;
}

export default function ratingsFromSrcResult(
  userProvidedRating: any,
  srcRatingOnMovie: RatingInterfaceFromAPI[]
): SrcRating {
  const srcRatingResult: SrcRating = {
    imdb: false,
    rottenTomato: false,
    metacritic: false,
  };

  srcRatingOnMovie.map((rating) => {
    if (rating.Source == "Internet Movie Database") {
      parseInt(rating.Value) >= userProvidedRating?.imdb
        ? (srcRatingResult.imdb = true)
        : (srcRatingResult.imdb = false);
    } else if (rating.Source == "Rotten Tomatoes") {
      parseInt(rating.Value) / 10 >= userProvidedRating.rottenTomato
        ? (srcRatingResult.rottenTomato = true)
        : (srcRatingResult.rottenTomato = false);
    } else if (rating.Source == "Metacritic") {
      parseInt(rating.Value) / 10 >= userProvidedRating.metacritic
        ? (srcRatingResult.metacritic = true)
        : (srcRatingResult.metacritic = false);
    } else {
      throw new Error("Unhandled Source");
    }
  });

  return srcRatingResult;
}
