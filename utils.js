const fs = require('fs');
const path = require('path');

module.exports = utils = {
  executeFn: (fn, input, optText) => {
    const start = process.hrtime();
    const ans = fn(input).toString();
    const end = process.hrtime(start);
    console.log(
      `| \x1b[32m${optText ? optText + '\x1b[0m \t' : ''}`,
      `| Answer: \x1b[35m${ans.padEnd(35, ' ')}\x1b[0m`,
      `| Execution time (hr): \x1b[36m${end[0]}s ${end[1] / 1000000}ms\x1b[0m`
    );
  },
  readInput: (dirname) => {
    return fs.readFileSync(path.resolve(dirname, 'input.txt'), { encoding: 'utf8' });
  }
};

