const VARIANT_CLASS = {
  primary: "btn--primary",
  accent: "btn--accent",
  outline: "btn--outline",
  danger: "btn--danger",
  ghost: "btn--ghost",
};

const SIZE_CLASS = {
  sm: "btn--sm",
  md: "",
  lg: "btn--lg",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const classes = [
    "btn",
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    SIZE_CLASS[size] || "",
    fullWidth ? "btn--full" : "",
    loading ? "btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {loading ? "Yükleniyor..." : children}
    </button>
  );
};

export default Button;
