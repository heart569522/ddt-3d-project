import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { anuphan } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    template: '%s | Engineering Digital Twin',
    default: 'Engineering Digital Twin',
  },
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={anuphan.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
