import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { anuphan } from "@/lib/fonts";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/sessionProvider";
import { FacultyStoreProvider } from "@/stores/faculty-provider";

export const metadata: Metadata = {
  title: {
    template: "%s | Engineering Digital Twin",
    default: "Engineering Digital Twin",
  },
  description: "...",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anuphan.className}`}>
        <SessionProvider session={session}>
          <FacultyStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main className="bg-foreground/5 dark:bg-foreground/10 w-full h-screen overflow-x-hidden">
                {children}
              </main>
            </ThemeProvider>
          </FacultyStoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
