import useTheme from "./../../hooks/useTheme";
import FormIcons from "./FormIcons";
import DragHandle from "./../common/DragHandle";

const FormSignature = ({
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
    selectedTheme: { whiteColor, primaryColor },
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
      <div className="af_h_title_box_text custom-card-body-padding signature_box_drag">
        <div className="signature_content"></div>
      </div>
    </div>
  );
};

export default FormSignature;
