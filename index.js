exports.convertDuration = (duration) => {
  let numberRegExp = '\\d*(?:[\.,]\\d*)?';
  let durationRegExpS = `(?:(${numberRegExp})S)?)?`;
  let durationRegExpTM = `(?:(${numberRegExp})M)?`;
  let durationRegExpH = `(?:T(?:(${numberRegExp})H)?`;
  let durationRegExpD = `(?:(${numberRegExp})D)?`;
  let durationRegExpM = `(?:(${numberRegExp})M)?`;
  let durationRegExpY = `(?:(${numberRegExp})Y)?`;
  let durationRegExp = new RegExp(`^P${durationRegExpY}${durationRegExpM}${durationRegExpD}${durationRegExpH}${durationRegExpTM}${durationRegExpS}`);

  let matchResult = duration.match(durationRegExp);

  if (matchResult === null)
    return null;

  let durationResult = {year:undefined, month:undefined, day:undefined, hour:undefined, minute:undefined, second:undefined};
    
  for (let matchResultIndex = 0; matchResultIndex < matchResult.length; matchResultIndex++) {
    let value = matchResult[matchResultIndex];

    if (value !== undefined)
      value = Number(matchResult[matchResultIndex].replace(',', '.'));
        
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
    }
  }
    
  let isAllUndefined = true;

  for (let property in durationResult) {
    if (durationResult[property] !== undefined)
      isAllUndefined = false;
  }

  if (isAllUndefined)
    return null;

  return durationResult;
};

exports.convertYouTubeDuration = (duration) => {
  let durationResult = exports.convertDuration(duration);
  
  if (durationResult === null)
    return null;
  
  let hour = 0;
  let minute = 0;
  let second = 0;
  
  if (durationResult.year !== undefined)
    hour += durationResult.year * 365 * 24;
  
  if (durationResult.month !== undefined)
    hour += durationResult.month * 30 * 24;
  
  if (durationResult.day !== undefined)
    hour += durationResult.day * 24;
  
  if (durationResult.hour !== undefined)
    hour += durationResult.hour;
  
  if (durationResult.minute !== undefined)
    minute += durationResult.minute;
  
  if (durationResult.second !== undefined)
    second += durationResult.second;
          
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
  
  if (hour !== 0)
    hms += hour.toString() + ':';
  
  if (minute < 10 && hour !== 0)
    hms += '0' + minute.toString() + ':';
  else
    hms += minute.toString() + ':';
  
  if (second < 10)
    hms += '0' + second.toString();
  else
    hms += second.toString();
  
  return hms;
};