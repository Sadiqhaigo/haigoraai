export default function LoadingSpinner() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner} />
    </div>
  );
}

const styles: any = {
  wrapper: {
    display: "flex",

    alignItems: "center",

    justifyContent:
      "center",

    padding: 20,
  },

  spinner: {
    width: 40,

    height: 40,

    borderRadius: "50%",

    border:
      "4px solid #e2e8f0",

    borderTop:
      "4px solid #2563eb",

    animation:
      "spin 1s linear infinite",
  },
};