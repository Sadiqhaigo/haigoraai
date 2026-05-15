type Props = {
    children: React.ReactNode;
  
    style?: React.CSSProperties;
  };
  
  export default function AppCard({
    children,
  
    style,
  }: Props) {
    return (
      <div
        style={{
          ...styles.card,
  
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
  
  const styles: any = {
    card: {
      background: "#fff",
  
      borderRadius: 24,
  
      padding: 24,
  
      border:
        "1px solid #f1f5f9",
  
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.05)",
    },
  };