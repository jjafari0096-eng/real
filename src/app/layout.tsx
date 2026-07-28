import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HorizonLine } from '@/components/HorizonLine';
import { ScrollSmoothProvider } from '@/components/ScrollSmoothProvider';
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper';

export const metadata: Metadata = {
  title: 'NOVA Realty | Luxury Real Estate Marketplace',
  description: 'Discover exceptional properties around the world. Luxury villas, penthouses, apartments, and commercial spaces for sale and rent.',
  keywords: 'luxury real estate, properties for sale, villas, penthouses, international real estate',
  openGraph: {
    title: 'NOVA Realty | Luxury Real Estate Marketplace',
    description: 'Discover exceptional properties around the world.',
    url: 'https://novarealty.com',
    siteName: 'NOVA Realty',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '/';
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ScrollSmoothProvider>
            {isAdminRoute ? (
              // For admin routes - only render children (admin's own layout handles everything)
              children
            ) : (
              // For main site routes - render with site's header and footer
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  <PageTransitionWrapper>
                    {children}
                  </PageTransitionWrapper>
                </main>
                <HorizonLine />
                <Footer />
              </div>
            )}
        </ScrollSmoothProvider>
      </body>
    </html>
  );
}