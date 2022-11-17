import React, { useState, useEffect, useContext } from "react";
export const FormContext = React.createContext({});

export const FormContextProvider = ({ children }) => {
  const [forms, setForms] = useState([]);

  const addForms = (forms) => {
    setForms([...forms]);
  };

  return (
    <FormContext.Provider
      value={{
        forms,
        addForms,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// export const useForm = () => {
//   return useContext(FormContext);
// };
