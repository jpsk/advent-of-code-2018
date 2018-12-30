

const lowerCharCodeMap = Array(26).fill(97).reduce((p, c, i) => ({...p, [String.fromCharCode(c+i)]: String.fromCharCode(c+i - 32)}),{});
const upperCharCodeMap = Array(26).fill(97).reduce((p, c, i) => ({...p, [String.fromCharCode(c+i - 32)]: String.fromCharCode(c+i)}),{});
const charMap = {...lowerCharCodeMap, ...upperCharCodeMap}; // ?

function reduce (pointer, sequence) {
  const reductable = sequence[pointer] === charMap[sequence[pointer+1]];
  if (reductable) {
    const part1 = sequence.slice(0, pointer);
    const part2 = sequence.slice(pointer+2);
    return [pointer-1, part1 + part2]; // ?
  }
  return [pointer+1, sequence];
}

function part1(input) {
  let pointer = 0;
  let sequence = input;
  let obs;

  while (pointer < sequence.length -1 ) {
    const [newPointer, newSequence] = reduce(pointer, sequence);
    length = newSequence.length;
    pointer = newPointer;
    sequence = newSequence;
    obs = newSequence.slice(0, 50);
  }

  return sequence.length;
}

function part2(input) {
  const lengthMap = Object.keys(lowerCharCodeMap).map(key => {
    const trimmed = input.replace(new RegExp(`${key}|${lowerCharCodeMap[key]}`, 'g'), '');
    return part1(trimmed);
  })
  return Math.min(...lengthMap);
}

module.exports = { part1, part2, reduce }
