
'use client';

import React, { useState } from 'react';
import { CIRCLE_OF_FIFTHS_MAJOR, CIRCLE_OF_FIFTHS_MINOR } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CircleOfFifthsProps {
  selectedKey: string;
  onKeySelect: (key: string) => void;
}

const SIZE = 400;
const CENTER = SIZE / 2;
const MAJOR_RADIUS = SIZE * 0.4;
const MINOR_RADIUS = SIZE * 0.25;

export default function CircleOfFifths({ selectedKey, onKeySelect }: CircleOfFifthsProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const getCoordinates = (index: number, radius: number) => {
    const angle = (index / 12) * 2 * Math.PI - Math.PI / 2;
    const x = CENTER + radius * Math.cos(angle);
    const y = CENTER + radius * Math.sin(angle);
    return { x, y };
  };

  const handleKeyClick = (key: string) => {
    onKeySelect(key);
  };
  
  const isSelected = (key: string) => {
    // For minor keys like "Am", we match with the major key "C"
    if (key.endsWith('m')) {
        const majorEquivalentIndex = CIRCLE_OF_FIFTHS_MINOR.indexOf(key);
        const majorKey = CIRCLE_OF_FIFTHS_MAJOR[majorEquivalentIndex];
        return majorKey === selectedKey;
    }
    return key === selectedKey;
  }
  
  const isHovered = (key: string | null) => {
    if (!hoveredKey) return false;
     if (key && key.endsWith('m')) {
        const majorEquivalentIndex = CIRCLE_OF_FIFTHS_MINOR.indexOf(key);
        const majorKey = CIRCLE_OF_FIFTHS_MAJOR[majorEquivalentIndex];
        return majorKey === hoveredKey;
    }
     if (hoveredKey.endsWith('m')) {
        const majorEquivalentIndex = CIRCLE_OF_FIFTHS_MINOR.indexOf(hoveredKey);
        const majorKey = CIRCLE_OF_FIFTHS_MAJOR[majorEquivalentIndex];
        return majorKey === key;
    }
    return key === hoveredKey;
  }

  const getMajorKeyFromMinor = (minorKey: string) => {
      const index = CIRCLE_OF_FIFTHS_MINOR.indexOf(minorKey);
      if (index !== -1) return CIRCLE_OF_FIFTHS_MAJOR[index];
      return null;
  }

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ maxWidth: `${SIZE}px` }}>
      {/* Background circles */}
      <circle cx={CENTER} cy={CENTER} r={MAJOR_RADIUS * 1.1} fill="hsl(var(--muted) / 0.2)" />
      <circle cx={CENTER} cy={CENTER} r={MINOR_RADIUS * 1.3} fill="hsl(var(--card))" />
      <circle cx={CENTER} cy={CENTER} r={MINOR_RADIUS * 0.9} fill="hsl(var(--background))" />
      
      {/* Lines connecting major and minor */}
       {CIRCLE_OF_FIFTHS_MAJOR.map((key, index) => {
        const majorCoords = getCoordinates(index, MAJOR_RADIUS);
        const minorCoords = getCoordinates(index, MINOR_RADIUS);
        const isLineActive = isSelected(key) || isHovered(key) || isHovered(CIRCLE_OF_FIFTHS_MINOR[index]);
        return (
          <line
            key={`line-${key}`}
            x1={majorCoords.x}
            y1={majorCoords.y}
            x2={minorCoords.x}
            y2={minorCoords.y}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            className="transition-all"
            style={{ opacity: isLineActive ? 1 : 0.2 }}
          />
        );
      })}

      {/* Major Keys */}
      {CIRCLE_OF_FIFTHS_MAJOR.map((key, index) => {
        const { x, y } = getCoordinates(index, MAJOR_RADIUS);
        const isKeySelected = isSelected(key);
        const isKeyHovered = isHovered(key);
        const minorKey = CIRCLE_OF_FIFTHS_MINOR[index];
        const isRelatedMinorHovered = isHovered(minorKey);

        return (
          <g
            key={`major-${key}`}
            onClick={() => handleKeyClick(key)}
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
            className="cursor-pointer group"
          >
            <circle
              cx={x}
              cy={y}
              r={28}
              fill={isKeySelected ? 'hsl(var(--primary))' : 'hsl(var(--card))'}
              stroke={isKeySelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
              strokeWidth={isKeyHovered || isRelatedMinorHovered ? 3 : 2}
              className="transition-all"
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dy=".3em"
              fontSize="18"
              fontWeight="bold"
              fill={isKeySelected ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'}
              className="transition-colors"
            >
              {key}
            </text>
          </g>
        );
      })}

      {/* Minor Keys */}
      {CIRCLE_OF_FIFTHS_MINOR.map((key, index) => {
        const { x, y } = getCoordinates(index, MINOR_RADIUS);
        const majorKey = CIRCLE_OF_FIFTHS_MAJOR[index];
        const isKeySelected = isSelected(majorKey);
        const isKeyHovered = isHovered(key);
        const isRelatedMajorHovered = isHovered(majorKey);

        return (
          <g
            key={`minor-${key}`}
            onClick={() => handleKeyClick(majorKey)}
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
            className="cursor-pointer group"
          >
            <circle
              cx={x}
              cy={y}
              r={20}
              fill={isKeySelected ? 'hsl(var(--secondary))' : 'hsl(var(--muted))'}
              stroke={isKeySelected ? 'hsl(var(--secondary))' : 'hsl(var(--border))'}
              strokeWidth={isKeyHovered || isRelatedMajorHovered ? 2 : 1}
              className="transition-all"
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dy=".3em"
              fontSize="14"
              fill={isKeySelected ? 'hsl(var(--secondary-foreground))' : 'hsl(var(--muted-foreground))'}
              className="transition-colors"
            >
              {key}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
