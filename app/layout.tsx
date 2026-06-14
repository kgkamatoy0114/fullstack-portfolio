import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tal — Software Engineer",
  description:
    "Portfolio of Tal — Software Engineer building React, TypeScript, and full-stack experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
