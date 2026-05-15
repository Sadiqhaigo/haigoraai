"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import Sidebar
from "@/components/Sidebar";

type Props = {
  children: ReactNode;

  role?: string;
};

export default function DashboardLayout({
  children,
  role,
}: Props) {
  const [mobile, setMobile] =
    useState(false);

  useEffect(() => {
    const handleResize =
      () => {
        setMobile(
          window.innerWidth < 900
        );
      };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <Sidebar role={role} />

      {/* MAIN CONTENT */}
      <main
  style={{
    ...styles.main,

    marginLeft:
      mobile ? 0 : 240,

    width: mobile
      ? "100%"
      : "calc(100% - 240px)",

    padding: mobile
      ? "90px 16px 40px"
      : "24px 24px 40px",
  }}
>
        {children}
      </main>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",

    background: "#f8fafc",
  },

  main: {
    minHeight: "100vh",
  
    padding: "24px 24px 40px",
  
    transition:
      "margin-left 0.3s ease",
  
    overflowX: "hidden",
  
    boxSizing: "border-box",
  },
};