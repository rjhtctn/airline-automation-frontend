const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  hint,
  required = false,
  placeholder = "Seçiniz",
  disabled = false,
  className = "",
  ...props
}) => {
  const selectId = name || props.id;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className={`form-label ${required ? "form-label--required" : ""}`}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`form-input form-select ${error ? "form-input--error" : ""}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="form-error">{error}</span>}
      {hint && !error && <span className="form-hint">{hint}</span>}
    </div>
  );
};

export default Select;
