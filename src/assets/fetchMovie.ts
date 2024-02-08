export default async function fetchMovieData(title: string) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=1d4ce8d4&t=${title}`
  );
  if (!response.ok) {
    const message = await response.text().then((t) => t);
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}
