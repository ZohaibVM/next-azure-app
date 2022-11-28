import React from "react";
import { FormSection, renderSectionElements } from "../FormElements";

const ContainerContent = ({ sections, sectionIndex, onElementDelete }) => {
  return (
    <div className="r_c_i_left w-100 py-0 px-3">
      <div className="list-group">
        {!!sections.length && !!Object.keys(sections?.[sectionIndex]).length && (
          <React.Fragment>
            <FormSection sectionData={sections?.[sectionIndex]} />
            {sections[sectionIndex]?.elements?.map((element) =>
              renderSectionElements(element, onElementDelete)
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ContainerContent;
