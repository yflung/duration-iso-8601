const durationISO8601 = require('./index');

// convertDuration(String)

test('part', () => {
  expect(durationISO8601.convertDuration('P5Y')).toEqual({year:5, month:undefined, day:undefined, hour:undefined, minute:undefined, second:undefined});
  expect(durationISO8601.convertDuration('P11M')).toEqual({year:undefined, month:11, day:undefined, hour:undefined, minute:undefined, second:undefined});
  expect(durationISO8601.convertDuration('P238D')).toEqual({year:undefined, month:undefined, day:238, hour:undefined, minute:undefined, second:undefined});
  expect(durationISO8601.convertDuration('PT15H')).toEqual({year:undefined, month:undefined, day:undefined, hour:15, minute:undefined, second:undefined});
  expect(durationISO8601.convertDuration('PT56M')).toEqual({year:undefined, month:undefined, day:undefined, hour:undefined, minute:56, second:undefined});
  expect(durationISO8601.convertDuration('PT384S')).toEqual({year:undefined, month:undefined, day:undefined, hour:undefined, minute:undefined, second:384});
  expect(durationISO8601.convertDuration('P18Y29,4M5DT36.66H1M289S')).toEqual({year:18, month:29.4, day:5, hour:36.66, minute:1, second:289});
  expect(durationISO8601.convertDuration('P1Y30DT15M39S')).toEqual({year:1, month:undefined, day:30, hour:undefined, minute:15, second:39});
});

test('T', () => {
  expect(durationISO8601.convertDuration('P23H')).toEqual(null);
  expect(durationISO8601.convertDuration('P8S')).toEqual(null);
});

test(', . negative', () => {
  expect(durationISO8601.convertDuration('P82.9Y')).toEqual({year:82.9, month:undefined, day:undefined, hour:undefined, minute:undefined, second:undefined});
  expect(durationISO8601.convertDuration('P8,99Y')).toEqual({year:8.99, month:undefined, day:undefined, hour:undefined, minute:undefined, second:undefined});
  expect(durationISO8601.convertDuration('P35,46Y')).toEqual({year:35.46, month:undefined, day:undefined, hour:undefined, minute:undefined, second:undefined});
  expect(durationISO8601.convertDuration('PT-50S')).toEqual(null);
});

test('not number', () => {
  expect(durationISO8601.convertDuration('P8sdwe!@Y')).toEqual(null);
  expect(durationISO8601.convertDuration('PT^li98S')).toEqual(null);
});

test('any input', () => {
  expect(durationISO8601.convertDuration('P87(*&(bfwefh')).toEqual(null);
  expect(durationISO8601.convertDuration('P)(*)(HKJGH12*(')).toEqual(null);
  expect(durationISO8601.convertDuration('ieurht834')).toEqual(null);
  expect(durationISO8601.convertDuration('^(*&*( qh2we')).toEqual(null);
});

// convertYouTubeDuration(String)

test('invalid syntax', () => {
  expect(durationISO8601.convertYouTubeDuration('^(*&*( qh2we')).toBe(null);
  expect(durationISO8601.convertYouTubeDuration('P8S')).toBe(null);
});

test('part', () => {
  expect(durationISO8601.convertYouTubeDuration('P5Y')).toBe('43800:00:00');
  expect(durationISO8601.convertYouTubeDuration('P11M')).toBe('7920:00:00');
  expect(durationISO8601.convertYouTubeDuration('P238D')).toBe('5712:00:00');
  expect(durationISO8601.convertYouTubeDuration('PT15H')).toBe('15:00:00');
  expect(durationISO8601.convertYouTubeDuration('PT56M')).toBe('56:00');
  expect(durationISO8601.convertYouTubeDuration('PT40S')).toBe('0:40');
});

test('hh syntax', () => {
  expect(durationISO8601.convertYouTubeDuration('PT3H')).toBe('3:00:00');
  expect(durationISO8601.convertYouTubeDuration('PT28M59S')).toBe('28:59');
});

test('mm syntax', () => {
  expect(durationISO8601.convertYouTubeDuration('PT1M')).toBe('1:00');
  expect(durationISO8601.convertYouTubeDuration('PT36S')).toBe('0:36');
});

test('ss syntax', () => {
  expect(durationISO8601.convertYouTubeDuration('PT4S')).toBe('0:04');
  expect(durationISO8601.convertYouTubeDuration('PT22M')).toBe('22:00');
});

test('calculation', () => {
  expect(durationISO8601.convertYouTubeDuration('PT2.237H')).toBe('2:14:13');
  expect(durationISO8601.convertYouTubeDuration('PT135.242M')).toBe('2:15:15');
  expect(durationISO8601.convertYouTubeDuration('PT8000.567S')).toBe('2:13:21');
  expect(durationISO8601.convertYouTubeDuration('PT3.369H150.789M8101.4235S')).toBe('8:07:57');
});