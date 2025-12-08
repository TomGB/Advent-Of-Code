const { solve, getDistance, processRawInput, getClosestPair } = require("./part1");
const { readInputFile } = require("../../lib/input");

describe("Part 1", () => {
  test("JS array behaviour", () => {
    const array = [{ id: 1 }, { id: 2},{ id: 3}];

    const one = array.find(({id}) => id == 1)?.id;

    console.log(one)

    array[0].id=6;

    console.log(one);
  })
  test("In this example, the two junction boxes which are closest together are 162,817,812 and 425,690,689", () => {

    const testInput = readInputFile("testinput.txt");
    const input = processRawInput(testInput);

    expect(getClosestPair(input)).toMatchObject({ pointA: [162, 817, 812], pointB: [425, 690, 689] });

  })
  test("After connecting 10 circuits the product of the 3 largest circuits should be 40", () => {

  })
});

describe("getDistance", () => {
  
  test("should return 0 for identical coordinates", () => {
    expect(getDistance([0, 0, 0], [0, 0, 0])).toBe(0);
  });

  test("for simple 3-4-5 triangle", () => {
    expect(getDistance([0, 0, 0], [3, 4, 0])).toBeCloseTo(5, 2);
  });

  test("between 162,817,812 and 425,690,689 should be 316.90", () => {
    expect(getDistance([162, 817, 812], [425, 690, 689])).toBeCloseTo(316.90, 2);
  });

  test("with large coordinates in hundreds", () => {
    expect(getDistance([0, 0, 0], [300, 400, 0])).toBeCloseTo(500, 2);
  });

  test("with large negative coordinates", () => {
    expect(getDistance([-500, -600, -700], [500, 600, 700])).toBeCloseTo(2097.62, 2);
  });

  test("should be symmetric", () => {
    const p1 = [100, 200, 300];
    const p2 = [400, 500, 600];
    expect(getDistance(p1, p2)).toBeCloseTo(getDistance(p2, p1), 5);
  });
});
