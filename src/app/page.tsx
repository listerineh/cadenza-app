'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Scale, CircleDot, Search } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/cadenza/LanguageProvider';

export default function Home() {
  const { t } = useLanguage();

  if (!t) return null;

  const tHomePage = t('HomePage');
  const tChordNamer = t('ChordNamer');
  const tScaleExplorer = t('ScaleExplorer');
  const tCircleOfFifths = t('CircleOfFifths');
  const tScaleFinder = t('ScaleFinder');

  const tools = [
    {
      title: tChordNamer.title,
      description: tChordNamer.description,
      href: 'chord-namer',
      icon: <Music className="h-10 w-10 text-primary" />,
    },
    {
      title: tScaleExplorer.title,
      description: tScaleExplorer.description,
      href: 'scale-explorer',
      icon: <Scale className="h-10 w-10 text-primary" />,
    },
    {
      title: tCircleOfFifths.title,
      description: tCircleOfFifths.description,
      href: 'circle-of-fifths',
      icon: <CircleDot className="h-10 w-10 text-primary" />,
    },
    {
      title: tScaleFinder.title,
      description: tScaleFinder.description,
      href: 'scale-finder',
      icon: <Search className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tighter mb-4">{tHomePage.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{tHomePage.subtitle}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {tools.map((tool) => (
          <Card key={tool.title} className={`flex flex-col hover:border-primary/50 transition-colors`}>
            <CardHeader className="flex-row items-center gap-4">
              {tool.icon}
              <div>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Link href={tool.href} className="w-full">
                <Button className="w-full">{tHomePage.launchTool}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-center mt-12 text-muted-foreground">{tHomePage.moreToolsComingSoon}</p>
    </div>
  );
}
