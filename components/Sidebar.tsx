"use client";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  signOut,
} from "next-auth/react";

import {
  useState,
  useEffect,
} from "react";

type Props = {
  role?: string;
};

export default function Sidebar({
  role,
}: Props) {
  const pathname =
    usePathname();

  const [open, setOpen] =
    useState(false);

  const [mobile, setMobile] =
    useState(false);

  // RESPONSIVE CHECK
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

  // AUTO CLOSE ON ROUTE CHANGE
  useEffect(() => {
    if (mobile) {
      setOpen(false);
    }
  }, [pathname, mobile]);

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "🏠",
    },

    {
      label: "Generate Lesson",
      href: "/lesson",
      icon: "📘",
    },

    {
      label: "Assignment",
      href: "/assignment",
      icon: "📝",
    },

    {
      label: "Test",
      href: "/test",
      icon: "📋",
    },

    {
      label: "Examination",
      href: "/exam",
      icon: "🎓",
    },

    {
      label: "History",
      href: "/history",
      icon: "🕘",
    },

    {
      label: "Profile",
      href: "/profile",
      icon: "👤",
    },
  ];

  // ADMIN ONLY
  if (role === "admin") {
    menuItems.push({
      label: "Admin Panel",
      href: "/admin",
      icon: "⚙️",
    });
  }

  return (
    <>
      {/* MOBILE TOP BAR */}
      {mobile && (
        <div style={styles.mobileTop}>
          <button
            style={
              styles.menuBtn
            }
            onClick={() =>
              setOpen(
                !open
              )
            }
          >
            ☰
          </button>

          <h1
            style={
              styles.mobileLogo
            }
          >
            HaigoraAI
          </h1>
        </div>
      )}

      {/* OVERLAY */}
      {mobile && open && (
        <div
          style={
            styles.overlay
          }
          onClick={() =>
            setOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          ...styles.sidebar,

          ...(mobile
            ? open
              ? styles.sidebarOpen
              : styles.sidebarClosed
            : {}),
        }}
      >
        {/* LOGO */}
        <div>
          <div
            style={
              styles.logoWrap
            }
          >
            <div
              style={
                styles.logo
              }
            >
              H
            </div>

            <div>
              <h1
                style={
                  styles.brand
                }
              >
                HaigoraAI
              </h1>

              <p
                style={
                  styles.tagline
                }
              >
                Educator Suite
              </p>
            </div>
          </div>

          {/* NAV */}
          <nav
            style={styles.nav}
          >
            {menuItems.map(
              (
                item
              ) => {
                const active =
                  pathname ===
                  item.href;

                return (
                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    style={{
                      ...styles.link,

                      ...(active
                        ? styles.activeLink
                        : {}),
                    }}
                  >
                    <span>
                      {
                        item.icon
                      }
                    </span>

                    {
                      item.label
                    }
                  </Link>
                );
              }
            )}
          </nav>
        </div>

        {/* FOOTER */}
        <div
          style={
            styles.footer
          }
        >
          <button
            onClick={() =>
              signOut({
                callbackUrl:
                  "/",
              })
            }
            style={
              styles.logoutBtn
            }
          >
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
}

const styles: any = {
  mobileTop: {
    position: "fixed",
  
    top: 0,
  
    left: 0,
  
    right: 0,
  
    height: 72,
  
    background:
      "rgba(15,23,42,0.96)",
  
    backdropFilter:
      "blur(12px)",
  
    display: "flex",
  
    alignItems: "center",
  
    gap: 14,
  
    padding: "0 20px",
  
    zIndex: 1200,
  
    borderBottom:
      "1px solid rgba(255,255,255,0.06)",
  },

  menuBtn: {
    border: "none",

    background: "none",

    color: "#fff",

    fontSize: 28,

    cursor: "pointer",
  },

  mobileLogo: {
    color: "#fff",

    fontSize: 22,

    fontWeight: 800,
  },

  overlay: {
    position: "fixed",

    inset: 0,

    background:
      "rgba(0,0,0,0.4)",

    zIndex: 999,
  },

  sidebar: {
    width: 240,

    height: "100vh",

    position: "fixed",

    left: 0,

    top: 0,

    background:
      "linear-gradient(180deg,#0f172a,#111827)",

    padding: 24,
    paddingTop: 90,

    display: "flex",

    flexDirection: "column",

    justifyContent:
      "space-between",

    borderRight:
      "1px solid rgba(255,255,255,0.06)",

    transition:
      "0.3s ease",

    zIndex: 1000,
  },

  sidebarOpen: {
    transform:
      "translateX(0)",
  },

  sidebarClosed: {
    transform:
      "translateX(-100%)",
  },

  logoWrap: {
    display: "flex",

    alignItems: "center",

    gap: 14,

    marginBottom: 40,
  },

  logo: {
    width: 52,

    height: 52,

    borderRadius: 18,

    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    color: "#fff",

    fontSize: 24,

    fontWeight: 800,
  },

  brand: {
    color: "#fff",

    fontSize: 22,

    fontWeight: 800,
  },

  tagline: {
    color: "#94a3b8",

    fontSize: 13,
  },

  nav: {
    display: "grid",

    gap: 8,
  },

  link: {
    display: "flex",

    alignItems: "center",

    gap: 12,

    padding:
      "14px 16px",

    borderRadius: 16,

    color: "#cbd5e1",

    textDecoration: "none",

    fontWeight: 600,
  },

  activeLink: {
    background:
      "linear-gradient(135deg,#2563eb,#1d4ed8)",

    color: "#fff",
  },

  footer: {
    marginTop: 30,
  },

  logoutBtn: {
    width: "100%",

    border: "none",

    background:
      "linear-gradient(135deg,#dc2626,#b91c1c)",

    color: "#fff",

    padding:
      "14px 18px",

    borderRadius: 16,

    cursor: "pointer",

    fontWeight: 700,
  },
};