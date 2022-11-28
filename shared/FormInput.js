import useTheme from "./../hooks/useTheme";

const FormInput = ({
  type,
  labelAlign,
  className,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  formStyle,
  options,
}) => {
  const {
    selectedTheme: { inputBgColor, primaryColor, fontColor },
  } = useTheme();

  const renderPlaceholder = () => {
    if (labelAlign === "inside") {
      return placeholder;
    }
    return "";
  };

  const renderInputClasses = () => {
    if (formStyle === "default") {
      if (disabled) {
        return `${className} field-disabled`;
      }
    }

    if (formStyle === "secondary") {
      if (disabled) {
        return `${className} field-secondary field-disabled`;
      }
      return `${className} field-secondary`;
    }

    return className;
  };

  const renderWrapperClasses = () => {
    if (labelAlign === "left") {
      return `form-input-wrapper form-input-flex-wrapper`;
    }
    return `form-input-wrapper`;
  };

  const renderInputStyles = () => {
    if (formStyle === "default") {
      return { backgroundColor: inputBgColor, borderColor: primaryColor };
    }

    if (formStyle === "secondary") {
      return { borderColor: primaryColor };
    }
  };

  const label = (labelAlign === "top" || labelAlign === "left") && (
    <label className="form-label" style={{ color: fontColor }}>
      {placeholder}
    </label>
  );

  if (type === "textarea") {
    return (
      <div className={renderWrapperClasses()}>
        {label}
        <textarea
          rows="4"
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange}
          style={renderInputStyles()}
          className={renderInputClasses()}
          placeholder={renderPlaceholder()}
        ></textarea>
      </div>
    );
  }

  if (type === "upload") {
    return (
      <div className={renderWrapperClasses()}>
        {label}
        <div className="form-upload-wrapper">
          <label
            htmlFor="form-upload"
            className={renderInputClasses()}
            style={renderInputStyles()}
            placeholder={renderPlaceholder()}
          >
            <i class="fa fa-cloud-upload"></i> Upload here
          </label>
          <input
            className="form-upload"
            id="form-upload"
            type="file"
            name="fileupload"
            disabled={disabled}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }

  if (type === "dropdown") {
    return (
      <div className={renderWrapperClasses()}>
        {label}
        <select
          name="dropdown"
          value={value}
          // disabled={disabled}
          onChange={onChange}
          className={renderInputClasses()}
          style={renderInputStyles()}
        >
          <option value="">Select dropdown *</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
          {/* {dropdownList.map((dropdown) => (
        <option value={dropdown.value} key={dropdown.value}>
          {dropdown.label}
        </option>
      ))} */}
        </select>
      </div>
    );
  }

  if (type === "multiple choice") {
    return (
      <div className={renderWrapperClasses()}>
        {label}
        <div className="form-choice-wrapper">
          {!!options.length &&
            options.map((option) => (
              <div key={option} className="form-choice-row">
                <input
                  type="checkbox"
                  className="form-choice"
                  name="multichoice"
                  value={option}
                  disabled={disabled}
                  // checked={option.checked}
                  // onChange={(e) => handleChange(e, index)}
                />
                <label htmlFor="">{option}</label>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (type === "single choice") {
    return (
      <div className={renderWrapperClasses()}>
        {label}
        <div className="form-choice-wrapper">
          {!!options.length &&
            options.map((option) => (
              <div className="form-choice-row" key={option}>
                <input
                  type="radio"
                  className="form-choice"
                  name="singlechoice"
                  value={option}
                  style={{ visibility: "visible", position: "static" }}
                  disabled={disabled}
                  // checked={radio.checked}
                  // onChange={(e) => handleChange(e, index)}
                />
                <label>{option}</label>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className={renderWrapperClasses()}>
      {label}
      <input
        type={type}
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        style={renderInputStyles()}
        className={renderInputClasses()}
        placeholder={renderPlaceholder()}
      />
    </div>
  );
};

export default FormInput;
