import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { formsService } from "./../services/formsService";

export const CreateFormContext = React.createContext({});

export const CreateContextProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [formsJSON, setFormsJSON] = useState([]);
  const [formsJSONLoading, setFormsJSONLoading] = useState(false);

  useEffect(() => {
    const getFormsJSON = async () => {
      setFormsJSONLoading(true);
      try {
        const { data } = await axios.get(formsService.getForms);
        setFormsJSONLoading(false);
        if (data.forms.length && Array.isArray(data.forms)) {
          setFormsJSON([...data?.forms]);
        }
      } catch (error) {
        setFormsJSONLoading(false);
        console.log(error);
      }
    };

    getFormsJSON();
  }, []);

  const addFormsJSON = (newForm) => {
    const existingFormIndex = formsJSON.findIndex(
      (form) => form.formId === newForm.formId
    );
    if (existingFormIndex >= 0) {
      const formsJSONClone = [...formsJSON];
      formsJSONClone[existingFormIndex] = newForm;
      setFormsJSON([...formsJSONClone]);
      return;
    }
    setFormsJSON((prevForms) => [...prevForms, newForm]);
  };

  const removeFormsJSON = (formId) => {
    setFormsJSON(formsJSON.filter((form) => form.formId !== formId));
  };

  const onAddForm = (form) => {
    const newFormId = forms.findIndex((frm) => frm.formId === form.formId);
    if (newFormId >= 0) {
      const formsClone = [...forms];
      formsClone[newFormId] = { ...form };
      setForms([...formsClone]);
      return;
    }
    setForms((prevForms) => {
      return [...prevForms, form];
    });
  };

  return (
    <CreateFormContext.Provider
      value={{
        forms,
        onAddForm,
        formsJSON,
        formsJSONLoading,
        addFormsJSON,
        removeFormsJSON,
      }}
    >
      {children}
    </CreateFormContext.Provider>
  );
};

export const useForm = () => {
  return useContext(CreateFormContext);
};
