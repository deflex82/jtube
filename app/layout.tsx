import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "jtube",
  description: "stream your videos for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider  >

    <html lang="en">
      <body className={cn(inter.className,'')}>
      <ThemeProvider
            attribute="class"
            defaultTheme="light"
      
          >
        <Header/>
  
        {children}
        <Toaster />
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
