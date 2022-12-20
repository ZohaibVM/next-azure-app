import Dropdown from "./../components/Dropdown/Dropdown";
import useForm from "./../hooks/useForm";
import useAuth from "../hooks/useAuth";
import Spinner from "./../components/Spinner/Spinner";
import { useRouter } from "next/router";
import Dashboard from "./../components/Dashboard/Dashboard";

export default function AllForms() {
  const { user } = useAuth({ redirectTo: "/" });
  const { push } = useRouter();
  const { formsJSON, formsJSONLoading, onDeleteFormJSON, formJSONError } =
    useForm();

  if (!user)
    return (
      <Spinner
        styles={{ position: "fixed", inset: 0 }}
        message="Getting Your Requested Page..."
      />
    );

  return (
    <Dashboard>
      <section className="all-forms">
        <div className="all-forms-wrapper">
          <div className="all-forms-single" onClick={() => push("/NewForm")}>
            <i className="fa fa-2x fa-fw fa-file-o"></i>
            <span>New</span>
          </div>

          {formsJSONLoading && (
            <div className="d-flex justify-content-center align-items-center">
              <i className="fa fa-spinner fa-spin"></i>
            </div>
          )}
          {!!formsJSON?.length &&
            formsJSON?.map((form) => (
              <div className="all-forms-single" key={form.formId}>
                <i className="fa fa-2x fa-fw fa-newspaper-o"></i>
                <Dropdown path={form.formId} onDelete={onDeleteFormJSON} />
                <span>{form.formTitle}</span>
              </div>
            ))}
        </div>
      </section>
    </Dashboard>
  );
}
