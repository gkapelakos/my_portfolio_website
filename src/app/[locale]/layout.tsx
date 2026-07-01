import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToastProvider } from '@/components/Toast';
import CursorEffect from '@/components/CursorEffect';
import BackToTop from '@/components/BackToTop';
import PageLoader from '@/components/PageLoader';
import '@/app/globals.css';
import { Outfit, JetBrains_Mono } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const siteUrl = 'https://kapelakos.dev'; // Production URL placeholder

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        el: `${siteUrl}/el`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale}`,
      siteName: 'Giannis Kapelakos Portfolio',
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/backplane.png', // Premium representative image
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/backplane.png'],
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
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${outfit.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground font-sans select-none selection:bg-primary/10">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <ToastProvider>
              <PageLoader />
              <CursorEffect />
              <div className="relative flex flex-col min-h-screen">
                {children}
              </div>
              <BackToTop />
            </ToastProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
