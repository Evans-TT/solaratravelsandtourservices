import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://solaratravelsandtourservices.com";
const title = "Solara Travel and Tours Services | Travel Beyond Borders";
const description = "Visa assistance, flights, hotels and curated tour packages from Pretoria to destinations around the world.";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Solara Travel and Tours Services",
  description,
  url: siteUrl,
  logo: `${siteUrl}/solara-header-logo.png`,
  image: `${siteUrl}/og.png`,
  telephone: "+27 61 201 7515",
  email: "info@solaratraveltours.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "291 Thabo Sehume Street",
    addressLocality: "Pretoria",
    addressCountry: "ZA",
  },
  areaServed: "Worldwide",
};

export const viewport: Viewport = {
  themeColor: "#063f2c",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Solara Travel and Tours Services",
  authors: [{ name: "Solara Travel and Tours Services", url: siteUrl }],
  creator: "Solara Travel and Tours Services",
  publisher: "Solara Travel and Tours Services",
  category: "Travel",
  keywords: [
    "travel agency Pretoria",
    "visa assistance South Africa",
    "international visas",
    "flight booking",
    "hotel booking",
    "tour packages",
    "Solara Travel and Tours Services",
  ],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: "Solara Travel and Tours Services",
    title,
    description,
    images: [{
      url: "/og.png",
      width: 1721,
      height: 914,
      alt: "Solara Travel and Tours Services, Travel Beyond Borders",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
