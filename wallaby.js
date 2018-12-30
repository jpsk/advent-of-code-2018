module.exports = function (wallaby) {
  return {
    files: [
      'day*/*.js',
      '!day*/*test.js',
    ],

    tests: [
      'day*/*test.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

  };
};
