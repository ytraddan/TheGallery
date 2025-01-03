import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import TopNav from "./_components/topnav";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "node_modules/@uploadthing/react/next-ssr-plugin/index.cjs";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "The Gallery",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${GeistSans.variable}`}
        suppressHydrationWarning={true}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="grid h-screen grid-rows-[auto,1fr]">
              <div className="fixed inset-0 -z-10">
                <div className="relative h-full w-full overflow-hidden bg-background">
                  <div className="absolute -top-[10%] left-[50%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />
                  <div className="absolute bottom-0 left-[15%] h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[100px]" />
                  <div className="absolute bottom-0 right-[15%] h-[600px] w-[600px] rounded-full bg-pink-500/10 blur-[100px]" />
                </div>
              </div>
              <TopNav />
              <main className="overflow-y-scroll">{children}</main>
            </div>
            {modal}
            <div id="modal-root" />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
