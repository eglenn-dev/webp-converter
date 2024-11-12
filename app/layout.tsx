import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WebP Converter | Ethan Glenn",
  description: "Free, ad free, and open source WebP converter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a href="https://eglenn.dev/" className="header gradient">Ethan Glenn</a>
        <div>{children}</div>
        <a href="https://github.com/eglenn-dev/webp-converter"></a>
      </body>
    </html>
  );
}
