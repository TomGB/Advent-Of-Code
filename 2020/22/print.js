// print builder: returns a logging function that only logs when debug is truthy
const print = (debug = false) => {
  return (...args) => {
    if (debug) console.log(...args);
  };
};

module.exports = print;
