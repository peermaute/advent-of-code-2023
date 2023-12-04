import { difficultActualInput } from "./input";

type Card = {
  winningNumbers: number[];
  numbers: Set<number>;
};

const getCard = (card: string): Card => {
  let [cardName, cardNumbers] = card.split(":");
  cardNumbers = cardNumbers.trim();
  let [winningNumbers, numbers] = cardNumbers.split("|");
  winningNumbers = winningNumbers.trim();
  numbers = numbers.trim();
  const winningNumbersArray = winningNumbers
    .split(" ")
    .map((number) => parseInt(number))
    .filter((number) => !isNaN(number));
  const numbersArray = numbers
    .split(" ")
    .map((number) => parseInt(number))
    .filter((number) => !isNaN(number));
  return {
    winningNumbers: winningNumbersArray,
    numbers: new Set(numbersArray),
  };
};

const partOne = () => {
  const cards: Card[] = [];
  difficultActualInput.forEach((card: string) => {
    console.log(card);
    const cardObject = getCard(card);
    cards.push(cardObject);
    console.log(cardObject);
  });
  let totalPoints = 0;
  cards.forEach((card) => {
    let cardMatches = 0;
    card.winningNumbers.forEach((winningNumber) => {
      if (card.numbers.has(winningNumber)) {
        cardMatches++;
      }
    });
    console.log("CARD MATCHES: " + cardMatches);
    const cardPoints = cardMatches > 0 ? Math.pow(2, cardMatches - 1) : 0;
    console.log("CARD POINTS: " + cardPoints);
    totalPoints += cardPoints;
  });
  console.log("TOTAL POINTS: " + totalPoints);
  //reduce cards to sum up points per card
  //log it
};

partOne();
