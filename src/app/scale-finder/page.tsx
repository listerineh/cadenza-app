'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/components/cadenza/LanguageProvider';
import PageLayout from '@/components/cadenza/PageLayout';
import { findScalesForChords, getDiatonicChords } from '@/lib/music';
import { NOTES, CHORD_INTERVALS, SCALES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { ScaleResult } from '@/types';

const chordQualities = CHORD_INTERVALS.map(([quality]) => quality).reverse();
const romanNumerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

interface SelectedChord {
  root: string;
  quality: string;
}

function DiatonicChordDisplay({ scale, selectedChords }: { scale: ScaleResult; selectedChords: string[] }) {
  const { t } = useLanguage();
  if (!t) return null;
  const tPage = t('ScaleFinderPage');

  const scaleKey = Object.keys(SCALES).find((key) => SCALES[key as keyof typeof SCALES].name === scale.scale) as
    | keyof typeof SCALES
    | undefined;

  if (!scaleKey) return <p className="text-destructive">Error: Unknown scale type '{scale.scale}'</p>;

  const diatonicChords = getDiatonicChords(scale.root, scaleKey);

  const getSimpleChordName = (root: string, quality: string) => {
    if (quality === 'Major') return root;
    if (quality === 'Minor') return root + 'm';
    if (quality === 'Diminished') return root + '°';
    return `${root} ${quality}`;
  };

  return (
    <div className="flex flex-col gap-3 pt-2">
      <h4 className="font-semibold text-center text-muted-foreground">{tPage.diatonicChords}</h4>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
        {diatonicChords.map((chord, index) => {
          const simpleName = getSimpleChordName(chord.root, chord.quality);
          const isSelected = selectedChords.some((selected) => {
            // This logic handles matching chord names like C Major with just C
            const [root, ...qualityParts] = selected.split(' ');
            const quality = qualityParts.join(' ');
            if (quality === 'Major') return simpleName === root;
            if (quality === 'Minor') return simpleName === root + 'm';
            if (quality === 'Diminished') return simpleName === root + '°';
            return selected === `${chord.root} ${chord.quality}`;
          });

          return (
            <div
              key={chord.name}
              className={cn(
                'p-2 rounded-md border-2 flex flex-col items-center justify-center aspect-square transition-all',
                isSelected ? 'border-primary shadow-lg' : 'border-border',
                chord.quality === 'Major' && 'bg-primary/10',
                chord.quality === 'Minor' && 'bg-secondary',
                chord.quality === 'Diminished' && 'bg-destructive/10',
              )}
            >
              <p className="font-mono text-sm text-muted-foreground">{romanNumerals[index]}</p>
              <p className="font-bold font-mono text-lg">{chord.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ScaleFinderPage() {
  const [selectedChords, setSelectedChords] = useState<SelectedChord[]>([
    { root: '', quality: '' },
    { root: '', quality: '' },
  ]);
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validChords = useMemo(() => {
    return selectedChords.filter((c) => c.root && c.quality).map((c) => `${c.root} ${c.quality}`);
  }, [selectedChords]);

  const matchingScales = useMemo(() => {
    if (validChords.length < 2) return [];
    return findScalesForChords(validChords);
  }, [validChords]);

  const handleChordChange = (index: number, part: 'root' | 'quality', value: string) => {
    const newChords = [...selectedChords];
    newChords[index] = { ...newChords[index], [part]: value };
    setSelectedChords(newChords);
  };

  const addChordInput = () => {
    setSelectedChords([...selectedChords, { root: '', quality: '' }]);
  };

  const removeChordInput = (index: number) => {
    if (selectedChords.length <= 2) return;
    const newChords = [...selectedChords];
    newChords.splice(index, 1);
    setSelectedChords(newChords);
  };

  if (!isClient || !t) return null;
  const tPage = t('ScaleFinderPage');

  return (
    <PageLayout title={tPage.title} subtitle={tPage.subtitle}>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{tPage.inputSectionTitle}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {selectedChords.map((chord, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Select value={chord.root} onValueChange={(value) => handleChordChange(index, 'root', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Root" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {NOTES.map((note) => (
                        <SelectItem key={note} value={note}>
                          {note}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={chord.quality} onValueChange={(value) => handleChordChange(index, 'quality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Quality" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {chordQualities.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedChords.length > 2 && (
                    <Button variant="ghost" size="icon" onClick={() => removeChordInput(index)}>
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={addChordInput}>
                <Plus className="mr-2 h-4 w-4" />
                {tPage.addChord}
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{tPage.resultsSectionTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              {validChords.length > 1 ? (
                matchingScales.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {matchingScales.map((scale) => (
                      <AccordionItem key={scale.name} value={scale.name}>
                        <AccordionTrigger className="font-semibold text-md">{scale.name}</AccordionTrigger>
                        <AccordionContent>
                          <DiatonicChordDisplay scale={scale} selectedChords={validChords} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground">{tPage.noResults}</p>
                )
              ) : (
                <p className="text-muted-foreground">{tPage.resultsPlaceholder}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
