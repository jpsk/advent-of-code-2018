function setLocations(input) {
  const _map = [];
  for (i in input) {
    const [x, y] = input[i].position;
    if (!_map[y]) {
      _map[y] = [];
    }

    _map[y][x] = i;
  }
  return _map;
}

function normalizeWithDistanceToZero(item, name) {
  return { position: item, distanceToZero: item[0] + item[1], name: `${name}` };
}

function findBounds(input) {
  const PADDING = 2;
  const arrX = input.map(i => i[0]);
  const arrY = input.map(i => i[1]);
  let [minX, minY] = [Math.min(...arrX), Math.min(...arrY)];
  let [maxX, maxY] = [Math.max(...arrX) + PADDING, Math.max(...arrY) + PADDING];

  return { minX, minY, maxX, maxY };
}

function normalizeInput(input) {
  return input
    .map(normalizeWithDistanceToZero)
    .sort((a, b) => a.distanceToZero - b.distanceToZero)
}

function calculateDistanceToPoint(x, y, candidatePosition) {
  const distX = Math.abs(x - candidatePosition[0]);
  const distY = Math.abs(y - candidatePosition[1]);
  return distX + distY;
}

function findSquareOwner(x, y, inp) {
  let squareOwner; // ?
  let minDist;
  let idx = 0;
  let found = false;

  while (true) {

    if (!inp[idx]) {
      return squareOwner;
    }
    const distance = calculateDistanceToPoint(x, y, inp[idx].position);

    if (typeof squareOwner === 'undefined' || (distance < minDist)) {
      squareOwner = `${inp[idx].name}`; // ?
      minDist = distance; // ?
      idx = idx + 1;
      continue;
    }

    if (distance === minDist) {
      squareOwner = '*';
    }

    idx++;
  }

  return `${squareOwner}`;
}

function part1(input) {
  const normalized = normalizeInput(input);
  let _map = setLocations(normalized); // ?
  const bounds = findBounds(input); // ?
  for (let y = 0; y < bounds.maxY; y++) {
    for (let x = 0; x < bounds.maxX; x++) {
      if (typeof _map[y] === 'undefined') {
        _map[y] = []; // ?
      }
      _map[y][x] = findSquareOwner(x, y, normalized); // ?
    }
  }

  const boundaryMembers = [];

  for (let y = 0; y < bounds.maxY; y++) {
    for (let x = 0; x < bounds.maxX; x++) {
      const bound = [0, bounds.maxX - 1].includes(x) || [0, bounds.maxY - 1].includes(y);
      if (bound) {
        boundaryMembers.push(_map[y][x]);
      };
    }
  }

  const members = Array.from(new Set(boundaryMembers));

  const valMap = {};

  for (let y = 0; y < bounds.maxY; y++) {
    for (let x = 0; x < bounds.maxX; x++) {
      const item = _map[y][x];
      if (!members.includes(item)) {
        valMap[item] = (valMap[item] || 0) + 1;
      }
    }
  }

  return Math.max(...Object.values(valMap));
}

function getCellValue(x, y, input, limit) {
  acc = 0;
  for (i in input) {
    if (acc >= limit) {
      break;
    }
    const item = input[i];
    acc += Math.abs(item.position[0] - x) + Math.abs(item.position[1] - y);
  }
  return acc < limit ? '#' : '-';
}

function part2(input, limit) {
  const lim = limit || 10000;
  const normalized = normalizeInput(input);
  const bounds = findBounds(input);
  let _map = [];
  for (let y = 0; y < bounds.maxY; y++) {
    for (let x = 0; x < bounds.maxX; x++) {
      if (typeof _map[y] === 'undefined') {
        _map[y] = [];
      }
      _map[y][x] = getCellValue(x, y, normalized, lim);
    }
  }

  const result = _map.map(i => i.join('')).join('');
  return result.match(/#/g).length;

}

module.exports = { part1, part2, findSquareOwner, calculateDistanceToPoint, normalizeInput };
