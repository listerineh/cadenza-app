export const NAV_LINKS = [
  { href: '/chord-namer', label: 'Chord Namer', i18nKey: 'chordNamer', badge: 'new' as const },
  { href: '/scale-finder', label: 'Scale Finder', i18nKey: 'scaleFinder', badge: 'experimental' as const },
  { href: '/scale-explorer', label: 'Scale Explorer', i18nKey: 'scaleExplorer' },
  { href: '/circle-of-fifths', label: 'Circle of Fifths', i18nKey: 'circleOfFifths' },
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
  ['13', [[0, 4, 7, 10, 14, 17, 21]]],  // Dominant 13th: 1, 3, 5, b7, 9, 11, 13
  ['maj13', [[0, 4, 7, 11, 14, 17, 21]]],  // Major 13th: 1, 3, 5, 7, 9, 11, 13
  ['m13', [[0, 3, 7, 10, 14, 17, 21]]],  // Minor 13th: 1, b3, 5, b7, 9, 11, 13
  ['13(b9)', [[0, 4, 7, 10, 13, 17, 21]]],  // Dominant 13 flat 9
  ['13(#9)', [[0, 4, 7, 10, 15, 17, 21]]],  // Dominant 13 sharp 9
  ['11', [[0, 4, 7, 10, 14, 17]]],  // Dominant 11th: 1, 3, 5, b7, 9, 11
  ['maj11', [[0, 4, 7, 11, 14, 17]]],  // Major 11th: 1, 3, 5, 7, 9, 11
  ['m11', [[0, 3, 7, 10, 14, 17]]],  // Minor 11th: 1, b3, 5, b7, 9, 11
  ['9', [[0, 4, 7, 10, 14]]],  // Dominant 9th: 1, 3, 5, b7, 9
  ['maj9', [[0, 4, 7, 11, 14]]],  // Major 9th: 1, 3, 5, 7, 9
  ['m9', [[0, 3, 7, 10, 14]]],  // Minor 9th: 1, b3, 5, b7, 9
  ['9(b5)', [[0, 4, 6, 10, 14]]],  // Dominant 9 flat 5
  ['9(#5)', [[0, 4, 8, 10, 14]]],  // Dominant 9 sharp 5
  ['9(b9)', [[0, 4, 7, 10, 13]]],  // Dominant 9 flat 9
  ['9(#9)', [[0, 4, 7, 10, 15]]],  // Dominant 9 sharp 9
  ['m9(b5)', [[0, 3, 6, 10, 14]]],  // Half-diminished 9 (minor 9 flat 5)
  ['maj9(b5)', [[0, 4, 6, 11, 14]]],  // Major 9 flat 5
  // 6/9 chords
  ['6/9', [[0, 4, 7, 9, 14]]],
  ['m6/9', [[0, 3, 7, 9, 14]]],
  // 7th chords with alterations
  ['7(b5)', [[0, 4, 6, 10]]],  // Dominant 7 flat 5
  ['7(#5)', [[0, 4, 8, 10]]],  // Dominant 7 sharp 5 (augmented 7th)
  ['7(b9)', [[0, 4, 7, 10, 13]]],
  ['7(#9)', [[0, 4, 7, 10, 15]]],
  ['7(#11)', [[0, 4, 7, 10, 18]]],  // Dominant 7 sharp 11
  ['7(b13)', [[0, 4, 7, 10, 20]]],  // Dominant 7 flat 13
  ['maj7(b5)', [[0, 4, 6, 11]]],
  ['maj7(#5)', [[0, 4, 8, 11]]],
  ['m7(b5)', [[0, 3, 6, 10]]],  // Half-diminished
  ['m7(b9)', [[0, 3, 7, 10, 13]]],
  // Basic 7th chords
  ['maj7', [[0, 4, 7, 11]]],
  ['7', [[0, 4, 7, 10]]],  // Dominant 7th
  ['m7', [[0, 3, 7, 10]]],
  ['mMaj7', [[0, 3, 7, 11]]],  // Minor major 7th
  ['dim7', [[0, 3, 6, 9]]],  // Diminished 7th
  ['ø7', [[0, 3, 6, 10]]],  // Half-diminished 7th (alternative notation)
  ['m7b5', [[0, 3, 6, 10]]],  // Half-diminished 7th (common notation)
  // 6th chords
  ['6', [[0, 4, 7, 9]]],
  ['m6', [[0, 3, 7, 9]]],
  // Suspended chords with 7th
  ['7sus4', [[0, 5, 7, 10]]],
  ['7sus2', [[0, 2, 7, 10]]],
  ['maj7sus4', [[0, 5, 7, 11]]],
  // Add chords
  ['add9', [[0, 4, 7, 14]]],  // 9 semitones = 2nd = add9
  ['madd9', [[0, 3, 7, 14]]],
  ['add11', [[0, 4, 7, 17]]],  // 11 semitones = 4th = add11
  ['madd11', [[0, 3, 7, 17]]],
  ['add13', [[0, 4, 7, 21]]],  // 21 semitones = 6th = add13
  // Basic suspended chords
  ['sus4', [[0, 5, 7]]],
  ['sus2', [[0, 2, 7]]],
  ['sus', [[0, 5, 7]]],  // Default sus = sus4
  // Triads
  ['aug', [[0, 4, 8]]],  // Augmented
  ['+', [[0, 4, 8]]],  // Augmented (alternative)
  ['dim', [[0, 3, 6]]],  // Diminished
  ['°', [[0, 3, 6]]],  // Diminished (alternative)
  ['m', [[0, 3, 7]]],  // Minor
  ['', [[0, 4, 7]]],  // Major (empty string for just root name like "C")
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
