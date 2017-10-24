exports.convertDuration = (duration) => {
  if (typeof duration !== 'string') {
    return null;
  }

  const numberRegExp = '\\d+(?:[\.,]\\d+)?';
  const durationRegExpS = `(?:(${numberRegExp})S)?)?`;
  const durationRegExpTM = `(?:(${numberRegExp})M)?`;
  const durationRegExpH = `(?:T(?:(${numberRegExp})H)?`;
  const durationRegExpD = `(?:(${numberRegExp})D)?`;
  const durationRegExpM = `(?:(${numberRegExp})M)?`;
  const durationRegExpY = `(?:(${numberRegExp})Y)?`;
  const durationRegExp = new RegExp(`^P${durationRegExpY}${durationRegExpM}${durationRegExpD}${durationRegExpH}${durationRegExpTM}${durationRegExpS}$`);

  const matchResult = duration.match(durationRegExp);

  if (matchResult === null) {
    return null;
  }

  let durationResult = {
    year: undefined,
    month: undefined,
    day: undefined,
    hour: undefined,
    minute: undefined,
    second: undefined,
  };

  for (let matchResultIndex = 0; matchResultIndex < matchResult.length; matchResultIndex++) {
    let value = matchResult[matchResultIndex];

    if (value !== undefined) {
      value = Number(matchResult[matchResultIndex].replace(',', '.'));
    }

    switch (matchResultIndex) {
      case 1:
        durationResult.year = value;
        break;
      case 2:
        durationResult.month = value;
        break;
      case 3:
        durationResult.day = value;
        break;
      case 4:
        durationResult.hour = value;
        break;
      case 5:
        durationResult.minute = value;
        break;
      case 6:
        durationResult.second = value;
        break;
      default:
        break;
    }
  }

  let isAllUndefined = true;

  Object.keys(durationResult).forEach((key) => {
    if (durationResult[key] !== undefined) {
      isAllUndefined = false;
    }
  });

  if (isAllUndefined) {
    return null;
  }

  return durationResult;
};

exports.convertToSecond = (duration) => {
  const durationResult = exports.convertDuration(duration);

  if (durationResult === null) {
    return null;
  }

  let second = 0;

  Object.keys(durationResult).forEach((key) => {
    if (durationResult[key] !== undefined) {
      switch (key) {
        case 'year':
          second += durationResult[key] * 365 * 24 * 60 * 60;
          break;
        case 'month':
          second += durationResult[key] * 30 * 24 * 60 * 60;
          break;
        case 'day':
          second += durationResult[key] * 24 * 60 * 60;
          break;
        case 'hour':
          second += durationResult[key] * 60 * 60;
          break;
        case 'minute':
          second += durationResult[key] * 60;
          break;
        case 'second':
          second += durationResult[key];
          break;
        default:
          break;
      }
    }
  });

  return second;
};

exports.convertYouTubeDuration = (duration) => {
  const durationResult = exports.convertDuration(duration);

  if (durationResult === null) {
    return null;
  }

  let hour = 0;
  let minute = 0;
  let second = 0;

  if (durationResult.year !== undefined) {
    hour += durationResult.year * 365 * 24;
  }

  if (durationResult.month !== undefined) {
    hour += durationResult.month * 30 * 24;
  }

  if (durationResult.day !== undefined) {
    hour += durationResult.day * 24;
  }

  if (durationResult.hour !== undefined) {
    hour += durationResult.hour;
  }

  if (durationResult.minute !== undefined) {
    minute += durationResult.minute;
  }

  if (durationResult.second !== undefined) {
    second += durationResult.second;
  }

  minute += (hour - Math.floor(hour)) * 60;
  hour = Math.floor(hour);

  while (minute >= 60) {
    hour += 1;
    minute -= 60;
  }

  second += (minute - Math.floor(minute)) * 60;
  minute = Math.floor(minute);

  while (second >= 60) {
    minute += 1;
    second -= 60;
  }

  while (minute >= 60) {
    hour += 1;
    minute -= 60;
  }

  second = Math.round(second);

  let hms = '';

  if (hour !== 0) {
    hms += `${hour.toString()}:`;
  }

  if (minute < 10 && hour !== 0) {
    hms += `0${minute.toString()}:`;
  } else {
    hms += `${minute.toString()}:`;
  }

  if (second < 10) {
    hms += `0${second.toString()}`;
  } else {
    hms += second.toString();
  }

  return hms;
};
