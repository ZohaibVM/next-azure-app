import React from "react";
import { FormSection, renderSectionElements } from "../FormElements";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

const ContainerContent = ({
  sections,
  sectionIndex,
  onDragDropElement,
  onElementDelete,
  onElementTitleChange,
  onElementDescriptionChange,
  onAddOption,
  onElementOptionChange,
  onElementClone,
  onElementPrimary,
  onElementRequired,
  onElementVisible,
}) => {
  const SortableContainer = sortableContainer(({ children }) => (
    <div>{children}</div>
  ));

  const SortableItem = sortableElement(({ children }) => children);

  return (
    <div className="r_c_i_left w-100 py-0 px-3">
      <div className="list-group">
        {!!sections.length && !!Object.keys(sections?.[sectionIndex]).length && (
          <React.Fragment>
            <FormSection
              sectionData={sections?.[sectionIndex]}
              onTitleChange={onElementTitleChange}
              onDescriptionChange={onElementDescriptionChange}
            />
            <SortableContainer onSortEnd={onDragDropElement} useDragHandle>
              {sections[sectionIndex]?.elements?.map((element, index) => (
                <SortableItem key={element.id} index={index}>
                  {renderSectionElements({
                    element,
                    onElementDelete,
                    onElementTitleChange,
                    onElementDescriptionChange,
                    onAddOption,
                    onElementOptionChange,
                    onElementClone,
                    onElementPrimary,
                    onElementRequired,
                    onElementVisible,
                  })}
                </SortableItem>
              ))}
            </SortableContainer>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ContainerContent;
