
'use client';

import { cn } from '@/lib/utils';
import { getNoteFromMidi } from '@/lib/music';

interface PianoProps {
  onKeyToggle?: (midi: number) => void;
  selectedMidiNotes?: number[];
  highlightedMidiNotes?: number[];
  rootNote?: string | null;
  startOctave?: number;
  octaveCount?: number;
  isInteractive?: boolean;
}

const whiteKeys = [0, 2, 4, 5, 7, 9, 11];
const blackKeys = [1, 3, 6, 8, 10];

export default function Piano({ 
  selectedMidiNotes = [],
  highlightedMidiNotes = [],
  rootNote,
  onKeyToggle = () => {},
  startOctave = 3,
  octaveCount = 3,
  isInteractive = true,
}: PianoProps) {

  const renderOctave = (octave: number) => {
    const midiOffset = (octave + 1) * 12;
    
    return (
        <div key={octave} className="relative flex h-64" style={{width: '20rem'}}>
        {/* White Keys */}
        {whiteKeys.map((noteIndex) => {
          const midi = midiOffset + noteIndex;
          const noteInfo = getNoteFromMidi(midi);
          const isSelected = selectedMidiNotes.includes(midi);
          const isHighlighted = highlightedMidiNotes.includes(midi);
          const isRoot = (isSelected || isHighlighted) && rootNote === noteInfo.note;

          let keyColor = "bg-card text-card-foreground";
          if (isInteractive) keyColor += " hover:bg-accent/50";
          if (isSelected) {
            keyColor = isRoot ? "bg-primary text-primary-foreground border-primary/50" : "bg-primary text-primary-foreground border-primary/50";
          } else if (isHighlighted) {
            keyColor = isRoot ? "bg-primary text-primary-foreground border-primary/50" : "bg-accent text-accent-foreground border-accent/50";
          }
          
          return (
            <button
              key={midi}
              onClick={() => isInteractive && onKeyToggle(midi)}
              className={cn(
                "relative flex-1 h-full border-r border-b border-l border-foreground/30 rounded-b-md flex items-end justify-center pb-4 group",
                "transition-colors",
                keyColor,
                !isInteractive && 'cursor-default'
              )}
            >
              <span className={cn(
                "font-mono text-lg",
                !(isSelected || isHighlighted) && (isInteractive ? "opacity-0 group-hover:opacity-50 transition-opacity" : "opacity-0")
              )}>
                {noteInfo.note}{noteInfo.octave}
              </span>
            </button>
          );
        })}
        {/* Black Keys */}
        {blackKeys.map((noteIndex) => {
          const midi = midiOffset + noteIndex;
          const noteInfo = getNoteFromMidi(midi);
          const isSelected = selectedMidiNotes.includes(midi);
          const isHighlighted = highlightedMidiNotes.includes(midi);
          const isRoot = (isSelected || isHighlighted) && rootNote === noteInfo.note;
          
          let keyColor = "bg-foreground text-background";
          if(isInteractive) keyColor += " hover:bg-primary/80";

          if (isSelected) {
             keyColor = isRoot ? "bg-primary border-2 border-primary-foreground text-primary-foreground" : "bg-primary border-2 border-primary/50 text-primary-foreground";
          } else if (isHighlighted) {
             keyColor = isRoot ? "bg-primary border-2 border-primary-foreground text-primary-foreground" : "bg-accent border-2 border-accent/50 text-accent-foreground";
          }
          
          let leftPosition = '0%';
          if (noteIndex === 1) leftPosition = '9.5%';
          if (noteIndex === 3) leftPosition = '24.0%';
          if (noteIndex === 6) leftPosition = '52.5%';
          if (noteIndex === 8) leftPosition = '67.0%';
          if (noteIndex === 10) leftPosition = '81.5%';

          return (
            <button
              key={midi}
              onClick={() => isInteractive && onKeyToggle(midi)}
              style={{ left: leftPosition }}
              className={cn(
                "absolute top-0 w-[9%] h-2/3 rounded-b-md z-10 flex items-end justify-center pb-2 group",
                "transition-colors",
                keyColor,
                !isInteractive && 'cursor-default'
              )}
            >
              <span className={cn(
                  "font-mono",
                  !(isSelected || isHighlighted) && (isInteractive ? "opacity-0 group-hover:opacity-50 transition-opacity" : "opacity-0")
                )}>
                  {noteInfo.note}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-lg select-none">
       <div className="relative overflow-x-auto pb-4 custom-scrollbar">
          <div className="flex" style={{minWidth: `${octaveCount * 20}rem`}}>
            {Array.from({ length: octaveCount }, (_, i) => renderOctave(startOctave + i))}
          </div>
       </div>
    </div>
  );
}
