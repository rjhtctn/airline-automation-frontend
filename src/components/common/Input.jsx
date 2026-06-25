const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  hint,
  required = false,
  placeholder,
  autoComplete,
  disabled = false,
  className = "",
  ...props
}) => {
  const inputId = name || props.id;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`form-label ${required ? "form-label--required" : ""}`}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`form-input ${error ? "form-input--error" : ""}`}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
      {hint && !error && <span className="form-hint">{hint}</span>}
    </div>
  );
};

export default Input;
