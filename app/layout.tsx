import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solara Travel and Tours Services | Travel Beyond Borders",
  description: "Visa assistance, flights, hotels and curated tour packages from Pretoria to destinations around the world.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
