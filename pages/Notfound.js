import { useRouter } from "next/router";
import useTheme from "../hooks/useTheme";

const Notfound = () => {
  const {
    selectedTheme: { pageBgColor, primaryColor },
  } = useTheme();
  const { push } = useRouter();
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: pageBgColor }}
    >
      <h1>404: This page is not found</h1>
      <div className="mt-3">
        <button
          onClick={() => push("/AllForms")}
          className="btn_color_signup btn-block round waves-effect waves-light applicaion-button-save-button-background-color"
          style={{ backgroundColor: primaryColor }}
        >
          <i className="fa fa-long-arrow-left"></i> Back to Home
        </button>
      </div>
    </div>
  );
};

export default Notfound;
