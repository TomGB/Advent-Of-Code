const roundNumber = 1;

const runRound = (deck1, deck2) => {
  console.log(`\n\ndeck1: ${deck1.length}, deck2: ${deck2.length}`);
  // console.log(`\n-- Round ${roundNumber} --`);
  // console.log(`Player 1's deck: ${deck1.join(", ")}`);
  // console.log(`Player 2's deck: ${deck2.join(", ")}`);
  // console.log(`Player 1 plays: ${deck1[0]}`);
  // console.log(`Player 2 plays: ${deck2[0]}`);
  const card1 = deck1.shift();
  const card2 = deck2.shift();

  if (card1 > card2) {
    // console.log("Player 1 wins the round!");
    deck1.push(card1);
    deck1.push(card2);
  } else {
    // console.log("Player 2 wins the round!");
    deck2.push(card2);
    deck2.push(card1);
  }
};

const partOne = (input) => {
  const [deck1, deck2] = input
    .replace("Player 1:\n", "")
    .split("\n\nPlayer 2:\n")
    .map((line) => line.split("\n").map(Number));

  console.log(deck1, deck2);

  do {
    runRound(deck1, deck2);
  } while (deck1.length > 0 && deck2.length > 0);

  console.log("\n== Post-game results ==");
  console.log(`Player 1's deck: ${deck1.join(", ")}`);
  console.log(`Player 2's deck: ${deck2.join(", ")}`);

  const winningDeck = deck1.length > 0 ? deck1 : deck2;
  const score = winningDeck
    .reverse()
    .reduce((acc, card, index) => acc + card * (index + 1), 0);

  console.log(`Winning player's score: ${score}`);
  return score;
};

module.exports = partOne;
