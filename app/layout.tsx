import "./globals.css";

import { Metadata } from "next";

import { getServerSession }
from "next-auth";

import { authOptions }
from "@/lib/auth";

export const metadata: Metadata = {
  title: "HaigoraAI",

  description:
    "AI Academic Research Assistant for Educators",

  manifest: "/manifest.json",

  icons: {
    icon: "/icon-192.png",

    apple: "/icon-192.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session =
    await getServerSession(
      authOptions
    );

  return (
    <html lang="en">
      <head>
        <meta
          name="theme-color"
          content="#2563eb"
        />

        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />

        <meta
          name="apple-mobile-web-app-title"
          content="HaigoraAI"
        />

        <meta
          name="mobile-web-app-capable"
          content="yes"
        />
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}

const navStyle = {
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  padding: "15px 20px",

  background: "#111",

  color: "#fff",
};

const navLinks = {
  display: "flex",

  gap: 15,

  alignItems: "center",
};

const userStyle = {
  color: "#ccc",

  fontSize: 14,
};