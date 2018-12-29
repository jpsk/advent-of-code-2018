function normalizeInput(input) {
  return input.map(i => {
    const int = i.split('@');
    const claimID = int[0].trim();
    const zxcv = int[1].trim().split(':');
    const location = zxcv[0].split(',').map(i => parseInt(i, 10));
    const dimensions = zxcv[1].trim().split('x').map(i => parseInt(i, 10))
    return { claimID, location, dimensions };
  });
}

function getPlane(input) {
  const normalized = normalizeInput(input);

  let plane = [];

  for (n in normalized) {
    const item = normalized[n];

    const locationY = item.location[1];
    const locationX = item.location[0];

    for (let yStart = locationY; yStart < locationY + item.dimensions[1]; yStart++) {
      if (!plane[yStart]) {
        plane[yStart] = [];
      }

      for (let xStart = locationX; xStart < locationX + item.dimensions[0]; xStart++) {
        let target = plane[yStart][xStart];
        plane[yStart][xStart] = target ? 'X' : '#';
      }

    }
  }
  return plane;
}

function reducePlane(plane) {
  return plane.reduce((p, c) => {
    if (typeof c === 'undefined') {
      return p;
    }

    if (typeof c === 'string') {
      return p.concat(c);
    }

    return p.concat(reducePlane(c));

  }, '')
}

function part1(input) {
  const plane = getPlane(input);
  const reducedString = reducePlane(plane);
  return (reducedString.match(/X/g) || []).length;
}

function part2(input) {
  const normalized = normalizeInput(input);
  const plane = getPlane(input);

  for (n in normalized) {
    const item = normalized[n];
    const locationY = item.location[1];
    const locationX = item.location[0];

    let overlaps = false;

    for (let yStart = locationY; yStart < locationY + item.dimensions[1]; yStart++) {
      if (overlaps) {
        break;
      }
      for (let xStart = locationX; xStart < locationX + item.dimensions[0]; xStart++) {
        if (overlaps) {
          break;
        }
        const cell = plane[yStart][xStart]
        if (cell === 'X') {
          overlaps = true;
        }
      }
    }
    if (!overlaps) {
      return item.claimID;
    }
  }
}

module.exports = { part1, part2 };
