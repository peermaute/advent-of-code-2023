import { getLinesFromFile } from "../utils/fileUtils";

type Hand = {
  hand: string;
  bid: number;
};

type CardStrengths = {
  [key: string]: number;
};

const cardStrengthsPart1: CardStrengths = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

const cardStrengthsPart2: CardStrengths = {
  A: 14,
  K: 13,
  Q: 12,
  T: 11,
  "9": 10,
  "8": 9,
  "7": 8,
  "6": 7,
  "5": 6,
  "4": 5,
  "3": 4,
  "2": 3,
  J: 2,
};

const compareHands = (hand1: Hand, hand2: Hand, isPartOne: boolean): number => {
  const hand1Map = getHandMap(hand1.hand, isPartOne);
  const hand2Map = getHandMap(hand2.hand, isPartOne);
  if (hand1Map.size === hand2Map.size) {
    if (hand1Map.size === 2) {
      return compareQuadsAndFulls(
        hand1.hand,
        hand2.hand,
        hand1Map,
        hand2Map,
        isPartOne
      );
    }
    const highestValueHand1 = Math.max(...hand1Map.values());
    const highestValueHand2 = Math.max(...hand2Map.values());
    if (highestValueHand1 === highestValueHand2) {
      return compareByPureStrength(hand1.hand, hand2.hand, isPartOne);
    }
    return highestValueHand1 > highestValueHand2 ? 1 : -1;
  }
  if (hand1Map.size > hand2Map.size) {
    return -1;
  }
  if (hand1Map.size < hand2Map.size) {
    return 1;
  }
  return compareByPureStrength(hand1.hand, hand2.hand, isPartOne);
};

const compareQuadsAndFulls = (
  hand1: string,
  hand2: string,
  hand1Map: Map<string, number>,
  hand2Map: Map<string, number>,
  isPartOne: boolean
): number => {
  const hand1Max = Math.max(...hand1Map.values());
  const hand2Max = Math.max(...hand2Map.values());
  if (hand1Max > hand2Max) {
    return 1;
  }
  if (hand1Max < hand2Max) {
    return -1;
  }
  return compareByPureStrength(hand1, hand2, isPartOne);
};

const compareByPureStrength = (
  hand1: string,
  hand2: string,
  isPartOne: boolean
): number => {
  const cardStrengths = isPartOne ? cardStrengthsPart1 : cardStrengthsPart2;
  for (let i = 0; i < hand1.length; i++) {
    const hand1Card: string = hand1[i];
    const hand2Card: string = hand2[i];
    if (cardStrengths[hand1Card] === cardStrengths[hand2Card]) {
      continue;
    } else {
      return cardStrengths[hand1Card] < cardStrengths[hand2Card] ? -1 : 1;
    }
  }
  console.log("SHOULD NOT HAPPEN");
  return 0;
};

const getHandMap = (hand: string, isPartOne: boolean): Map<string, number> => {
  const handMap = new Map<string, number>();
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (handMap.has(card)) {
      handMap.set(card, (handMap.get(card) as number) + 1);
    } else {
      handMap.set(card, 1);
    }
  }
  if (!isPartOne && handMap.has("J")) {
    createBetterHand(handMap);
  }
  return handMap;
};

const createBetterHand = (handMap: Map<string, number>) => {
  if (handMap.size === 1) {
    return;
  }
  let highestValue = 0;
  let highestKey = "";
  handMap.forEach((value, key) => {
    if (value > highestValue) {
      highestValue = value;
      highestKey = key;
    }
  });
  handMap.set(highestKey, highestValue + (handMap.get("J") as number));
  handMap.delete("J");
};

const getTotalWinnings = (input: string[], isPartOne: boolean): number => {
  const hands: Hand[] = input.map((line: string) => {
    const [hand, bid] = line.split(" ");
    return { hand, bid: parseInt(bid) };
  });
  hands.sort((hand1, hand2) => compareHands(hand1, hand2, isPartOne));
  hands.forEach((hand) => {
    console.log(hand);
  });
  const totalWinnings = hands.reduce((acc, hand, index) => {
    return acc + hand.bid * (index + 1);
  }, 0);
  return totalWinnings;
};

export const partOne = (input: string[]) => {
  const totalWinnings = getTotalWinnings(input, true);
  console.log("TOTAL WINNINGS: " + totalWinnings);
};

export const partTwo = (input: string[]) => {
  const totalWinnings = getTotalWinnings(input, false);
  console.log("TOTAL WINNINGS: " + totalWinnings);
};
