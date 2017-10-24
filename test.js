const durationISO8601 = require('./index');

describe('convertDuration(duration)', () => {
  it('should convert every part', () => {
    expect(durationISO8601.convertDuration('P5Y')).toEqual({
      year: 5,
      month: undefined,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined,
    });
    expect(durationISO8601.convertDuration('P11M')).toEqual({
      year: undefined,
      month: 11,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined,
    });
    expect(durationISO8601.convertDuration('P238D')).toEqual({
      year: undefined,
      month: undefined,
      day: 238,
      hour: undefined,
      minute: undefined,
      second: undefined,
    });
    expect(durationISO8601.convertDuration('PT15H')).toEqual({
      year: undefined,
      month: undefined,
      day: undefined,
      hour: 15,
      minute: undefined,
      second: undefined,
    });
    expect(durationISO8601.convertDuration('PT56M')).toEqual({
      year: undefined,
      month: undefined,
      day: undefined,
      hour: undefined,
      minute: 56,
      second: undefined,
    });
    expect(durationISO8601.convertDuration('PT384S')).toEqual({
      year: undefined,
      month: undefined,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: 384,
    });
    expect(durationISO8601.convertDuration('P18Y29,4M5DT36.66H1M289S')).toEqual({
      year: 18,
      month: 29.4,
      day: 5,
      hour: 36.66,
      minute: 1,
      second: 289,
    });
    expect(durationISO8601.convertDuration('P1Y30DT15M39S')).toEqual({
      year: 1,
      month: undefined,
      day: 30,
      hour: undefined,
      minute: 15,
      second: 39,
    });
  });

  it('should handle HMS missing T', () => {
    expect(durationISO8601.convertDuration('P23H')).toBe(null);
    expect(durationISO8601.convertDuration('P8S')).toBe(null);
    expect(durationISO8601.convertDuration('P3Y5S')).toBe(null);
  });

  it('should handle . , - in number part', () => {
    expect(durationISO8601.convertDuration('P82.9Y')).toEqual({
      year: 82.9,
      month: undefined,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined,
    });
    expect(durationISO8601.convertDuration('P8,99Y')).toEqual({
      year: 8.99,
      month: undefined,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined,
    });
    expect(durationISO8601.convertDuration('P35,46Y')).toEqual({
      year: 35.46,
      month: undefined,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined,
    });
    expect(durationISO8601.convertDuration('PT-50S')).toBe(null);
  });

  it('should handle non number in number part', () => {
    expect(durationISO8601.convertDuration('P8sdwe!@Y')).toBe(null);
    expect(durationISO8601.convertDuration('PT^li98S')).toBe(null);
    expect(durationISO8601.convertDuration('PDTS')).toBe(null);
  });

  it('should handle invalid input', () => {
    expect(durationISO8601.convertDuration('PT12.H')).toBe(null);
    expect(durationISO8601.convertDuration('P2M8M9M')).toBe(null);
    expect(durationISO8601.convertDuration('P3Ynlwkqejq$5D')).toBe(null);
    expect(durationISO8601.convertDuration('P1Mqwe!213DT18M9S')).toBe(null);
    expect(durationISO8601.convertDuration('P87(*&(bfwefh')).toBe(null);
    expect(durationISO8601.convertDuration('P)(*)(HKJGH12*(')).toBe(null);
    expect(durationISO8601.convertDuration('ieurht834')).toBe(null);
    expect(durationISO8601.convertDuration('^(*&*( qh2we')).toBe(null);
    expect(durationISO8601.convertDuration('')).toBe(null);
    expect(durationISO8601.convertDuration(4123)).toBe(null);
    expect(durationISO8601.convertDuration({ year: 1 })).toBe(null);
  });
});

describe('convertToSecond(duration)', () => {
  it('should convert every part', () => {
    expect(durationISO8601.convertToSecond('P5Y')).toBe(157680000);
    expect(durationISO8601.convertToSecond('P11M')).toBe(28512000);
    expect(durationISO8601.convertToSecond('P238D')).toBe(20563200);
    expect(durationISO8601.convertToSecond('PT15H')).toBe(54000);
    expect(durationISO8601.convertToSecond('PT56M')).toBe(3360);
    expect(durationISO8601.convertToSecond('PT40S')).toBe(40);
  });

  it('should calculate', () => {
    expect(durationISO8601.convertToSecond('P1Y2M3DT4H5M6S')).toBe(36993906);
    expect(durationISO8601.convertToSecond('P3MT48M55S')).toBe(7778935);
    expect(durationISO8601.convertToSecond('P5.491DT1.129H2M22.63S')).toBe(478629.43);
  });

  it('should handle invalid input', () => {
    expect(durationISO8601.convertToSecond('ieurht834')).toBe(null);
    expect(durationISO8601.convertToSecond('P87(*&(bfwefh')).toBe(null);
  });
});

describe('convertYouTubeDuration(duration)', () => {
  it('should convert every part', () => {
    expect(durationISO8601.convertYouTubeDuration('P5Y')).toBe('43800:00:00');
    expect(durationISO8601.convertYouTubeDuration('P11M')).toBe('7920:00:00');
    expect(durationISO8601.convertYouTubeDuration('P238D')).toBe('5712:00:00');
    expect(durationISO8601.convertYouTubeDuration('PT15H')).toBe('15:00:00');
    expect(durationISO8601.convertYouTubeDuration('PT56M')).toBe('56:00');
    expect(durationISO8601.convertYouTubeDuration('PT40S')).toBe('0:40');
  });

  it('should convert correct hh syntax', () => {
    expect(durationISO8601.convertYouTubeDuration('PT3H')).toBe('3:00:00');
    expect(durationISO8601.convertYouTubeDuration('PT28M59S')).toBe('28:59');
  });

  it('should convert correct mm syntax', () => {
    expect(durationISO8601.convertYouTubeDuration('PT1M')).toBe('1:00');
    expect(durationISO8601.convertYouTubeDuration('PT36S')).toBe('0:36');
  });

  it('should convert correct ss syntax', () => {
    expect(durationISO8601.convertYouTubeDuration('PT4S')).toBe('0:04');
    expect(durationISO8601.convertYouTubeDuration('PT22M')).toBe('22:00');
  });

  it('should calculate', () => {
    expect(durationISO8601.convertYouTubeDuration('PT2.237H')).toBe('2:14:13');
    expect(durationISO8601.convertYouTubeDuration('PT135.242M')).toBe('2:15:15');
    expect(durationISO8601.convertYouTubeDuration('PT8000.567S')).toBe('2:13:21');
    expect(durationISO8601.convertYouTubeDuration('PT3.369H150.789M8101.4235S')).toBe('8:07:57');
  });

  it('should handle invalid input', () => {
    expect(durationISO8601.convertYouTubeDuration('^(*&*( qh2we')).toBe(null);
    expect(durationISO8601.convertYouTubeDuration('P8S')).toBe(null);
  });
});
