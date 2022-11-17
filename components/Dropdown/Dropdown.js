// import { Link } from "react-router-dom";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
// import { deleteForm } from "../../store/formSlice";

const Dropdown = ({ path }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleDropdown = () => setShow((prevState) => !prevState);

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
                  const message = await axios.delete(`/api/deleteForm/${path}`);
                  console.log({ message });
                }}
              >
                Delete
              </a>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Dropdown;
