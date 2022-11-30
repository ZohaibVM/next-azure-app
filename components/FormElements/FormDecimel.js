import useTheme from "../../hooks/useTheme";
import FormIcons from "./FormIcons";
import DragHandle from "./../common/DragHandle";

const FormDecimel = ({
  data,
  onElementDelete,
  onElementTitleChange,
  onElementDescriptionChange,
  onElementClone,
  onElementPrimary,
  onElementRequired,
  onElementVisible,
}) => {
  const {
    selectedTheme: {
      toggleIconColor,
      whiteColor,
      primaryColor,
      secondaryColor,
      fontColor,
    },
  } = useTheme();
  return (
    <div className="af_h_box">
      <div className="af_h_title_box">
        <div
          className="af-t-primary"
          style={{
            color: whiteColor,
            backgroundColor: primaryColor,
          }}
        >
          <div className="r_cI_titlebox_txt d-flex">
            <DragHandle />
            <input
              title="This text is editable"
              className="react-application-form-section-element-heading"
              style={{ color: whiteColor }}
              id={`form-title-${data?.id}`}
              value={data?.elementTitle}
              onChange={(e) => onElementTitleChange(e, data)}
            />
            {/* <div
              contentEditable
              // onInput={handleContentEditableChange}
              id="element"
              // uniqueIdentifier={uniqueIdentifier}
              dataToggle="tooltip"
              title="This text is editable"
            >
              {data?.elementTitle}
            </div> */}
          </div>
          <FormIcons
            data={data}
            onElementDelete={onElementDelete}
            onElementClone={onElementClone}
            onElementPrimary={onElementPrimary}
            onElementRequired={onElementRequired}
            onElementVisible={onElementVisible}
          />
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding addrees_box_drag">
        <div className="custom-input-wrappper-application-form">
          <div style={{ color: fontColor }} className="expanding-search-title">
            Decimal
            <span
              style={{
                backgroundColor: secondaryColor,
                color: whiteColor,
              }}
            >
              *
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            id={`form-desc-${data?.id}`}
            style={{ color: fontColor }}
            placeholder="Please Enter Description here..."
            value={data?.elementDescription}
            onChange={(e) => onElementDescriptionChange(e, data)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormDecimel;
