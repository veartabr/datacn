import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from './metadata';
import { createSoftwareApplicationSchema, createWebSiteSchema } from '@/lib/seo/structured-data';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Navigation } from '@/components/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareSchema = createSoftwareApplicationSchema();
  const websiteSchema = createWebSiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <Navigation />
            <div className="flex-1 flex flex-col">
              <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container flex h-14 items-center justify-between px-4">
                  <Link href="/" className="text-xl font-bold">
                    datacn
                  </Link>
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
