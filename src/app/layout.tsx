import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kilise App",
  description: "Kiliseler için dijital platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}