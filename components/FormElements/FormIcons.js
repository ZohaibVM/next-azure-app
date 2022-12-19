import useTheme from "./../../hooks/useTheme";

const FormIcons = ({
  data,
  onElementDelete,
  onElementClone,
  onElementRequired,
  onElementVisible,
}) => {
  const {
    selectedTheme: {
      toggleIconColor,
      whiteColor,
      secondaryToggleIconActive,
      secondaryToggleIconDisabled,
    },
  } = useTheme();

  return (
    <div className="r_cI_titlebox_right_icon d-flex">
      <div
        className="toggle-container mr-1 element-icon"
        onClick={() => onElementRequired(data)}
        id={`required-toggle-icon`}
        // dataToggle="tooltip"
        title="Mark/Un Mark element as required"
        // style={{ backgroundColor: whiteColor }}
        style={{
          backgroundColor: data?.isRequired
            ? secondaryToggleIconActive
            : secondaryToggleIconDisabled,
        }}
      >
        <div
          // className="dialog-button"
          className={`dialog-button ${data?.isRequired ? "" : "disabled"}`}
          style={{ backgroundColor: toggleIconColor }}
        />
      </div>
      <span
        className="cursor-pointer element-icon"
        onClick={() => onElementVisible(data)}
        id="visibility-icon"
        // dataToggle="tooltip"
        title="Toggle visibilty of element"
      >
        <i
          // className="text-white feather icon-eye"
          className={`text-white feather ${
            data?.isVisible ? "icon-eye" : "icon-eye-off"
          }`}
        ></i>
      </span>
      <span
        className="mx-1 cursor-pointer element-icon"
        onClick={() => onElementClone(data)}
        id="duplicate-icon"
        // dataToggle="tooltip"
        title="Duplicate element"
      >
        <i className="feather icon-copy"></i>
      </span>
      <span
        className="cursor-pointer element-icon"
        onClick={(e) => onElementDelete(e, data)}
        id="remove-icon"
        // dataToggle="tooltip"
        title="Delete element"
      >
        <i className="fa fa-trash-o"></i>
      </span>
    </div>
  );
};

export default FormIcons;
