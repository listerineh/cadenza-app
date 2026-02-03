'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { RecognizedChord, GuitarFingering } from '@/types';
import { Save, Volume2 } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { playGuitarChord, playMidiNote } from '@/lib/audio';

interface ChordDisplayProps {
  chordData: RecognizedChord | null;
  onSave: () => void;
  hasSelection: boolean;
  guitarNotes?: GuitarFingering[];
  pianoNotes?: number[];
}

export default function ChordDisplay({ 
  chordData, 
  onSave, 
  hasSelection, 
  guitarNotes = [],
  pianoNotes = [] 
}: ChordDisplayProps) {
  const { t } = useLanguage();

  if (!t) return null;
  const tInspector = t('ChordInspector');
  const tCommon = t('Common');

  const isLoading = hasSelection && !chordData;
  const isUnknown = chordData?.name === tCommon.unknownChord;

  const handlePlayChord = () => {
    if (guitarNotes.length > 0) {
      const guitarStrings = guitarNotes.map((n) => ({ string: n.string, fret: n.fret }));
      playGuitarChord(guitarStrings, 'down');
    } else if (pianoNotes.length > 0) {
      pianoNotes.forEach((midi, index) => {
        setTimeout(() => {
          playMidiNote(midi, 1.0);
        }, index * 50);
      });
    }
  };

  const canPlay = guitarNotes.length > 0 || pianoNotes.length > 0;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{tInspector.title}</CardTitle>
        <CardDescription>{tInspector.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-grow flex flex-col">
        <div className="text-center bg-muted/30 p-6 rounded-lg flex flex-col justify-center border min-h-[140px]">
          {hasSelection ? (
            <>
              <h2 className={cn('text-5xl font-bold font-mono text-primary', isLoading && 'animate-pulse')}>
                {chordData?.name || '...'}
              </h2>
              {chordData && !isUnknown && <p className="text-muted-foreground mt-2 font-mono">{chordData.quality}</p>}
            </>
          ) : (
            <p className="text-muted-foreground">{tInspector.placeholder}</p>
          )}
        </div>

        <div className="space-y-3 flex-grow">
          <h3 className="font-semibold">{tInspector.chordTones}</h3>
          {hasSelection && chordData ? (
            <div className="space-y-2">
              {chordData.tones.map(({ note, interval }) => (
                <div
                  key={note}
                  className="flex justify-between items-center text-sm bg-background p-2 rounded-md border"
                >
                  <span className="font-mono font-bold text-primary w-8">{note}</span>
                  <span className="text-muted-foreground">{interval}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{tInspector.tonesPlaceholder}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <Button variant="outline" onClick={handlePlayChord} disabled={!hasSelection || !canPlay}>
            <Volume2 className="mr-2 h-4 w-4" /> Play Chord
          </Button>
          <Button onClick={onSave} disabled={!chordData || !hasSelection || isUnknown}>
            <Save className="mr-2 h-4 w-4" /> {tInspector.saveChord}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
