import React, { useState, useContext } from "react";

export const CreateFormContext = React.createContext({});

export const CreateContextProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [formsJSON, setFormsJSON] = useState([]);

  const addFormsJSON = (forms) => {
    setFormsJSON([...forms]);
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
