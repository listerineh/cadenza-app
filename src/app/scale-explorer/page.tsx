"use client";

import { useState, useMemo, useEffect } from "react";
import type { SelectedNote, NoteSource, GuitarFingering } from "@/types";
import {
  getNotesForScale,
  getNoteFromFret,
  getNoteFromMidi,
} from "@/lib/music";
import { NOTES, SCALES } from "@/lib/constants";
import Fretboard from "@/components/cadenza/Fretboard";
import Piano from "@/components/cadenza/Piano";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Guitar, Piano as PianoIcon } from "lucide-react";
import { useLanguage } from "@/components/cadenza/LanguageProvider";
import { Label } from "@/components/ui/label";
import PageLayout from "@/components/cadenza/PageLayout";

export default function ScaleExplorerPage() {
  const [rootNote, setRootNote] = useState("C");
  const [scaleKey, setScaleKey] = useState("major");
  const [instrument, setInstrument] = useState("guitar");
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const scaleNotes = useMemo(() => {
    return getNotesForScale(rootNote, scaleKey);
  }, [rootNote, scaleKey]);

  const getNoteName = (note: SelectedNote): string => {
    if (note.source.type === "guitar") {
      return getNoteFromFret(note.source.string, note.source.fret).note;
    }
    if (note.source.type === "piano") {
      return getNoteFromMidi(note.source.midi).note;
    }
    return "";
  };

  const selectedNotes: SelectedNote[] = useMemo(() => {
    const notes: SelectedNote[] = [];
    if (instrument === "guitar") {
      for (let string = 0; string < 6; string++) {
        for (let fret = 0; fret <= 20; fret++) {
          const noteInfo = getNoteFromFret(string, fret);
          if (scaleNotes.includes(noteInfo.note)) {
            notes.push({
              id: `g-${string}-${fret}`,
              source: { type: "guitar", string, fret },
            });
          }
        }
      }
    } else {
      // piano
      for (let midi = 21; midi <= 108; midi++) {
        const noteInfo = getNoteFromMidi(midi);
        if (scaleNotes.includes(noteInfo.note)) {
          notes.push({ id: `p-${midi}`, source: { type: "piano", midi } });
        }
      }
    }
    return notes;
  }, [scaleNotes, instrument]);

  const handleTabChange = (newInstrument: string) => {
    setInstrument(newInstrument);
  };

  if (!isClient || !t) return null;
  const tPage = t("ScaleExplorerPage");
  const tScales = t("Scales");

  const guitarNotes = selectedNotes
    .map((n) => n.source)
    .filter((s) => s.type === "guitar") as GuitarFingering[];

  const pianoNotes = selectedNotes
    .map((n) => n.source)
    .filter((s) => s.type === "piano")
    .map((s) => (s as Extract<NoteSource, { type: "piano" }>).midi);

  return (
    <PageLayout title={tPage.title} subtitle={tPage.subtitle}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center p-4 rounded-lg bg-card border">
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Label htmlFor="root-note-select">{tPage.rootNote}</Label>
            <Select value={rootNote} onValueChange={setRootNote}>
              <SelectTrigger
                id="root-note-select"
                className="w-full md:w-[180px]"
              >
                <SelectValue placeholder={tPage.selectRoot} />
              </SelectTrigger>
              <SelectContent>
                {NOTES.map((note) => (
                  <SelectItem key={note} value={note}>
                    {note}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Label htmlFor="scale-select">{tPage.scale}</Label>
            <Select value={scaleKey} onValueChange={setScaleKey}>
              <SelectTrigger id="scale-select" className="w-full md:w-[220px]">
                <SelectValue placeholder={tPage.selectScale} />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(SCALES).map((key) => (
                  <SelectItem key={key} value={key}>
                    {tScales[key as keyof typeof tScales]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Tabs
          value={instrument}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex justify-center mb-4">
            <TabsList>
              <TabsTrigger value="guitar">
                <Guitar className="mr-2 h-4 w-4" />
                {t("ChordNamerPage").guitar}
              </TabsTrigger>
              <TabsTrigger value="piano">
                <PianoIcon className="mr-2 h-4 w-4" />
                {t("ChordNamerPage").piano}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="guitar">
            <Fretboard
              highlightedNotes={guitarNotes}
              rootNote={rootNote}
              isInteractive={false}
            />
          </TabsContent>
          <TabsContent value="piano">
            <Piano
              highlightedMidiNotes={pianoNotes}
              rootNote={rootNote}
              isInteractive={false}
              startOctave={2}
              octaveCount={5}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
