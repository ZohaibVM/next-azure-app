import { useState, useEffect } from "react";
import { formsService } from "../services/formsService";
import axios from "axios";
import { errorToast } from "../utils/utils";
import { useRouter } from "next/router";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const useForm = () => {
  const [formsJSON, setFormsJSON] = useState([]);
  const [formsJSONLoading, setFormsJSONLoading] = useState(true);
  const [formJSONError, setFormJSONError] = useState(null);
  const {
    isReady,
    query: { id: userId },
  } = useRouter();

  const getFormsJSON = async () => {
    try {
      const { data } = await axios.post(formsService.getForms, {
        user: userId ? { id: userId } : getUserFromLocalStorage(),
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
    if (isReady) {
      getFormsJSON();
    }
  }, [isReady]);

  const onDeleteFormJSON = (formId) => {
    setFormsJSON(formsJSON.filter((form) => form.formId !== formId));
  };

  return { formsJSON, formsJSONLoading, formJSONError, onDeleteFormJSON };
};

export default useForm;
