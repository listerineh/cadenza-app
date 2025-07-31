
'use client';

import Link from 'next/link';
import CadenzaIcon from '@/components/icons/CadenzaIcon';
import LanguageSwitcher from '@/components/cadenza/LanguageSwitcher';
import { NAV_LINKS } from '@/lib/constants';

export default function AppHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <Link href="/" className="flex items-center gap-2 mr-6">
                    <CadenzaIcon className="text-primary" />
                    <span className="font-bold text-lg">Cadenza</span>
                </Link>
                <LanguageSwitcher navLinks={NAV_LINKS} />
            </div>
        </header>
    );
}
