"use client";

import type { SavedChord, SelectedNote } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Trash2, Music, Guitar, Piano } from "lucide-react";
import { formatFingering } from "@/lib/music";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "./LanguageProvider";

interface SavedChordsProps {
  savedChords: SavedChord[];
  onDelete: (date: string) => void;
  onSelect: (fingering: SelectedNote[], instrument: string) => void;
}

export default function SavedChords({
  savedChords,
  onDelete,
  onSelect,
}: SavedChordsProps) {
  const { t } = useLanguage();

  if (!t) return null;
  const tSaved = t("SavedChords");

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{tSaved.title}</CardTitle>
        <CardDescription>{tSaved.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow custom-scrollbar">
          {savedChords.length > 0 ? (
            <div className="space-y-3 pr-4">
              {savedChords.map((chord) => (
                <div
                  key={chord.date}
                  className="p-3 border rounded-md flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {chord.instrument === "guitar" ? (
                      <Guitar className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <Piano className="h-6 w-6 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-bold text-lg font-mono text-primary">
                        {chord.name}
                      </p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {formatFingering(chord.fingering)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        onSelect(chord.fingering, chord.instrument)
                      }
                    >
                      <Music className="h-4 w-4" />
                      <span className="sr-only">{tSaved.loadChord}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(chord.date)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive/70 hover:text-destructive" />
                      <span className="sr-only">{tSaved.deleteChord}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-10 border-2 border-dashed rounded-lg h-full flex flex-col justify-center items-center">
              <p>{tSaved.placeholder}</p>
              <p className="text-sm">{tSaved.placeholderDescription}</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
