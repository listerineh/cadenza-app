
'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { Github } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function AppFooter() {
    const { t } = useLanguage();

    if (!t) return null;
    const tFooter = t('Footer');
    const tNav = t('Navigation');

    return (
        <footer className="py-8 md:px-8 border-t border-border/40">
            <div className="container flex flex-col items-center justify-center gap-6">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <h3 className="font-bold text-lg">{tFooter.cadenzaTools}</h3>
                        {NAV_LINKS.map(link => (
                            <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground text-sm">
                                {tNav[link.i18nKey as keyof typeof tNav] || link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-3 lg:col-start-3 lg:items-end">
                        <a
                            href="https://github.com/listerineh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                        >
                            <Github className="h-4 w-4" />
                            {tFooter.githubPrompt}
                        </a>
                    </div>
                </div>
                <p className="text-center text-sm leading-loose text-muted-foreground">
                    {tFooter.builtBy[0]}{' '}
                    <a
                        href="https://listerineh.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary/80 hover:text-primary transition-colors"
                    >
                        Listerineh
                    </a>
                    {' '}{tFooter.builtBy[1]}
                </p>
            </div>
        </footer>
    );
}
