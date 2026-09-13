import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

const SITE = "https://dangvu0502.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Dang Vu (Matt) - Portfolio",
  description:
    "Fullstack developer based in Vietnam building performant, AI-powered web experiences.",
  icons: { icon: "/avatar.jpg" },
  openGraph: {
    title: "Dang Vu (Matt) - Portfolio",
    description:
      "Fullstack developer based in Vietnam building performant, AI-powered web experiences.",
    url: SITE,
    siteName: "Dang Vu (Matt)",
    images: [{ url: "/avatar.jpg", width: 160, height: 160 }],
    type: "website",
  },
  twitter: { card: "summary", images: ["/avatar.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
