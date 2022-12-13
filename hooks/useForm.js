import { useState, useEffect } from "react";
import { formsService } from "../services/formsService";
import axios from "axios";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const useForm = () => {
  const [formsJSON, setFormsJSON] = useState([]);
  const [formsJSONLoading, setFormsJSONLoading] = useState(false);

  const getFormsJSON = async () => {
    setFormsJSONLoading(true);
    try {
      const { data } = await axios.post(formsService.getForms, {
        user: getUserFromLocalStorage(),
      });
      setFormsJSONLoading(false);
      if (data.forms.length && Array.isArray(data.forms)) {
        setFormsJSON([...data?.forms]);
      }
    } catch (error) {
      setFormsJSONLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getFormsJSON();
  }, []);

  const onDeleteFormJSON = (formId) => {
    setFormsJSON(formsJSON.filter((form) => form.formId !== formId));
  };

  return { formsJSON, formsJSONLoading, onDeleteFormJSON };
};

export default useForm;
