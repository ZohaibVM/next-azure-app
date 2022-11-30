import useTheme from "../../hooks/useTheme";
import DragHandle from "../common/DragHandle";

const FormHeading = ({
  data,
  onElementDelete,
  onElementTitleChange,
  onElementDescriptionChange,
}) => {
  const {
    selectedTheme: { whiteColor, primaryColor, fontColor },
  } = useTheme();

  return (
    <div className="af_h_box">
      <div className="af_h_title_box">
        <div
          className="af-t-primary"
          style={{
            backgroundColor: primaryColor,
            color: whiteColor,
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
              id="element"
              contentEditable
              onInput={onElementTitleChange}
              // uniqueIdentifier={uniqueIdentifier}
              className="react-application-form-section-element-heading"
              dataToggle="tooltip"
              title="This text is editable"
            >
              {data?.elementTitle}
            </div> */}
          </div>
          <div className="float-right">
            <span
              className="cursor-pointer element-icon"
              onClick={(e) => onElementDelete(e, data)}
              id="remove-icon"
            >
              <i className="fa fa-trash-o"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding">
        <div className="custom-input-wrappper-application-form">
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

export default FormHeading;
