
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { SelectedNote, SavedChord, RecognizedChord, NoteSource, GuitarFingering } from '@/types';
import { recognizeChord, getNoteFromFret, getNoteFromMidi } from '@/lib/music';
import Fretboard from '@/components/cadenza/Fretboard';
import Piano from '@/components/cadenza/Piano';
import ChordDisplay from '@/components/cadenza/ChordDisplay';
import SavedChords from '@/components/cadenza/SavedChords';
import { Button } from '@/components/ui/button';
import { RotateCcw, Guitar, Piano as PianoIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/components/cadenza/LanguageProvider';
import PageLayout from '@/components/cadenza/PageLayout';

export default function ChordNamerPage() {
  const [selectedNotes, setSelectedNotes] = useState<SelectedNote[]>([]);
  const [savedChords, setSavedChords] = useState<SavedChord[]>([]);
  const [instrument, setInstrument] = useState('guitar');
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
    try {
      const storedChords = localStorage.getItem('cadenza_saved_chords');
      if (storedChords) {
        setSavedChords(JSON.parse(storedChords));
      }
      const storedInstrument = localStorage.getItem('cadenza_instrument');
      if (storedInstrument === 'guitar' || storedInstrument === 'piano') {
        setInstrument(storedInstrument);
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('cadenza_saved_chords', JSON.stringify(savedChords));
      } catch (error) {
        console.error("Failed to save chords to localStorage", error);
      }
    }
  }, [savedChords, isClient]);

  useEffect(() => {
    if(isClient) {
        localStorage.setItem('cadenza_instrument', instrument);
    }
  }, [instrument, isClient]);
  
  const getNoteName = (note: SelectedNote): string => {
    if (note.source.type === 'guitar') {
      return getNoteFromFret(note.source.string, note.source.fret).note;
    }
    if (note.source.type === 'piano') {
      return getNoteFromMidi(note.source.midi).note;
    }
    return '';
  }

  const chordData: RecognizedChord | null = useMemo(() => {
    if (!t) return null;
    const tCommon = t('Common');
    const currentNotes = selectedNotes.map(getNoteName);
    const uniqueNotes = [...new Set(currentNotes)];
    const recognized = recognizeChord(uniqueNotes);
    if(recognized) {
        if(recognized.quality === 'Unison') recognized.name = `${recognized.root} ${tCommon.unison}`;
        if(recognized.quality === 'Power Chord') recognized.name = `${recognized.root}5`;
        if(recognized.quality === 'Unknown') recognized.name = tCommon.unknownChord;
    }
    return recognized
  }, [selectedNotes, t]);

  const handleFretToggle = (string: number, fret: number) => {
    setSelectedNotes((prev) => {
        const existingNote = prev.find(n => n.source.type === 'guitar' && n.source.string === string);
        if (existingNote) {
            // If clicking the same fret, remove it
            if (existingNote.source.fret === fret) {
                return prev.filter(n => !(n.source.type === 'guitar' && n.source.string === string));
            }
            // If clicking a different fret on the same string, replace it
            const otherNotes = prev.filter(n => !(n.source.type === 'guitar' && n.source.string === string));
            return [...otherNotes, { id: `g-${string}-${fret}`, source: { type: 'guitar', string, fret } }];
        }
        // Add new note
        return [...prev, { id: `g-${string}-${fret}`, source: { type: 'guitar', string, fret } }];
    });
  };

  const handlePianoKeyToggle = (midi: number) => {
      setSelectedNotes((prev) => {
          const existingNoteIndex = prev.findIndex(n => n.source.type === 'piano' && n.source.midi === midi);
          if (existingNoteIndex > -1) {
              return prev.filter((_, index) => index !== existingNoteIndex);
          }
          return [...prev, { id: `p-${midi}`, source: { type: 'piano', midi } }];
      });
  };

  const handleSaveChord = () => {
    if (!chordData || selectedNotes.length === 0 || !t || chordData.name === t('Common').unknownChord) return;
    const newSavedChord: SavedChord = {
      name: chordData.name,
      fingering: selectedNotes,
      date: new Date().toISOString(),
      instrument,
    };
    setSavedChords((prev) => [newSavedChord, ...prev]);
  };
  
  const handleDeleteChord = (date: string) => {
    setSavedChords((prev) => prev.filter((c) => c.date !== date));
  };

  const handleClearSelection = () => {
    setSelectedNotes([]);
  };

  const handleSelectChord = (fingering: SelectedNote[], instrument: string) => {
    setInstrument(instrument);
    setSelectedNotes(fingering);
  }

  const handleTabChange = (newInstrument: string) => {
    setInstrument(newInstrument);
    setSelectedNotes([]);
  }

  if (!t) return null;
  const tPage = t('ChordNamerPage');

  const guitarNotes = selectedNotes
    .map(n => n.source)
    .filter(s => s.type === 'guitar') as GuitarFingering[];
  
  const pianoNotes = selectedNotes
    .map(n => n.source)
    .filter(s => s.type === 'piano')
    .map(s => (s as Extract<NoteSource, {type: 'piano'}>).midi);


  return (
    <PageLayout title={tPage.title} subtitle={tPage.subtitle}>
      <div className="flex flex-col gap-8">
          <Tabs value={instrument} onValueChange={handleTabChange} className="w-full">
            <div className="flex justify-center mb-4">
              <TabsList>
                <TabsTrigger value="guitar">
                  <Guitar className="mr-2 h-4 w-4" />
                  {tPage.guitar}
                </TabsTrigger>
                <TabsTrigger value="piano">
                  <PianoIcon className="mr-2 h-4 w-4" />
                  {tPage.piano}
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="guitar">
               <Fretboard
                selectedNotes={guitarNotes}
                onFretToggle={handleFretToggle}
                rootNote={chordData?.root}
              />
            </TabsContent>
            <TabsContent value="piano">
              <Piano 
                selectedMidiNotes={pianoNotes}
                onKeyToggle={handlePianoKeyToggle}
                rootNote={chordData?.root}
              />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center mt-[-1rem] mb-4">
              <Button variant="outline" onClick={handleClearSelection} disabled={selectedNotes.length === 0}>
                <RotateCcw className="mr-2 h-4 w-4" />
                {tPage.reset}
              </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <ChordDisplay
                chordData={chordData}
                onSave={handleSaveChord}
                hasSelection={selectedNotes.length > 0}
              />
            </div>
            <div className="flex flex-col gap-6">
              <SavedChords
                savedChords={savedChords}
                onDelete={handleDeleteChord}
                onSelect={handleSelectChord}
              />
            </div>
        </div>
      </div>
    </PageLayout>
  );
}
