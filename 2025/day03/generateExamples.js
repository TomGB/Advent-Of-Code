const randomArray = (length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 9) + 1);
  }
  return arr;
};

const length = 5;

const myArray = randomArray(length);

console.log(myArray.join(""));

const permutations = [];

for (let i = 0; i < length; i++) {
  for (let j = 0; j < length; j++) {
    if (i == j) continue;
    const clone = myArray.slice();
    clone[i] = null;
    clone[j] = null;

    permutations.push(parseInt(clone.join("")));
  }
}

let max = 0;
permutations.forEach((num) => {
  if (num > max) {
    max = num;
  }
});

console.log(max);

