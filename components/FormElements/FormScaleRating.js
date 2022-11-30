import useTheme from "../../hooks/useTheme";
import FormIcons from "./FormIcons";
import DragHandle from "./../common/DragHandle";

const FormScaleRating = ({
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
            Scale Rating
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
          <div className="af_h_SR_box_list mt-2">
            <span>Worst</span>
            <div className="SR_box_number">
              <ul>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    1
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    2
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    3
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    4
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    5
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
              </ul>
            </div>
            <span>Best</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormScaleRating;
