import Dropdown from "../Dropdown/Dropdown";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formsService } from "./../../services/formsService";
import { errorToast } from "../../utils/utils";
import axios from "axios";
import { useForm } from "../../context/CreateFormContext";

export default function AllForms() {
  const { push } = useRouter();
  const { formsJSON, formsJSONLoading } = useForm();

  return (
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
              <Dropdown path={form.formId} />
              <span>{form.formTitle}</span>
            </div>
          ))}
      </div>
    </section>
  );
}
