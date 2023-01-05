import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { formsService } from "../../services/formsService";
import {
  errorToast,
  getUserFromLocalStorage,
  getUserIdFromLocalStorage,
  successToast,
  exportToExcel,
} from "./../../utils/utils";
// import * as FileSaver from "file-saver";
// import XLSX from "sheetjs-style";

// const ExcelExportData = [
//   {
//     "First Name": "Usama",
//     "Last Name": "Munawar",
//     Designation: "Associate Engineer",
//     Experience: "2 years",
//   },
//   {
//     "First Name": "Usama",
//     "Last Name": "Munawar",
//     Designation: "Associate Engineer",
//     Experience: "2 years",
//   },
//   {
//     "First Name": "Usama",
//     "Last Name": "Munawar",
//     Designation: "Associate Engineer",
//     Experience: "2 years",
//   },
// ];

const Dropdown = ({ path, onDelete }) => {
  const [show, setShow] = useState(false);
  const [deleteFormLoading, setDeleteFormLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const handleDropdown = () => setShow((prevState) => !prevState);

  const handleDelete = async (e) => {
    e.preventDefault();
    setDeleteFormLoading(true);
    try {
      const res = await axios.post(`${formsService.deleteForm}/${path}`, {
        user: getUserFromLocalStorage(),
      });
      if (res.status === 200) {
        setDeleteFormLoading(false);
        onDelete(path);
        successToast("Form Deleted Successfully");
      }
    } catch (error) {
      setDeleteFormLoading(false);
      errorToast(error.message);
      console.log(error);
    }
  };

  const handleExport = async (e) => {
    e.preventDefault();

    try {
      setExportLoading(true);
      const res = await axios.post(formsService.getformSubmissions, {
        user: { ...getUserFromLocalStorage(), formId: path },
      });
      if (res.status === 200) {
        const newData = res?.data?.formsData?.map((form) => {
          const {
            id,
            formId,
            userId,
            _attachments,
            _etag,
            _rid,
            _self,
            _ts,
            ...rest
          } = form;
          return {
            ...rest,
            ...(rest.multichoice && {
              multichoice: rest.multichoice.reduce(
                (prev, curr) => (prev = prev + curr + ", "),
                ""
              ),
            }),
          };
        });

        console.log(newData);

        exportToExcel(newData, "Forms");
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <>
      <i
        onClick={handleDropdown}
        className="all-forms-icon fa fa-chevron-down"
      ></i>
      {show && (
        <ul className="all-forms-dropdown">
          <li className="all-forms-dropdown-list">
            <Link
              href={`/PublishedForm/?id=${getUserIdFromLocalStorage()}&formId=${path}`}
            >
              <a className="all-forms-dropdown-link">View</a>
            </Link>
          </li>
          <li className="all-forms-dropdown-list">
            <Link href={`/EditForm/?formId=${path}`}>
              <a className="all-forms-dropdown-link">Edit</a>
            </Link>
          </li>
          <li className="all-forms-dropdown-list">
            <Link href={`/PublishedForm/?formId=${path}`}>
              <a className="all-forms-dropdown-link">Published Link</a>
            </Link>
          </li>
          <li className="all-forms-dropdown-list">
            <Link href="">
              <a
                className="all-forms-dropdown-link"
                onClick={(e) => handleDelete(e)}
              >
                Delete{" "}
                {deleteFormLoading && <i className="fa fa-spinner fa-spin"></i>}
              </a>
            </Link>
          </li>
          <li className="all-forms-dropdown-list">
            <Link href="">
              <a
                className="all-forms-dropdown-link"
                onClick={(e) => handleExport(e)}
              >
                Export to Excel{" "}
                {exportLoading && <i className="fa fa-spinner fa-spin"></i>}
              </a>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Dropdown;
