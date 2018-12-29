module.exports = run = function (input) {
  const hashList = { 0: true };
  const length = input.length;

  let found;
  let accumulator = 0;
  let idx = 0;

  debugger;
  while (typeof found === 'undefined') {
    const item = input[idx % length];
    accumulator = accumulator + item;
    if (!hashList[accumulator]) {
      hashList[accumulator] = true;
      idx++;
    } else {
      found = accumulator;
    }
  }
  return ({ found, length })
}
