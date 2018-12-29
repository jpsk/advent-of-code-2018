function normalizeInput(input) {
  const getAction = (str) => {
    switch (true) {
      case str.includes('wakes'):
        return '+';
      case str.includes('falls'):
        return '-';
      default:
        return '#';
    }
  }

  return input.map(i => {
    const split = i.split(']');
    const date = new Date(split[0].replace('[', ''.concat(':00')));
    const guardID = split[1].indexOf('#') > -1 ? split[1].match(/#(.*?) /)[1] : null;
    const action = getAction(split[1]);
    return { date, guardID, action }
  })
}

function part1(input) {
  const normalized = normalizeInput(input).sort((a, b) => a.date - b.date); 
  const guardRegister = {};

  let activeGuard = null;
  let fallAsleepTime = 0;

  for (n in normalized) {
    const item = normalized[n];

    if (item.action === '#') {
      activeGuard = item.guardID;
      if (!guardRegister[item.guardID]) {
        guardRegister[item.guardID] = 0;
      }
    }

    if (item.action === '-') {
      fallAsleepTime = item.date;
    }

    if (item.action === '+') {
      guardRegister[activeGuard] += (item.date - fallAsleepTime);
      fallAsleepTime = 0;
    }
  }

  const gRegKeys = Object.keys(guardRegister);
  const sleeperID = gRegKeys.sort((a, b) => guardRegister[a] - guardRegister[b])[gRegKeys.length - 1];

  // Get Sleeper schedule
  let writingToSchedule = false;
  let sleeperSchedule = [];

  const otherGuardLogStarts = (item) => item.guardID && item.guardID !== sleeperID; 

  for (n in normalized) {
    const item = normalized[n];

    // Disable writeToSchedule when other guard log starts.
    if (otherGuardLogStarts(item)) {
      writingToSchedule = false;
    }

    // Enable writing to schedule when our sleeper starts its shift.
    if (item.guardID === sleeperID) {
      writingToSchedule = true;
    }

    // Write to sleeper's schedule.
    if (writingToSchedule) {
      sleeperSchedule.push(item);
    }
  }

  // Count slept minutes
  const timeline = Array(60).fill(0).reduce((p,c,i) => ({...p, [i]: 0}),{});
  let sleepStart = 0;

  for (s in sleeperSchedule) {
    const item = sleeperSchedule[s];
    if (item.action === '-') {
      sleepStart = item.date;
    }

    if (item.action === '+') {
      const sleepTime = (item.date - sleepStart) / 1000 / 60; 
      const sleepStartMinutes = sleepStart.getMinutes();
      for (let i = sleepStartMinutes; i < sleepStartMinutes + sleepTime; i++) {
        timeline[i] = timeline[i]+ 1;
      }
    }

  }
  
  const timelineKeys = Object.keys(timeline);
  const longestMinute = timelineKeys.sort((a,b) => timeline[a] - timeline[b])[timelineKeys.length - 1]; 
  return parseInt(longestMinute, 10) * parseInt(sleeperID, 10);
}

function part2(input) {
  const normalized = normalizeInput(input).sort((a, b) => a.date - b.date);
  const guardRegister = {};

  let activeGuard = null;
  let sleepStart = 0;

  for (n in normalized) {
    const item = normalized[n];

    if (item.action === '#') {
      activeGuard = item.guardID;
      if (!guardRegister[item.guardID]) {
        guardRegister[item.guardID] = Array(60).fill(0);
      }
    }

    if (item.action === '-') {
      sleepStart = item.date;
    }

    if (item.action === '+') {
      const sleepTime = (item.date - sleepStart) / 1000 / 60;
      const sleepStartMinutes = sleepStart.getMinutes();
      for (let i = sleepStartMinutes; i < sleepStartMinutes + sleepTime; i++) {
        guardRegister[activeGuard][i] = guardRegister[activeGuard][i] + 1;
      }
    }
  }

  // Find max minute and value of each guard
  for (g in guardRegister) {
    const timeline = guardRegister[g];
    const minute = timeline.indexOf(Math.max(...timeline));
    const value = timeline[minute];
    guardRegister[g]['max'] = {minute, value} 
  }

  const guardKeys = Object.keys(guardRegister);
  const sleeperID = guardKeys.sort((a,b) => guardRegister[a].max.value - guardRegister[b].max.value)[guardKeys.length -1];
  const sleeperMinute = guardRegister[sleeperID].max.minute;

  return sleeperID * sleeperMinute;
}

module.exports = { part1, part2 };
