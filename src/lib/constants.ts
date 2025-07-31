export const NAV_LINKS = [
    { href: "/chord-namer", label: "Chord Namer", i18nKey: "chordNamer", badge: 'new' as const },
    { href: "/scale-finder", label: "Scale Finder", i18nKey: "scaleFinder", badge: 'experimental' as const },
    { href: "/scale-explorer", label: "Scale Explorer", i18nKey: "scaleExplorer" },
    { href: "/circle-of-fifths", label: "Circle of Fifths", i18nKey: "circleOfFifths" },
];

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const STANDARD_TUNING = [4, 9, 2, 7, 11, 4]; // E, A, D, G, B, E from low to high (indices in NOTES)

export const CIRCLE_OF_FIFTHS_MAJOR = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
export const CIRCLE_OF_FIFTHS_MINOR = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm'];

export const KEY_SIGNATURES: Record<string, { type: 'sharp' | 'flat'; count: number }> = {
  C: { type: 'sharp', count: 0 },
  G: { type: 'sharp', count: 1 },
  D: { type: 'sharp', count: 2 },
  A: { type: 'sharp', count: 3 },
  E: { type: 'sharp', count: 4 },
  B: { type: 'sharp', count: 5 },
  'F#': { type: 'sharp', count: 6 },
  'C#': { type: 'sharp', count: 7 },
  Cb: { type: 'flat', count: 7 },
  Gb: { type: 'flat', count: 6 },
  Db: { type: 'flat', count: 5 },
  Ab: { type: 'flat', count: 4 },
  Eb: { type: 'flat', count: 3 },
  Bb: { type: 'flat', count: 2 },
  F: { type: 'flat', count: 1 },
};

export const NOTE_MAP: Record<string, number> = {
  C: 0,
  'B#': 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  F: 5,
  'E#': 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};

export const INTERVAL_NAMES: Record<number, string> = {
  0: 'Root',
  1: 'Minor 2nd',
  2: 'Major 2nd',
  3: 'Minor 3rd',
  4: 'Major 3rd',
  5: 'Perfect 4th',
  6: 'Tritone',
  7: 'Perfect 5th',
  8: 'Minor 6th',
  9: 'Major 6th',
  10: 'Minor 7th',
  11: 'Major 7th',
};

export const SCALES: Record<string, { name: string; intervals: number[] }> = {
  major: { name: 'Major', intervals: [0, 2, 4, 5, 7, 9, 11] },
  minor: { name: 'Natural Minor', intervals: [0, 2, 3, 5, 7, 8, 10] },
  harmonicMinor: { name: 'Harmonic Minor', intervals: [0, 2, 3, 5, 7, 8, 11] },
  melodicMinor: { name: 'Melodic Minor', intervals: [0, 2, 3, 5, 7, 9, 11] },
  majorPentatonic: { name: 'Major Pentatonic', intervals: [0, 2, 4, 7, 9] },
  minorPentatonic: { name: 'Minor Pentatonic', intervals: [0, 3, 5, 7, 10] },
  blues: { name: 'Blues', intervals: [0, 3, 5, 6, 7, 10] },
  dorian: { name: 'Dorian', intervals: [0, 2, 3, 5, 7, 9, 10] },
  phrygian: { name: 'Phrygian', intervals: [0, 1, 3, 5, 7, 8, 10] },
  lydian: { name: 'Lydian', intervals: [0, 2, 4, 6, 7, 9, 11] },
  mixolydian: { name: 'Mixolydian', intervals: [0, 2, 4, 5, 7, 9, 10] },
  locrian: { name: 'Locrian', intervals: [0, 1, 3, 5, 6, 8, 10] },
};

export const CHORD_INTERVALS: [string, number[][]][] = [
  [
    '6/9',
    [
      [0, 4, 7, 9, 2],
      [0, 4, 9, 2],
    ],
  ],
  ['Dominant 7th (b9)', [[0, 4, 7, 10, 1]]],
  ['Dominant 7th (#9)', [[0, 4, 7, 10, 3]]],
  [
    'Minor Major 9th',
    [
      [0, 3, 7, 11, 2],
      [0, 3, 11, 2],
    ],
  ],
  [
    'Minor 9th',
    [
      [0, 3, 7, 10, 2],
      [0, 3, 10, 2],
    ],
  ],
  [
    'Major 9th',
    [
      [0, 4, 7, 11, 2],
      [0, 4, 11, 2],
    ],
  ],
  [
    'Dominant 9th',
    [
      [0, 4, 7, 10, 2],
      [0, 4, 10, 2],
    ],
  ],
  ['Augmented Major 7th', [[0, 4, 8, 11]]],
  ['Augmented 7th', [[0, 4, 8, 10]]],
  ['Half-Diminished 7th', [[0, 3, 6, 10]]],
  ['Diminished 7th', [[0, 3, 6, 9]]],
  ['Minor Major 7th', [[0, 3, 7, 11]]],
  ['Minor 7th', [[0, 3, 7, 10]]],
  ['Major 7th', [[0, 4, 7, 11]]],
  ['Dominant 7th', [[0, 4, 7, 10]]],
  ['Minor 6th', [[0, 3, 7, 9]]],
  ['Major 6th', [[0, 4, 7, 9]]],
  ['Minor 7th (b5)', [[0, 3, 6, 10]]],
  ['Major 7th (#5)', [[0, 4, 8, 11]]],
  ['Dominant 7th (#5)', [[0, 4, 8, 10]]],
  ['Major 7th (b5)', [[0, 4, 6, 11]]],
  ['Dominant 7th (b5)', [[0, 4, 6, 10]]],
  ['Minor Add9', [[0, 3, 7, 2]]],
  ['Add9', [[0, 4, 7, 2]]],
  ['Sus4', [[0, 5, 7]]],
  ['Sus2', [[0, 2, 7]]],
  ['Augmented', [[0, 4, 8]]],
  ['Diminished', [[0, 3, 6]]],
  ['Minor', [[0, 3, 7]]],
  ['Major', [[0, 4, 7]]],
];

export const CHORD_LOOKUP: Map<string, string> = new Map();
for (const [chordName, allIntervalSets] of CHORD_INTERVALS) {
  for (const intervalSet of allIntervalSets) {
    const key = [...intervalSet].sort((a, b) => a - b).join(',');
    if (!CHORD_LOOKUP.has(key)) {
      CHORD_LOOKUP.set(key, chordName);
    }
  }
}
