import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { deleteForm } from "../../store/formSlice";
import Dropdown from "../Dropdown/Dropdown";

const AllForms = () => {
  const { push } = useRouter();
  // const forms = useSelector((state) => state.allForms.forms);

  return (
    <section className="all-forms">
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
};

export default AllForms;
