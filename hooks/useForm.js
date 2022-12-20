import { useState, useEffect } from "react";
import { formsService } from "../services/formsService";
import axios from "axios";
import { errorToast } from "../utils/utils";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const useForm = () => {
  const [formsJSON, setFormsJSON] = useState([]);
  const [formsJSONLoading, setFormsJSONLoading] = useState(true);
  const [formJSONError, setFormJSONError] = useState(null);

  const getFormsJSON = async () => {
    // setFormsJSONLoading(true);
    try {
      const { data } = await axios.post(formsService.getForms, {
        user: getUserFromLocalStorage(),
      });
      setFormsJSONLoading(false);
      if (data.forms.length && Array.isArray(data.forms)) {
        setFormsJSON([...data?.forms]);
      }
    } catch (error) {
      console.log(error);
      setFormJSONError(error.message);
      errorToast("There is a problem in fetching forms!!!");
    } finally {
      setFormsJSONLoading(false);
    }
  };

  useEffect(() => {
    getFormsJSON();
  }, []);

  const onDeleteFormJSON = (formId) => {
    setFormsJSON(formsJSON.filter((form) => form.formId !== formId));
  };

  return { formsJSON, formsJSONLoading, formJSONError, onDeleteFormJSON };
};

export default useForm;
