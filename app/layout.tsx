import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://dangvu0502.github.io";
const DESC = "Fullstack engineer in Hanoi. TypeScript, React, Next.js, Node. PageFly performance work for 200k+ Shopify stores, now billing and SSO at sending.ac.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Dang Vu",
  description: DESC,
  icons: { icon: "/avatar.jpg" },
  openGraph: { title: "Dang Vu", description: DESC, url: SITE, siteName: "Dang Vu", images: [{ url: "/avatar.jpg", width: 160, height: 160 }], type: "website" },
  twitter: { card: "summary", images: ["/avatar.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
