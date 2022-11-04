import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { deleteForm } from "../../store/formSlice";
import Dropdown from "../Dropdown/Dropdown";

export default function AllForms() {
  const [message, setMessage] = useState("");
  const { push } = useRouter();
  // const forms = useSelector((state) => state.allForms.forms);
  useEffect(() => {
    const apiCall = () => {
      const res = fetch("http://localhost:7071/api/dummy-func")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setMessage(res?.message);
        })
        .catch((err) => {
          console.log(err);
        });
      // const messages = res.json();
      // console.log({ messages });
    };
    apiCall();
  }, []);

  return (
    <section className="all-forms">
      <div>{message}</div>
      <div className="all-forms-wrapper">
        <div className="all-forms-single" onClick={() => push("/CreateForm")}>
          <i className="fa fa-2x fa-fw fa-file-o"></i>
          <span>New</span>
        </div>
        {/* {!!forms.length &&
          forms.map((form) => (
            <div className="all-forms-single" key={form.formId}>
              <i className="fa fa-2x fa-fw fa-newspaper-o"></i>
              <Dropdown path={form.formId} />
              <span>{form.formTitle}</span>
            </div>
          ))} */}
      </div>
    </section>
  );
}
