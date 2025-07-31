export type GuitarFingering = {
  type: "guitar";
  string: number; // 0 for high E, 5 for low E
  fret: number; // 0 for open string
};

export type PianoFingering = {
  type: "piano";
  midi: number;
};

export type NoteSource = GuitarFingering | PianoFingering;

export interface SelectedNote {
  id: string; // e.g., 'g-5-3' for guitar string 5 fret 3, 'p-60' for piano MIDI 60
  source: NoteSource;
}

export interface SavedChord {
  name: string;
  fingering: SelectedNote[];
  date: string;
  instrument: string;
}

export interface ChordTone {
  note: string;
  interval: string;
}

export interface RecognizedChord {
  name: string;
  root: string;
  quality: string;
  tones: ChordTone[];
}
