import { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function PageLayout({
  title,
  subtitle,
  children,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col flex-1">
      <div className="container mx-auto p-4 md:p-8 flex-1">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div className="flex-grow">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
