import Dropdown from "./../components/Dropdown/Dropdown";
import useForm from "./../hooks/useForm";
import useAuth from "../hooks/useAuth";
import Spinner from "./../components/Spinner/Spinner";
import { useRouter } from "next/router";
import Dashboard from "./../components/Dashboard/Dashboard";
import { CSVLink, CSVDownload } from "react-csv";

export default function AllForms() {
  const { user } = useAuth({ redirectTo: "/" });
  const { push } = useRouter();
  const { formsJSON, formsJSONLoading, onDeleteFormJSON, formJSONError } =
    useForm();

  // const headers = [
  //   { label: "First Name", key: "firstname" },
  //   { label: "Last Name", key: "lastname" },
  //   { label: "Email", key: "email" },
  // ];

  // const data = [
  //   { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  //   { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  //   { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  // ];

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

          {/* <CSVLink data={data} headers={headers}>
            Download me
          </CSVLink> */}

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
