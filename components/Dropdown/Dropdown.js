// import { Link } from "react-router-dom";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
// import { deleteForm } from "../../store/formSlice";
import { useForm } from "./../../context/CreateFormContext";

const Dropdown = ({ path }) => {
  const [show, setShow] = useState(false);
  const [deleteFormLoading, setDeleteFormLoading] = useState(false);
  // const dispatch = useDispatch();

  const handleDropdown = () => setShow((prevState) => !prevState);
  const { removeFormsJSON, formsJSON } = useForm();

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
                onClick={async (e) => {
                  e.preventDefault();
                  setDeleteFormLoading(true);
                  try {
                    const message = await axios.delete(
                      `/api/deleteForm/${path}`
                    );
                    setDeleteFormLoading(false);
                    removeFormsJSON(path);
                    console.log({ message });
                  } catch (error) {
                    setDeleteFormLoading(false);
                    console.log(error);
                  }
                }}
              >
                Delete
                {deleteFormLoading && <span>...</span>}
              </a>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Dropdown;
