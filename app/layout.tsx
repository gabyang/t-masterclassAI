import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

import { Providers } from "./providers";

import NavBar from "@/components/NavBar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Masterclass.ai App",
    template: `%s - Masterclass.ai App`,
  },
  icons: {
    icon: "/heygen-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} font-sans`}
      lang="en"
    >
      <head />
      <body className={clsx("min-h-screen bg-background antialiased")}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="relative flex flex-col h-screen w-screen">
            <NavBar />
            {children}
            <h1 className="text-center">
              Disclaimer: This avatar is powered by AI and may produce errors,
              inaccuracies, or hallucinations. Please verify its responses
              independently and remember it is not a human but an AI capable of
              mistakes. Use the information provided responsibly.
            </h1>
            <h1 className="text-center">
              This demonstration showcases content from &quot;Structure and
              Interpretation of Computer Programs,&quot; a textbook employed in
              CS1101S at the NUS. This course serves as an introductory computer
              science class for first-year students. The teaching assistant (TA)
              mentioned here instructs this particular subject.
            </h1>
          </main>
        </Providers>
      </body>
    </html>
  );
}
