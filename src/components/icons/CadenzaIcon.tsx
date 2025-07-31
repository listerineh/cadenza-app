import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function CadenzaIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <Image src="/icon.svg" alt="Cadenza Logo" width={28} height={28} className={cn('h-7 w-7', className)} priority />
  );
}
