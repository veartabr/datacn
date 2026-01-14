import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://datacn.dev';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'datacn - Data Visualization Library for React',
    template: '%s | datacn',
  },
  description:
    'Build beautiful, timezone-aware charts with standardized data formats. TypeScript-first data visualization library with bar, line, area, pie, and time-series charts.',
  keywords: [
    'datacn',
    'data visualization',
    'React charts',
    'TypeScript charts',
    'timezone charts',
    'chart library',
    'data visualization library',
  ],
  authors: [{ name: 'datacn' }],
  creator: 'datacn',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'datacn',
    title: 'datacn - Data Visualization Library for React',
    description:
      'Build beautiful, timezone-aware charts with standardized data formats. TypeScript-first data visualization library.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'datacn - Data Visualization Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'datacn - Data Visualization Library for React',
    description:
      'Build beautiful, timezone-aware charts with standardized data formats.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function createPageMetadata(
  title: string,
  description: string,
  path: string = ''
): Metadata {
  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `${title} | datacn`,
      description,
      url: `${siteUrl}${path}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `${title} | datacn`,
      description,
    },
  };
}
