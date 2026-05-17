import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "한담 (Handam) - AI 일기 및 운세",
  description: "당신의 하루를 기록하고 내일을 준비하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-[#f2f4f6] text-[#191f28] antialiased`}>
        <main className="mx-auto min-h-screen max-w-[440px] bg-white shadow-xl relative pb-20">
          {children}
          <BottomNav />
        </main>
      </body>
    </html>
  );
}
