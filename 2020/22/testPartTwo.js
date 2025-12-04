const { runGame, calculateScore } = require("./partTwo");

// Decks specified by the user
const deck1 = [43, 19];
const deck2 = [2, 29, 14];

// Make copies because runGame mutates
const [end1, end2] = runGame([...deck1], [...deck2]);

console.log("Finished runGame");
console.log("End decks:", end1, end2);

// basic sanity: ensure it terminated and produced a winner
if (end1.length === 0 && end2.length === 0) {
  console.error("Error: both decks empty - unexpected");
  process.exit(2);
}

// print score for manual inspection
const score = calculateScore(end1.length > 0 ? end1 : end2);
console.log("Score:", score);

console.log("Test completed successfully");
process.exit(0);
