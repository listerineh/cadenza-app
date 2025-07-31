import type { SelectedNote, RecognizedChord } from "@/types";
import {
  NOTES,
  STANDARD_TUNING,
  KEY_SIGNATURES,
  NOTE_MAP,
  INTERVAL_NAMES,
  SCALES,
  CHORD_LOOKUP,
} from "./constants";

const getNoteIndex = (note: string) => {
  return NOTE_MAP[note] !== undefined ? NOTE_MAP[note] : NOTES.indexOf(note);
};

export const getNoteFromFret = (string: number, fret: number) => {
  const openNoteIndex = STANDARD_TUNING[string];
  const noteIndex = (openNoteIndex + fret) % 12;
  const octave =
    Math.floor((openNoteIndex + fret) / 12) +
    (string < 2 ? 4 : string < 4 ? 3 : 2);
  return { note: NOTES[noteIndex], octave };
};

export const getNoteFromMidi = (midi: number) => {
  const noteIndex = midi % 12;
  const octave = Math.floor(midi / 12) - 1;
  return { note: NOTES[noteIndex], octave };
};

export const getNotesForScale = (
  rootNote: string,
  scaleKey: string,
): string[] => {
  const rootIndex = getNoteIndex(rootNote);
  if (rootIndex === -1) return [];

  const scaleIntervals = SCALES[scaleKey];
  if (!scaleIntervals) return [];

  return scaleIntervals.map((interval) => NOTES[(rootIndex + interval) % 12]);
};

export const getKeySignature = (key: string) => {
  return KEY_SIGNATURES[key] || { type: "sharp", count: 0 };
};

export const getDiatonicChords = (key: string) => {
  const scale = getNotesForScale(key, "major");
  const qualities = [
    "Major",
    "Minor",
    "Minor",
    "Major",
    "Major",
    "Minor",
    "Diminished",
  ];
  return scale.map((note, i) => {
    let quality = qualities[i];
    let name = `${note}`;
    if (quality === "Minor") name += "m";
    if (quality === "Diminished") name += "°";
    return { degree: i + 1, name, quality, root: note };
  });
};

export const recognizeChord = (notes: string[]): RecognizedChord | null => {
  if (notes.length < 2) return null;

  const uniqueNotes = [...new Set(notes)];
  if (uniqueNotes.length < 2) {
    if (uniqueNotes.length === 1) {
      return {
        name: `${uniqueNotes[0]} Unison`,
        root: uniqueNotes[0],
        quality: "Unison",
        tones: [{ note: uniqueNotes[0], interval: "Root" }],
      };
    }
    return null;
  }

  if (uniqueNotes.length === 2) {
    for (const rootNote of uniqueNotes) {
      const rootIndex = getNoteIndex(rootNote);
      const intervals = uniqueNotes
        .map((note) => (getNoteIndex(note) - rootIndex + 12) % 12)
        .sort((a, b) => a - b);
      if (intervals.join(",") === "0,7") {
        const tones = uniqueNotes.map((note) => {
          const intervalValue = (getNoteIndex(note) - rootIndex + 12) % 12;
          return {
            note,
            interval: intervalValue === 0 ? "Root" : "Perfect 5th",
          };
        });
        return {
          name: `${rootNote}5`,
          root: rootNote,
          quality: "Power Chord",
          tones,
        };
      }
    }
  }

  for (const rootNote of uniqueNotes) {
    const rootIndex = getNoteIndex(rootNote);
    if (rootIndex === -1) continue;
    const intervals = uniqueNotes
      .map((note) => (getNoteIndex(note) - rootIndex + 12) % 12)
      .sort((a, b) => a - b);

    const intervalKey = intervals.join(",");

    const quality = CHORD_LOOKUP.get(intervalKey);
    if (quality) {
      const tones = uniqueNotes
        .map((note) => {
          const intervalValue = (getNoteIndex(note) - rootIndex + 12) % 12;
          return { note, interval: INTERVAL_NAMES[intervalValue] || "Unknown" };
        })
        .sort(
          (a, b) =>
            ((getNoteIndex(a.note) - rootIndex + 12) % 12) -
            ((getNoteIndex(b.note) - rootIndex + 12) % 12),
        );

      return { name: `${rootNote} ${quality}`, root: rootNote, quality, tones };
    }
  }

  return {
    name: "Unknown Chord",
    root: "?",
    quality: "Unknown",
    tones: uniqueNotes.map((note) => ({ note, interval: "?" })),
  };
};

export const formatFingering = (fingering: SelectedNote[]): string => {
  const notes = fingering.map((selectedNote) => {
    if (selectedNote.source.type === "guitar") {
      return getNoteFromFret(
        selectedNote.source.string,
        selectedNote.source.fret,
      ).note;
    }
    if (selectedNote.source.type === "piano") {
      return getNoteFromMidi(selectedNote.source.midi).note;
    }
    return "";
  });
  return [...new Set(notes)].join(" - ");
};
