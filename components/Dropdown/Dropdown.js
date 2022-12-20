import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { formsService } from "../../services/formsService";
import {
  errorToast,
  getUserFromLocalStorage,
  successToast,
} from "./../../utils/utils";

const Dropdown = ({ path, onDelete }) => {
  const [show, setShow] = useState(false);
  const [deleteFormLoading, setDeleteFormLoading] = useState(false);

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

  return (
    <>
      <i
        onClick={handleDropdown}
        className="all-forms-icon fa fa-chevron-down"
      ></i>
      {show && (
        <ul className="all-forms-dropdown">
          <li className="all-forms-dropdown-list">
            <Link href={`/PublishedForm/?formId=${path}`}>
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
        </ul>
      )}
    </>
  );
};

export default Dropdown;
