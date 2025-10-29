import { ThemeProvider } from "@/app/components/features/navbar/theme-provider";
import { AppSidebar } from "@/app/components/features/sidebar/app-sidebar";
import Header from "@/app/components/layout/header";
import { SidebarProvider } from "@/app/components/ui/sidebar";
import { Toaster } from "@/app/components/ui/sonner";
import { getCurrentUser } from "@/app/data/users";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medium Clone",
  description: "Medium Clone built with NextJS",
  keywords: ["blog", "medium", "clone", "nextjs"],
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getCurrentUser();
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="medium-theme"
        >
          {session ? (
            <SidebarProvider className="flex flex-col">
              <Header />
              <div className="flex pt-18">
                <AppSidebar />
                {children}
              </div>
            </SidebarProvider>
          ) : (
            // if user is not logged in
            <>
              <Header />
              {children}
            </>
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
