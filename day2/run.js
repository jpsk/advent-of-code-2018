/**
* PART ONE
* */

function part1(input) {
  let twoCount = 0;
  let threeCount = 0;

  const shouldIterate = (arr) => arr.length > Array.from(new Set(arr)).length;

  const match = (arr) => {
    let foundTwo = 0;
    let foundThree = 0;

    iteratedOver = {};

    for (a in arr) {
      if (iteratedOver[arr[a]]) {
        // console.log('iterated over', arr[a]);
        continue;
      }

      if (foundTwo && foundThree) {
        return [1, 1];
      }

      const filtered = arr.filter(x => x === arr[a]);
      // console.log({filtered, a: arr[a]});

      if (filtered.length === 2) {
        foundTwo = 1;
      }

      if (filtered.length === 3) {
        foundThree = 1;
      }
      iteratedOver[arr[a]] = true;
    }
    return [foundTwo, foundThree]
  }

  input.reduce((p, c) => {
    const m = match(c.split(''));
    twoCount += m[0];
    threeCount += m[1];
  }, 0);

  return twoCount * threeCount;
}

function part2(input) {
  /**
  * PART 2
  * */
  let found;
  for (let i = 0; i < input[0].length; i++) {
    const splicedInput = input.map(x => {
      return x.slice(0, i) + x.slice(i + 1);
    });

    for (x in splicedInput) {
      const filtered = splicedInput.filter(s => s === splicedInput[x]);
      if (filtered.length > 1) {
        found = splicedInput[x];
        break;
      }
    }
    if (found) {
      break;
    }
  }

  return found;
}

module.exports = { part1, part2 };
