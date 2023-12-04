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

const getCardWinMap = (cards: Card[]) => {
  // map with card id as key and number of wins as value
  const cardWinMap = new Map<number, number>();
  cards.forEach((card) => {
    cardWinMap.set(card.id, getCardMatches(card));
  });
  return cardWinMap;
};

const getTotalAmountOfCards = (cardWinMap: Map<number, number>) => {
  let totalAmountOfCards = 0;
  // map that represents the actual won cards - key is the id of the card and value is the amount of times the card has been won
  const actualWinMap = initializeActualWinMap(cardWinMap.size);
  cardWinMap.forEach((cardWins, cardId) => {
    processCard(cardId, cardWins, actualWinMap);
  });
  actualWinMap.forEach((cardWins) => {
    totalAmountOfCards += cardWins;
  });
  return totalAmountOfCards;
};

const processCard = (
  cardId: number,
  cardWins: number,
  actualWinMap: Map<number, number>
) => {
  const actualWins = actualWinMap.get(cardId) ?? 0;
  // go over the amount of wins this card has up to this point
  for (let i = 0; i < actualWins; i++) {
    // enter another actual card win to each card that comes after the winning card based on the amount of cards this winning card wins
    for (let j = cardId + 1; j < cardId + 1 + cardWins; j++) {
      if (actualWinMap.has(j)) {
        const currentWins = actualWinMap.get(j);
        if (currentWins) actualWinMap.set(j, currentWins + 1);
      }
    }
  }
};

const initializeActualWinMap = (size: number) => {
  const actualWinMap = new Map<number, number>();
  for (let i = 1; i <= size; i++) {
    actualWinMap.set(i, 1);
  }
  return actualWinMap;
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
  const cardWinMap = getCardWinMap(cards);
  const totalAmountOfCards = getTotalAmountOfCards(cardWinMap);
  console.log("TOTAL AMOUNT OF CARDS: " + totalAmountOfCards);
};

partTwo();
