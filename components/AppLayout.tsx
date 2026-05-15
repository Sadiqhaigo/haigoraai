"use client";

import Sidebar from "./Sidebar";

export default function AppLayout({ children }: any) {
  return (
    <div style={styles.layout}>
      <Sidebar />

      <main style={styles.main}>
        <div style={styles.container}>
          {children}
        </div>
      </main>
    </div>
  );
}

const styles: any = {
  layout: {
    display: "flex",
  },

  main: {
    marginLeft: 220,
    width: "100%",
    padding: 20,
    background: "#f5f7fa",
    minHeight: "100vh",
  },

  container: {
    maxWidth: 1000,
    margin: "auto",
  },
};