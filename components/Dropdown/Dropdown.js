import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useForm } from "./../../context/CreateFormContext";
import { formsService } from "../../services/formsService";
import { errorToast, successToast } from "./../../utils/utils";
// import { useDispatch } from "react-redux";
// import { deleteForm } from "../../store/formSlice";

const Dropdown = ({ path }) => {
  const [show, setShow] = useState(false);
  const { removeFormsJSON } = useForm();
  const [deleteFormLoading, setDeleteFormLoading] = useState(false);

  const handleDropdown = () => setShow((prevState) => !prevState);

  const handleDelete = async (e, path) => {
    e.preventDefault();
    setDeleteFormLoading(true);
    try {
      const res = await axios.delete(`${formsService.deleteForm}/${path}`);
      if (res.status === 200) {
        setDeleteFormLoading(false);
        removeFormsJSON(path);
        successToast("Form Deleted Successfully");
      }
      console.log({ res });
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
            <Link href={`/PublishedForm/${path}`}>
              <a className="all-forms-dropdown-link">View</a>
            </Link>
          </li>
          <li className="all-forms-dropdown-list">
            <Link href={`/EditForm/${path}`}>
              <a className="all-forms-dropdown-link">Edit</a>
            </Link>
          </li>
          <li className="all-forms-dropdown-list">
            <Link href={`/PublishedForm/${path}`}>
              <a className="all-forms-dropdown-link">Published Link</a>
            </Link>
          </li>
          <li className="all-forms-dropdown-list">
            <Link href="">
              <a
                className="all-forms-dropdown-link"
                onClick={(e) => handleDelete(e, path)}
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
