import { difficultActualInput } from "./input";

type Card = {
  id: number;
  winningNumbers: number[];
  numbers: Set<number>;
};

const getCard = (card: string): Card => {
  let [cardName, cardNumbers] = card.split(":");
  cardName = cardName.replace("Card ", "");
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
    id: parseInt(cardName),
    winningNumbers: winningNumbersArray,
    numbers: new Set(numbersArray),
  };
};

const calculateTotalPoints = (cards: Card[]) => {
  let totalPoints = 0;
  cards.forEach((card) => {
    let cardMatches = getCardMatches(card);
    console.log("CARD MATCHES: " + cardMatches);
    const cardPoints = cardMatches > 0 ? Math.pow(2, cardMatches - 1) : 0;
    console.log("CARD POINTS: " + cardPoints);
    totalPoints += cardPoints;
  });
  return totalPoints;
};

const getCardMatches = (card: Card) => {
  let cardMatches = 0;
  card.winningNumbers.forEach((winningNumber) => {
    if (card.numbers.has(winningNumber)) {
      cardMatches++;
    }
  });
  return cardMatches;
};

const partOne = () => {
  const cards: Card[] = [];
  difficultActualInput.forEach((card: string) => {
    console.log(card);
    const cardObject = getCard(card);
    cards.push(cardObject);
    console.log(cardObject);
  });
  const totalPoints = calculateTotalPoints(cards);
  console.log("TOTAL POINTS: " + totalPoints);
};

const partTwo = () => {
  const cards: Card[] = [];
  difficultActualInput.forEach((card: string) => {
    console.log(card);
    const cardObject = getCard(card);
    cards.push(cardObject);
    console.log(cardObject);
  });
};

partOne();
