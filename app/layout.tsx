import "./globals.css";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
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