"use client";

import { useLanguage } from "@/components/cadenza/LanguageProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getKeySignature, getDiatonicChords } from "@/lib/music";
import {
  CIRCLE_OF_FIFTHS_MAJOR,
  CIRCLE_OF_FIFTHS_MINOR,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

interface KeyInfoProps {
  selectedKey: string;
}

const romanNumerals = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];

export default function KeyInfo({ selectedKey }: KeyInfoProps) {
  const { t } = useLanguage();

  if (!t) return null;
  const tKeyInfo = t("KeyInfo");

  const keySignature = getKeySignature(selectedKey);
  const diatonicChords = getDiatonicChords(selectedKey);
  const majorKeyIndex = CIRCLE_OF_FIFTHS_MAJOR.indexOf(selectedKey);
  const relativeMinor = CIRCLE_OF_FIFTHS_MINOR[majorKeyIndex];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {tKeyInfo.title}
        </CardTitle>
        <CardDescription>
          {tKeyInfo.keyOf} {selectedKey} {tKeyInfo.major}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-muted/30 p-3 rounded-lg border">
            <p className="text-sm text-muted-foreground">
              {tKeyInfo.relativeKey}
            </p>
            <p className="font-bold text-lg">{relativeMinor}</p>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg border">
            <p className="text-sm text-muted-foreground">
              {tKeyInfo.keySignature}
            </p>
            <p className="font-bold text-lg">
              {keySignature.count > 0
                ? `${keySignature.count} ${keySignature.type === "sharp" ? tKeyInfo.sharps : tKeyInfo.flats}`
                : tKeyInfo.none}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-center">
            {tKeyInfo.primaryChords}
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
            {diatonicChords.map((chord, index) => (
              <div
                key={chord.name}
                className={cn(
                  "p-2 rounded-md border flex flex-col items-center justify-center aspect-square",
                  chord.quality === "Major" &&
                    "bg-primary/10 border-primary/40",
                  chord.quality === "Minor" && "bg-secondary border-border",
                  chord.quality === "Diminished" &&
                    "bg-destructive/10 border-destructive/40",
                )}
              >
                <p className="font-mono text-sm text-muted-foreground">
                  {romanNumerals[index]}
                </p>
                <p className="font-bold font-mono text-lg">{chord.name}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
