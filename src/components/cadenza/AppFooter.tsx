'use client';

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { Github, Sparkle, FlaskConical } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '@/lib/utils';

export default function AppFooter() {
  const { t } = useLanguage();

  if (!t) return null;
  const tFooter = t('Footer');
  const tNav = t('Navigation');
  const tHome = t('HomePage');

  const NavLinkContent = ({ link, tNav, tHome }: { link: (typeof NAV_LINKS)[0]; tNav: any; tHome: any }) => {
    const badgeContent =
      link.badge === 'new' ? (
        <Sparkle className="h-3 w-3 text-primary" />
      ) : (
        <FlaskConical className="h-3 w-3 text-destructive" />
      );

    const badge = link.badge && (
      <Badge size="icon" className={cn('absolute -bottom-1 -right-4 bg-transparent border-none')}>
        {badgeContent}
      </Badge>
    );

    const content = (
      <div className="relative inline-block">
        <span>{tNav[link.i18nKey as keyof typeof tNav] || link.label}</span>
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
      </div>
    );

    return content;
  };

  return (
    <footer className="py-8 md:px-8 border-t border-border/40">
      <div className="container flex flex-col items-center justify-center gap-6">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="font-bold text-lg">{tFooter.cadenzaTools}</h3>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground text-sm pb-1 relative"
              >
                <NavLinkContent link={link} tNav={tNav} tHome={tHome} />
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
          </a>{' '}
          {tFooter.builtBy[1]}
        </p>
      </div>
    </footer>
  );
}
