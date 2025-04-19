export default function History() {
    return (
      <div
        style={{
          backgroundColor: "#f9fafb",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem 3rem",
            borderRadius: "1rem",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", color: "#1e3a8a" }}>📊 Your Check-In History</h1>
          <p style={{ marginTop: "1rem" }}>No history yet, but this page is working!</p>
        </div>
      </div>
    );
  }