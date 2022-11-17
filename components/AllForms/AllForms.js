import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { deleteForm } from "../../store/formSlice";
import Dropdown from "../Dropdown/Dropdown";
import axios from "axios";
import { useForm } from "../../context/CreateFormContext";

export default function AllForms() {
  // const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { addFormsJSON, formsJSON } = useForm();

  // const forms = useSelector((state) => state.allForms.forms);

  useEffect(() => {
    const getForms = async () => {
      if (formsJSON.length === 0) {
        setLoading(true);
        try {
          const { data } = await axios.get("/api/getForms");
          console.log(data);
          setLoading(false);
          // setForms(data?.forms);
          addFormsJSON(data?.forms);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    };
    getForms();
  }, []);

  return (
    <section className="all-forms">
      <div className="all-forms-wrapper">
        <div className="all-forms-single" onClick={() => push("/CreateForm")}>
          <i className="fa fa-2x fa-fw fa-file-o"></i>
          <span>New</span>
        </div>
        {loading && <span>...</span>}
        {!!formsJSON?.length &&
          formsJSON?.map((form) => (
            <div className="all-forms-single" key={form.formId}>
              <i className="fa fa-2x fa-fw fa-newspaper-o"></i>
              <Dropdown path={form.formId} />
              <span>{form.formTitle}</span>
            </div>
          ))}
      </div>
    </section>
  );
}
