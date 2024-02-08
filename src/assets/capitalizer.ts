export default function capitalizer(word:string):string {
    let wordPieces = word.split("");
    let finalWord = wordPieces[0]
      .toUpperCase()
      .concat(wordPieces.join("").slice(1, wordPieces.length));
    return finalWord;
}