import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GAMESTUCK HELPER - AI-Powered Game Assistant",
  description: "Upload a screenshot from your game and get instant AI-powered game identification, context analysis, and walkthrough recommendations. Premium gaming experience powered by Claude AI.",
  keywords: "gaming, AI, game helper, walkthrough, screenshot, game identification, gaming assistant",
  authors: [{ name: "GameStuck Helper" }],
  openGraph: {
    title: "GAMESTUCK HELPER - AI-Powered Game Assistant",
    description: "Upload a screenshot and get instant AI-powered game help",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAMESTUCK HELPER",
    description: "AI-powered game assistance at your fingertips",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
