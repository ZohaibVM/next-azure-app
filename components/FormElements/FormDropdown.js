import useTheme from "./../../hooks/useTheme";
import FormIcons from "./FormIcons";
import DragHandle from "./../common/DragHandle";

const FormDropdown = ({
  data,
  onAddOption,
  onElementDelete,
  onElementTitleChange,
  onElementOptionChange,
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
              //   onInput={handleContentEditableChange}
              id="element"
              //   uniqueIdentifier={uniqueIdentifier}
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
          {/* {!element.isTemplateElement && (
                   <CardIcons
                   handleClickedElement={handleIconsClick}
                   name="Multiple Choice"
                   uniqueIdentifier={uniqueIdentifier}
                   editMode={editMode}
                   />
               )} */}
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding dropdown_box_drag">
        <div className="custom-input-wrappper-application-form">
          <div style={{ color: fontColor }} className="expanding-search-title">
            Question
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
        <div className="af_h_dd_box_list af_h_SCQ af_h_MCQ custom-options-wrappper-application-form">
          {/* isMultifield: false */}
          {data?.fields?.[0]?.options?.map((option, index) => {
            return (
              <input
                type="text"
                key={index}
                className="form-control"
                id={`form-desc-${data?.id}-${index}`}
                style={{ color: fontColor }}
                placeholder={`Please Enter Option ${index + 1} here...`}
                value={option?.value}
                onChange={(e) => onElementOptionChange(e, data, index)}
              />
            );
          })}
          {/* {[0,1].map((v) => (
                       <Input
                       index={v}
                       key={v + 1}
                       uniqueIdentifier={uniqueIdentifier}
                       orignalElementKeyForInput={orignalElementKeyForInput}
                       isNew={persistentIsNew}
                       handleOptionsChange={handleOptionsChange}
                       editMode={editMode}
                       />
                   ))} */}
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3 float-right"
          id="custom-application-form-element-button"
          onClick={(e) => onAddOption(e, data)}
          style={{
            backgroundColor: primaryColor,
            borderColor: primaryColor,
          }}
        >
          Add Option
        </button>
      </div>
    </div>
  );
};

export default FormDropdown;
