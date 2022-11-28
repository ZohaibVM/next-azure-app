import React from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import ReviewPage from "./ReviewPage";
import useTheme from "../hooks/useTheme";

const LeftSection = ({
  sections,
  activeStep,
  handleElementsDragChange,
  handleEditSectionClick,
  persistentSections,
  handleSetSections,
}) => {
  const SortableItem = sortableElement(({ children }) => children);
  const SortableContainer = sortableContainer(({ children }) => (
    <div>{children}</div>
  ));

  const onSortEnd = (oldIndex, newIndex, section) => {
    handleElementsDragChange(oldIndex, newIndex, section);
  };
  const {
    selectedTheme: { secondaryColor },
  } = useTheme();

  return activeStep.isLastSection ? (
    <ReviewPage
      sections={sections}
      handleEditSectionClick={handleEditSectionClick}
      activeStep={activeStep}
      persistentSections={persistentSections}
    />
  ) : (
    <div
      className="r_c_i_left"
      style={{
        width: "100%",
        padding: "0 20px",
      }}
    >
      <div className="list-group">
        {sections.map(
          (section, index) =>
            activeStep.uniqueIdentifier === section.uniqueIdentifier && (
              <React.Fragment key={index}>
                {section.reactElement}
                <SortableContainer
                  onSortEnd={({ oldIndex, newIndex }) =>
                    onSortEnd(oldIndex, newIndex, section)
                  }
                  useDragHandle
                >
                  {section.elements.map((e, i) => (
                    <SortableItem key={e.uniqueIdentifier} index={i}>
                      {e.reactElement}
                    </SortableItem>
                  ))}
                </SortableContainer>
              </React.Fragment>
            )
        )}

        {/* footer */}
        <div className="d-flex justify-content-end mt-1">
          <div
            className="btn-left-container ACT_next_btn mr-0"
            style={{ width: "180px" }}
          >
            <button
              className="btn_color_signup btn-outline-primary btn-block round mt-3 waves-effect waves-light"
              onClick={() => handleSetSections()}
              id="next"
              style={{
                backgroundColor: secondaryColor,
                margin: 0,
                fontWeight: "600",
                fontSize: "15px",
                padding: "0 12px",
                height: "40px",
              }}
            >
              Create New Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
