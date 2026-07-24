import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TYPEAI.PRO",
  description: "AI Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-slate-950 text-slate-50 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}