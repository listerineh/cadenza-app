"use client";

import { getNoteFromFret } from "@/lib/music";
import { cn } from "@/lib/utils";
import type { GuitarFingering } from "@/types";
import { X } from "lucide-react";

interface FretboardProps {
  onFretToggle?: (string: number, fret: number) => void;
  onFretBarre?: (fret: number) => void;
  selectedNotes?: GuitarFingering[];
  highlightedNotes?: GuitarFingering[];
  rootNote?: string | null;
  isInteractive?: boolean;
}

const NUM_FRETS = 20;
const INLAY_FRETS = [3, 5, 7, 9, 12, 15, 17, 19];

export default function Fretboard({
  selectedNotes = [],
  highlightedNotes = [],
  rootNote,
  onFretToggle = () => {},
  onFretBarre = () => {},
  isInteractive = true,
}: FretboardProps) {
  const fretNumbers = Array.from({ length: NUM_FRETS + 1 }, (_, i) => i);
  const strings = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="bg-card p-4 rounded-lg shadow-lg select-none">
      <div className="relative overflow-x-auto pb-4 custom-scrollbar">
        <div style={{ minWidth: "800px" }}>
          {/* Fretboard Structure */}
          <div className="flex flex-col-reverse">
            {strings.map((stringIndex) => {
              const selectedFretForString = selectedNotes.find(
                (n) => n.string === stringIndex,
              );

              return (
                <div key={stringIndex} className="flex items-center">
                  {/* Open String Button */}
                  <div className="w-12 h-10 flex items-center justify-center pr-2 shrink-0">
                    <button
                      onClick={() =>
                        isInteractive && onFretToggle(stringIndex, 0)
                      }
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-150 relative",
                        selectedFretForString?.fret === 0
                          ? "bg-primary border-primary/80 text-primary-foreground shadow-lg"
                          : "bg-muted border-border",
                        isInteractive && "hover:bg-accent/50",
                        !isInteractive && "cursor-default",
                      )}
                      aria-label={`Play open string ${stringIndex + 1}`}
                    >
                      {selectedFretForString?.fret !== 0 && (
                        <X className="w-4 h-4 text-muted-foreground" />
                      )}
                      {selectedFretForString?.fret === 0 && (
                        <span className="font-bold text-sm">
                          {getNoteFromFret(stringIndex, 0).note}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* String Line */}
                  <div className="flex-grow h-10 relative flex items-center">
                    <div
                      className={cn(
                        "absolute w-full h-px bg-foreground/30",
                        `z-0 h-[${stringIndex * 0.5 + 1}px]`,
                      )}
                    ></div>

                    {/* Frets and dots */}
                    <div className="absolute w-full h-full flex z-10">
                      <div className="w-2 h-full bg-foreground/40 absolute left-0 top-0"></div>
                      {fretNumbers.slice(1).map((fret) => {
                        const noteInfo = getNoteFromFret(stringIndex, fret);
                        const isSelected = selectedNotes.some(
                          (n) => n.string === stringIndex && n.fret === fret,
                        );
                        const isHighlighted = highlightedNotes.some(
                          (n) => n.string === stringIndex && n.fret === fret,
                        );
                        const isRoot =
                          (isSelected || isHighlighted) &&
                          rootNote === noteInfo.note;

                        let dotColor = isInteractive
                          ? "bg-transparent group-hover:bg-primary/20"
                          : "bg-transparent";

                        if (isSelected) {
                          dotColor = isRoot
                            ? "bg-primary border-2 border-primary-foreground text-primary-foreground"
                            : "bg-primary border-2 border-primary/80";
                        } else if (isHighlighted) {
                          dotColor = isRoot
                            ? "bg-primary border-2 border-primary-foreground text-primary-foreground"
                            : "bg-accent border-2 border-accent/80";
                        }

                        return (
                          <div
                            key={fret}
                            className="flex-1 h-full relative flex items-center justify-center"
                          >
                            <div
                              className={cn(
                                "absolute top-0 right-0 h-full bg-foreground/20",
                                fret === 0 ? "w-2" : "w-0.5",
                              )}
                            ></div>

                            <button
                              onClick={() =>
                                isInteractive && onFretToggle(stringIndex, fret)
                              }
                              className={cn(
                                "w-full h-full flex items-center justify-center",
                                isInteractive && "group",
                                !isInteractive && "cursor-default",
                              )}
                              aria-label={`Fret ${fret} on string ${stringIndex + 1}`}
                            >
                              <div
                                className={cn(
                                  "w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-20 transition-colors",
                                  dotColor,
                                  (isSelected || (isHighlighted && !isRoot)) &&
                                    "text-primary-foreground",
                                  isRoot && "text-primary-foreground",
                                )}
                              >
                                {(isSelected || isHighlighted) && noteInfo.note}
                              </div>
                            </button>

                            {/* Inlays */}
                            {INLAY_FRETS.includes(fret) && (
                              <div
                                className={cn(
                                  "absolute flex justify-center w-full z-0",
                                  stringIndex === 2
                                    ? "items-center"
                                    : stringIndex > 2
                                      ? "items-end"
                                      : "items-start",
                                )}
                              >
                                <div
                                  className={cn(
                                    "rounded-full bg-muted/40",
                                    fret === 12 && stringIndex === 2
                                      ? "w-4 h-4"
                                      : "w-3 h-3",
                                    fret === 12 &&
                                      (stringIndex === 0 || stringIndex === 4)
                                      ? "w-3 h-3"
                                      : "",
                                    INLAY_FRETS.includes(fret) &&
                                      fret !== 12 &&
                                      stringIndex === 2
                                      ? "w-3 h-3"
                                      : "",
                                  )}
                                ></div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fret Numbers */}
          <div className="flex pl-12 mt-1">
            {fretNumbers.slice(1).map(fret => {
              const isBarred = isInteractive && selectedNotes.filter(n => n.fret === fret).length === 6;
              return (
                <button 
                  key={fret} 
                  onClick={() => isInteractive && onFretBarre(fret)}
                  className={cn(
                    "flex-1 text-center text-xs text-muted-foreground rounded-md py-1 transition-colors",
                    isInteractive && "hover:bg-accent",
                    isBarred && "bg-primary text-primary-foreground font-bold"
                  )}
                >
                  {fret}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
