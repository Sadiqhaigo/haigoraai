"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{
        marginTop: "auto",
        background: "#dc2626",
        color: "#fff",
        border: "none",
        padding: "10px",
        borderRadius: 6,
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}