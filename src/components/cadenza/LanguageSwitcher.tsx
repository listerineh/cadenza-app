'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Globe, Menu, X, Github, Sparkle, FlaskConical } from 'lucide-react';
import Link from 'next/link';
import CadenzaIcon from '../icons/CadenzaIcon';
import UsaFlagIcon from '../icons/UsaFlagIcon';
import SpainFlagIcon from '../icons/SpainFlagIcon';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

interface NavLink {
  href: string;
  label: string;
  i18nKey: string;
  badge?: 'new' | 'experimental';
}

interface LanguageSwitcherProps {
  navLinks: NavLink[];
}

const NavLinkContent = ({
  link,
  tNav,
  tHome,
  isSheet = false,
}: {
  link: NavLink;
  tNav: any;
  tHome: any;
  isSheet?: boolean;
}) => {
  const badgeContent =
    link.badge === 'new' ? (
      <Sparkle className="h-3 w-3 text-primary" />
    ) : (
      <FlaskConical className="h-3 w-3 text-destructive" />
    );

  const badge = link.badge && (
    <Badge
      size="icon"
      className={cn('absolute -bottom-1 -right-4 bg-transparent border-none', isSheet && '-bottom-0 -right-4')}
    >
      {badgeContent}
    </Badge>
  );

  const content = (
    <span className="relative inline-block py-1">
      {tNav[link.i18nKey as keyof typeof tNav] || link.label}
      {link.badge &&
        (link.badge === 'experimental' ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>{badge}</div>
              </TooltipTrigger>
              <TooltipContent>{tHome.experimentalTooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          badge
        ))}
    </span>
  );

  return content;
};

export default function LanguageSwitcher({ navLinks }: LanguageSwitcherProps) {
  const { setLocale, t } = useLanguage();
  const tNav = t('Navigation');
  const tFooter = t('Footer');
  const tHome = t('HomePage');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="ml-auto flex items-center gap-2">
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground relative"
          >
            <NavLinkContent link={link} tNav={tNav} tHome={tHome} />
          </Link>
        ))}
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
            <span className="sr-only">Change language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLocale('en')}>
            <UsaFlagIcon className="h-4 w-4 mr-2 rounded-full" />
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLocale('es')}>
            <SpainFlagIcon className="h-4 w-4 mr-2 rounded-full" />
            Español
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80vw] max-w-xs flex flex-col">
            <SheetHeader className="border-b pb-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                <CadenzaIcon className="text-primary" />
                <span className="font-bold text-lg">Cadenza</span>
              </Link>
            </SheetHeader>
            <div className="flex-grow flex flex-col gap-6 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground relative"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <NavLinkContent link={link} tNav={tNav} tHome={tHome} isSheet={true} />
                </Link>
              ))}
            </div>
            <footer className="mt-auto pt-4 border-t">
              <div className="flex flex-col items-center gap-4">
                <p className="text-center text-xs leading-loose text-muted-foreground">
                  {tFooter.builtBy[0]}{' '}
                  <a
                    href="https://listerineh.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary/80 hover:text-primary"
                  >
                    Listerineh
                  </a>{' '}
                  {tFooter.builtBy[1]}
                </p>
                <a
                  href="https://github.com/listerineh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Github className="h-3 w-3" />
                  {tFooter.githubPrompt}
                </a>
              </div>
            </footer>
            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
