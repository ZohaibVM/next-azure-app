import FormTitle from "./FormTitle";
import SectionBadge from "./SectionBadge";

const TopHeader = ({ form, sections, onActiveSection, formTitleRef }) => {
  return (
    <div className="application_form_header">
      <div className="afh_bottom text-center px-2 py-0">
        <FormTitle
          title={form?.formTitle ? form?.formTitle : "New Form Title"}
          formTitleRef={formTitleRef}
        />
        <SectionBadge sections={sections} onActiveSection={onActiveSection} />
      </div>
    </div>
  );
};

export default TopHeader;
