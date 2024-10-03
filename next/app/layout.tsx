import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const noto = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sumrov 관리자 페이지",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <body className={noto.className}>{children}</body>
    </html>
  );
}
