import { useNavigate } from "react-router-dom";

const FORMS = [
  {
    formId: 1,
    name: "My form",
    description: "For testing & learning",
  },
  {
    formId: 2,
    name: "Company Form",
    description: "For company newsletter",
  },
];
const ViewForms = () => {
  const navigate = useNavigate();

  return (
    <section className="view-forms">
      {FORMS.map((form) => (
        <div
          key={form.formId}
          className="view-form-single"
          onClick={() => {
            navigate(`/PublishedForm/${form.formId}`);
          }}
        >
          <div className="view-form-title">{form.name}</div>
          <div className="view-form-description">{form.description}</div>
        </div>
      ))}
    </section>
  );
};

export default ViewForms;
