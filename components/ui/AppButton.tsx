type Props = {
  children: React.ReactNode;

  variant?:
    | "primary"
    | "danger"
    | "secondary";

  type?:
    | "button"
    | "submit";

  onClick?: () => void;

  href?: string;

  disabled?: boolean;
};

export default function AppButton({
  children,

  variant = "primary",

  type = "button",

  onClick,

  disabled,
}: Props) {
  const styles = {
    ...baseStyle,

    ...(variant ===
      "primary"
      ? primaryStyle
      : variant ===
        "danger"
      ? dangerStyle
      : secondaryStyle),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles}
    >
      {children}
    </button>
  );
}

const baseStyle: any = {
  border: "none",

  borderRadius: 14,

  padding: "12px 18px",

  fontWeight: 700,

  cursor: "pointer",

  transition:
    "all 0.2s ease",

  fontSize: 14,

  display: "inline-flex",

  alignItems: "center",

  justifyContent:
    "center",

  gap: 8,
};

const primaryStyle = {
  background:
    "linear-gradient(135deg,#2563eb,#1d4ed8)",

  color: "#fff",
};

const dangerStyle = {
  background:
    "linear-gradient(135deg,#dc2626,#b91c1c)",

  color: "#fff",
};

const secondaryStyle = {
  background: "#f1f5f9",

  color: "#0f172a",
};