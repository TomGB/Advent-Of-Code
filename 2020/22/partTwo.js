const deckStates = new Set();
const makePrint = require("./print");
const print = makePrint(true); // set to true to enable debug logs

// helper: deterministic key for a pair of decks
const stateKey = (d1, d2) => `${d1.join(",")}|${d2.join(",")}`;

// helper: record current state and return whether it was already present
const addState = (d1, d2) => {
  const key = stateKey(d1, d2);
  if (deckStates.has(key)) return true;
  deckStates.add(key);
  return false;
};

// helper: award cards to winner's deck in order
const awardCards = (winnerDeck, firstCard, secondCard) => {
  winnerDeck.push(firstCard);
  winnerDeck.push(secondCard);
};

// helper: play a subgame and return whether player1 won
const playSubgame = (card1, card2, deck1, deck2, gameNum) => {
  const newDeck1 = deck1.slice(0, card1);
  const newDeck2 = deck2.slice(0, card2);

  return playRounds(newDeck1, newDeck2, gameNum + 1, 1);
};

// helper: run rounds until one deck is empty; returns result of last runRound (true if player1 won last round)
const playRounds = (deck1, deck2, gameNum, startRound = 1) => {
  let roundNum = startRound;
  let lastResult = undefined;
  while (deck1.length > 0 && deck2.length > 0) {
    lastResult = runRound(roundNum, gameNum, deck1, deck2);
    roundNum++;
  }
  return lastResult;
};

const runRound = (roundNum, gameNum, deck1, deck2) => {
  if (addState(deck1, deck2)) {
    const card1 = deck1.shift();
    const card2 = deck2.shift();

    console.log("Player 1 wins due to deck repeat!");
    awardCards(deck1, card1, card2);
    return true;
  }

  print(`\n-- Round ${roundNum}, (Game ${gameNum}) --`);
  print(`Player 1's deck: ${deck1.join(", ")}`);
  print(`Player 2's deck: ${deck2.join(", ")}`);
  print(`Player 1 plays: ${deck1[0]}`);
  print(`Player 2 plays: ${deck2[0]}`);

  const card1 = deck1.shift();
  const card2 = deck2.shift();

  print(
    `Cards drawn: ${card1} and ${card2}, deck sizes: ${deck1.length} and ${deck2.length}`
  );

  if (card1 <= deck1.length && card2 <= deck2.length) {
    print("Playing a sub-game to determine the winner...\n");
    const player1WinsSubgame = playSubgame(card1, card2, deck1, deck2, gameNum);

    if (player1WinsSubgame) {
      print("Player 1 wins the round of the sub-game!");
      awardCards(deck1, card1, card2);
    } else {
      print("Player 2 wins the round of the sub-game!");
      awardCards(deck2, card2, card1);
    }

    return player1WinsSubgame;
  }

  if (card1 > card2) {
    print("Player 1 wins the round!");
    awardCards(deck1, card1, card2);
    return true;
  } else {
    print("Player 2 wins the round!");
    awardCards(deck2, card2, card1);
    return false;
  }
};

const runGame = (deck1, deck2) => {
  playRounds(deck1, deck2, 1, 1);

  console.log("\n== Post-game results ==");
  console.log(`Player 1's deck: ${deck1.join(", ")}`);
  console.log(`Player 2's deck: ${deck2.join(", ")}`);

  return [deck1, deck2];
};

const calculateScore = (deck) => {
  return deck
    .reverse()
    .reduce((acc, card, index) => acc + card * (index + 1), 0);
};

const partTwo = (input) => {
  const [deck1, deck2] = input
    .replace("Player 1:\n", "")
    .split("\n\nPlayer 2:\n")
    .map((line) => line.split("\n").map(Number));

  const [endDeck1, endDeck2] = runGame(deck1, deck2);
  calculateScore(endDeck1.length > 0 ? endDeck1 : endDeck2);

  console.log(`Winning player's score: ${score}`);
  return score;
};

module.exports = {
  runRound,
  runGame,
  calculateScore,
  partTwo,
};
