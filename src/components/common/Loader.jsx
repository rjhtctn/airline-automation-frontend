const Loader = ({ text = "Yükleniyor..." }) => {
  return (
    <div className="loader-wrapper">
      <div style={{ textAlign: "center" }}>
        <div className="spinner" />
        {text && (
          <p
            style={{
              marginTop: "var(--space-4)",
              color: "var(--color-text-muted)",
              fontSize: "var(--text-sm)",
            }}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;
