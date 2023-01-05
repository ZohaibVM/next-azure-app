import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  initialValues,
  checkboxInitialValues,
  radioInitialValues,
  mapFormState,
  errorToast,
  successToast,
} from "../../utils/utils";
import FormInput from "../../shared/FormInput";
import useTheme from "../../hooks/useTheme";
import useForm from "./../../hooks/useForm";
import Spinner from "./../Spinner/Spinner";
import { formsService } from "../../services/formsService";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Form = () => {
  const [formSubmissionLoading, setFormSubmissionLoading] = useState(false);
  const {
    push,
    query: { formId, id },
  } = useRouter();

  const { formsJSON, formsJSONLoading } = useForm();

  const singleForm = formsJSON.length
    ? formsJSON.find((form) => form.formId === formId)
    : {};

  useEffect(() => {
    // if singleForm not found
    if (!singleForm) {
      errorToast("404: Form Not Found");
      push("/Notfound");
      return;
    }

    // init form state after fetch
    if (Object.keys(singleForm).length) {
      setValues(mapFormState(singleForm));
      return;
    }
  }, [singleForm, push]);

  const [values, setValues] = useState({});
  const [success, setSuccess] = useState(false);
  const validated = useRef(false);

  useEffect(() => {
    for (const key in values) {
      if (values[key].value && values[key].value.length && values[key].error) {
        // hide error if exists
        setValues((prevState) => {
          return {
            ...prevState,
            [key]: { ...prevState[key], error: false },
          };
        });
      }
    }

    const isValidated = Object.values(values)
      .filter((val) => val.required)
      .every((val) => val.value.length && val.error === false);

    validated.current = isValidated;
  }, [values]);

  const {
    selectedTheme: {
      pageBgColor,
      pageBgImg,
      formBgColor,
      formBgImg,
      formWidth,
      labelAlignment,
      inputStyle,
      fontColor,
    },
  } = useTheme();

  const getValue = (fieldTitle, elementId) => {
    switch (fieldTitle) {
      case "Street Address":
        return values?.[`${elementId}-addressline1`]?.value;
      case "Street Address Line 2":
        return values?.[`${elementId}-addressline2`]?.value;
      case "City":
        return values?.[`${elementId}-city`]?.value;
      case "State/Province":
        return values?.[`${elementId}-state`]?.value;
      case "Postal/Zipcode":
        return values?.[`${elementId}-zipcode`]?.value;
      case "Country":
        return values?.[`${elementId}-country`]?.value;
      case "Prefix":
        return values?.[`${elementId}-prefix`]?.value;
      case "First Name":
        return values?.[`${elementId}-firstname`]?.value;
      case "Middle Name":
        return values?.[`${elementId}-middlename`]?.value;
      case "Last Name":
        return values?.[`${elementId}-lastname`]?.value;
      case "Area Code":
        return values?.[`${elementId}-areacode`]?.value;
      case "Phone Number":
        return values?.[`${elementId}-phonenumber`]?.value;
      case "Hours":
        return values?.[`${elementId}-hours`]?.value;
      case "Minutes":
        return values?.[`${elementId}-minutes`]?.value;
      case "Period":
        return values?.[`${elementId}-period`]?.value;
      case "Email Address":
        return values?.[`${elementId}-email`]?.value;
      case "Date":
        return values?.[`${elementId}-date`]?.value;
      case "Integer":
        return values?.[`${elementId}-integar`]?.value;
      case "Decimel":
        return values?.[`${elementId}-decimel`]?.value;
      case "Long Text":
        return values?.[`${elementId}-longtext`]?.value;
      case "Short Text":
        return values?.[`${elementId}-shorttext`]?.value;
      case "File Upload":
        return values?.[`${elementId}-fileupload`]?.value;
      case "Multichoice":
        return values?.[`${elementId}-multichoice`]?.value;
      case "Singlechoice":
        return values?.[`${elementId}-singlechoice`]?.value;
      case "Dropdown":
        return values?.[`${elementId}-dropdown`]?.value;
      case "Scale Rating":
        return "";
      case "Signature":
        return "";

      default:
        break;
    }
  };

  const getJSON = () => {
    const formSections = singleForm?.sections.map((section) => {
      return {
        sectionId: section.sectionId,
        sectionTitle: section.sectionTitle,
        sectionDescription: section.sectionDescription,
        isFirstSection: section.isFirstSection,
        elements: [
          ...section.elements.map((element) => {
            return {
              id: element.id,
              elementType: element.elementType,
              elementTitle: element.elementTitle,
              elementDescription: element.elementDescription,
              isMultiFieldElement: element.isMultiFieldElement,
              isRequired: element.isRequired,
              isPrimary: element.isPrimary,
              isVisible: element.isVisible,
              isTemplateElement: element.isTemplateElement,
              ...(element.fields &&
                element.fields.length && {
                  fields: [
                    ...element.fields.map((field) => {
                      return {
                        order: field.order,
                        fieldTitle: field.fieldTitle,
                        isVisible: field.isVisible,
                        isRequired: field.isRequired,
                        fieldType: field.fieldType,
                        ...(field.fieldType === "dropdown" && {
                          isMultiSelect: field.isMultiSelect,
                          options: [...field.options],
                        }),
                        placeholder: field.placeholder,
                        defaultValue: field.defaultValue,
                        value: getValue(field.fieldTitle, element.id),
                      };
                    }),
                  ],
                }),
              ...(!element.fields && {
                fields: null,
              }),
            };
          }),
        ],
      };
    });

    const formObj = [
      {
        formId: singleForm.formId,
        formTitle: singleForm.formTitle,
        formDescription: "",
        creationDate: Date.now(),
        lastUpdateDate: null,
        sections: [...formSections],
      },
    ];

    return formObj;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in values) {
      // show error if string || array.length is falsy
      if (!values[key].value || !values[key].value.length) {
        // check if field is 'required'
        if (values[key].required) {
          setValues((prevState) => {
            return {
              ...prevState,
              [key]: { ...prevState[key], error: true },
            };
          });
        }
      }
    }

    if (validated.current) {
      console.log(values);
      // const formJSON = getJSON();
      // console.log({ formJSON });

      const formData = {};
      const elements = [
        "addressline1",
        "addressline2",
        "city",
        "country",
        "state",
        "zipcode",
        "email",
        "decimel",
        "integar",
        "hours",
        "minutes",
        "period",
        "longtext",
        "shorttext",
        "fileupload",
        "firstname",
        "lastname",
        "middlename",
        "prefix",
        "areacode",
        "phonenumber",
        "date",
        "singlechoice",
        "dropdown",
        "multichoice",
        "mandatoryemail",
      ];

      for (const key in values) {
        let splitKey = key.split("_");
        let newKeyName = splitKey[1];

        if (elements.includes(newKeyName)) {
          if (newKeyName in formData) {
            let count = Object.keys(formData).filter(
              (k) => k === newKeyName
            ).length;
            formData[`${newKeyName}-${count + 1}`] = values[key].value;
          } else {
            formData[newKeyName] = values[key].value;
          }
        }
      }

      formData.id = uuidv4();
      formData.userId = id;
      formData.formId = formId;

      console.log({ formData });

      try {
        setFormSubmissionLoading(true);
        const res = await axios.post(formsService.formSubmissions, {
          formData,
        });
        if (res.status === 200) {
          // const valuesClone = { ...values };
          // for (const key in valuesClone) {
          //   valuesClone = {
          //     ...valuesClone,
          //     [key]: { ...valuesClone[key], value: "" },
          //   };
          // }

          // console.log({ valuesClone });
          // setValues(valuesClone);
          successToast("Form Submitted SuccessFully");
          setSuccess(true);
        }
      } catch (error) {
        errorToast(error.message);
      } finally {
        setFormSubmissionLoading(false);
      }
    }
  };

  const handleChange = ({ target }, index) => {
    const { name, value } = target;
    if (name.includes("multichoice")) {
      setValues({
        ...values,
        [name]: {
          ...values[name],
          value: target.checked
            ? [...values[name].value, value]
            : [...values[name].value.filter((v) => v !== value)],
        },
      });
      return;
    }
    if (name.includes("singlechoice")) {
      setValues({
        ...values,
        [name]: {
          ...values[name],
          value,
        },
      });
      return;
    }
    if (name.includes("integar")) {
      setValues({
        ...values,
        [name]: { ...values[name], value: value.replace(/\D/g, "") },
      });
      return;
    }
    if (name.includes("decimel")) {
      if (!value || value.match(/^\d{1,}(\.\d{0,4})?$/)) {
        setValues({ ...values, [name]: { ...values[name], value } });
      }
      return;
    }

    setValues({ ...values, [name]: { ...values[name], value } });
  };

  const renderInputClasses = (name) => {
    if (name.includes("email")) {
      return values[name]?.error ? "form-email error" : "form-email";
    }
    if (name.includes("date")) {
      return values[name]?.error ? "form-date error" : "form-date";
    }
    if (name.includes("longtext")) {
      return values[name]?.error ? "form-longtext error" : "form-longtext";
    }
    if (name.includes("multichoice") || name.includes("singlechoice")) {
      return values[name]?.error ? "form-choice error" : "form-choice";
    }
    if (name.includes("dropdown")) {
      return values[name]?.error ? "form-dropdown error" : "form-dropdown";
    }
    if (name.includes("fileupload")) {
      return values[name]?.error ? "form-upload error" : "form-upload";
    }

    return values[name]?.error ? "form-textbox error" : "form-textbox";
  };

  const renderJSX = ({
    id,
    elementType,
    elementTitle,
    elementDescription,
    isVisible,
    ...rest
  }) => {
    switch (elementType) {
      case "heading":
        return (
          <h3 key={id} className="form-title mb-4" style={{ color: fontColor }}>
            {elementTitle} <span>{elementDescription}</span>
          </h3>
        );
      case "address":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <FormInput
                    value={values[`${id}_addressline1`]?.value}
                    name={`${id}_addressline1`}
                    type="text"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses(`${id}_addressline1`)}
                    labelAlign={labelAlignment}
                    placeholder="Address line 1 *"
                  />
                  {values[`${id}_addressline1`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_addressline2`]?.value}
                      name={`${id}_addressline2`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_addressline2`)}
                      labelAlign={labelAlignment}
                      placeholder="Address line 2"
                    />
                  </div>
                  {values[`${id}_addressline2`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_city`]?.value}
                      name={`${id}_city`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_city`)}
                      labelAlign={labelAlignment}
                      placeholder="City *"
                    />
                  </div>
                  {values[`${id}_city`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_state`]?.value}
                      name={`${id}_state`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_state`)}
                      labelAlign={labelAlignment}
                      placeholder="State *"
                    />
                  </div>
                  {values[`${id}_state`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_country`]?.value}
                      name={`${id}_country`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_country`)}
                      labelAlign={labelAlignment}
                      placeholder="Country *"
                    />
                  </div>
                  {values[`${id}_country`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_zipcode`]?.value}
                      name={`${id}_zipcode`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_zipcode`)}
                      labelAlign={labelAlignment}
                      placeholder="Zipcode *"
                    />
                  </div>
                  {values[`${id}_zipcode`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "full name":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_prefix`]?.value}
                      name={`${id}_prefix`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_prefix`)}
                      labelAlign={labelAlignment}
                      placeholder="Prefix *"
                    />
                  </div>
                  {values[`${id}_prefix`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_firstname`]?.value}
                      name={`${id}_firstname`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_firstname`)}
                      labelAlign={labelAlignment}
                      placeholder="First Name *"
                    />
                  </div>
                  {values[`${id}_firstname`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_middlename`]?.value}
                      name={`${id}_middlename`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_middlename`)}
                      labelAlign={labelAlignment}
                      placeholder="Middle Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_lastname`]?.value}
                      name={`${id}_lastname`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_lastname`)}
                      labelAlign={labelAlignment}
                      placeholder="Last Name *"
                    />
                  </div>
                  {values[`${id}_lastname`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "phone number":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_areacode`]?.value}
                      name={`${id}_areacode`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_areacode`)}
                      labelAlign={labelAlignment}
                      placeholder="Area Code *"
                    />
                  </div>
                  {values[`${id}_areacode`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_phonenumber`]?.value}
                      name={`${id}_phonenumber`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_phonenumber`)}
                      labelAlign={labelAlignment}
                      placeholder="Phone Number *"
                    />
                  </div>
                  {values[`${id}_phonenumber`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "email address":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_email`]?.value}
                      name={`${id}_email`}
                      type="email"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_email`)}
                      labelAlign={labelAlignment}
                      placeholder="Email *"
                    />
                  </div>
                  {values[`${id}_email`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "time":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_hours`]?.value}
                      name={`${id}_hours`}
                      type="number"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_hours`)}
                      labelAlign={labelAlignment}
                      placeholder="Hours *"
                    />
                  </div>
                  {values[`${id}_hours`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_minutes`]?.value}
                      type="number"
                      name={`${id}_minutes`}
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_minutes`)}
                      labelAlign={labelAlignment}
                      placeholder="Minutes *"
                    />
                  </div>
                  {values[`${id}_minutes`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_period`]?.value}
                      name={`${id}_period`}
                      type="number"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_period`)}
                      labelAlign={labelAlignment}
                      placeholder="Period *"
                    />
                  </div>
                  {values[`${id}_period`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "date":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_date`]?.value}
                      name={`${id}_date`}
                      type="date"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_date`)}
                      labelAlign={labelAlignment}
                      placeholder="Date *"
                    />
                  </div>
                  {values[`${id}_date`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "integer":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_integar`]?.value}
                      name={`${id}_integar`}
                      // type="date"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_integar`)}
                      labelAlign={labelAlignment}
                      placeholder="Integar *"
                    />
                  </div>
                  {values[`${id}_integar`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "decimal":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_decimel`]?.value}
                      name={`${id}_decimel`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_decimel`)}
                      labelAlign={labelAlignment}
                      placeholder="Decimel *"
                    />
                  </div>
                  {values[`${id}_decimel`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "long text":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_longtext`]?.value}
                      type="textarea"
                      name={`${id}_longtext`}
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_longtext`)}
                      labelAlign={labelAlignment}
                      placeholder="Long Text *"
                    />
                  </div>
                  {values[`${id}_longtext`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "short text":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}_shorttext`]?.value}
                      type="text"
                      name={`${id}_shorttext`}
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_shorttext`)}
                      labelAlign={labelAlignment}
                      placeholder="Short Text *"
                    />
                  </div>
                  {values[`${id}_shorttext`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "multiple choice":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <div className="form-choice-wrapper">
                      {rest?.fields?.[0]?.options?.map((option, index) => (
                        <div key={index} className="form-choice-row">
                          <input
                            type="checkbox"
                            className={renderInputClasses(`${id}_multichoice`)}
                            name={`${id}_multichoice`}
                            value={option.value}
                            // checked={option.checked}
                            onChange={(e) => handleChange(e, index)}
                          />
                          <label htmlFor="">{option.title}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {values[`${id}_multichoice`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "single choice":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <div className="form-choice-wrapper">
                      {rest?.fields?.[0]?.options?.map((radio, index) => (
                        <div className="form-choice-row" key={index}>
                          <input
                            className={renderInputClasses(`${id}_singlechoice`)}
                            type="radio"
                            name={`${id}_singlechoice`}
                            // checked={radio.checked}
                            value={radio.value}
                            onChange={(e) => handleChange(e, index)}
                            style={{
                              visibility: "visible",
                              position: "static",
                            }}
                          />
                          <label>{radio.title}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {values[`${id}_singlechoice`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "file upload":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <div className="form-upload-wrapper">
                      <label
                        htmlFor="form-upload"
                        className="form-upload-label"
                      >
                        <i className="fa fa-cloud-upload"></i> Upload here
                      </label>
                      <input
                        className={renderInputClasses("fileupload")}
                        id="form-upload"
                        type="file"
                        name="fileupload"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        );
      case "dropdown":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      // value={rest?.fields?.[0]?.options}
                      options={rest?.fields?.[0]?.options}
                      type="dropdown"
                      name={`${id}_dropdown`}
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}_dropdown`)}
                      labelAlign={labelAlignment}
                      placeholder="Dropdown *"
                    />
                  </div>
                  {values[`${id}_dropdown`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        );
      case "scale rating":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    {/* <label className="form-label">Name</label> */}
                  </div>
                  {/* <p className="form-error-message">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        This Field Is Required.
      </p> */}
                </div>
              </div>
            </div>
          )
        );
      case "signature":
        return (
          isVisible && (
            <div key={id} className="form-card">
              <h5 className="form-title-small" style={{ color: fontColor }}>
                {elementTitle}
              </h5>
              <h6 className="form-subtitle" style={{ color: fontColor }}>
                {elementDescription}
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    {/* <label className="form-label">Name</label> */}
                  </div>
                  {/* <p className="form-error-message">
        <i className="fa fa-info-circle" aria-hidden="true"></i>
        This Field Is Required.
      </p> */}
                </div>
              </div>
            </div>
          )
        );
      default:
        return "element type didn't match";
    }
  };

  return (
    <>
      {formsJSONLoading && (
        <Spinner message="Getting Form Data Please Wait..." />
      )}
      {!formsJSONLoading && singleForm && (
        <div
          className="published-form"
          style={{
            backgroundColor: pageBgImg === null ? pageBgColor : "",
            backgroundImage: pageBgImg ? `url(${pageBgImg})` : "",
          }}
        >
          {!success && (
            <form
              className="form"
              onSubmit={handleSubmit}
              style={{
                width: formWidth,
                maxWidth: formWidth,
                backgroundColor: formBgImg === null ? formBgColor : "",
                backgroundImage: formBgImg ? `url(${formBgImg})` : "",
              }}
            >
              {!!singleForm?.sections?.length &&
                singleForm?.sections.map((section, index) => (
                  <React.Fragment key={index}>
                    <div className="form-header">
                      <h2 className="form-title" style={{ color: fontColor }}>
                        {section.sectionTitle}
                      </h2>
                      <h6
                        className="form-subtitle"
                        style={{ color: fontColor }}
                      >
                        {section.sectionDescription}
                      </h6>
                    </div>
                    <div className="form-content">
                      {index === 0 && singleForm?.isEmailMendatory && (
                        <div className="form-card">
                          <div className="row">
                            <div className="col-md-6">
                              <FormInput
                                value={values?.is_mandatoryemail?.value}
                                type="text"
                                name="is_mandatoryemail"
                                onChange={handleChange}
                                formStyle={inputStyle}
                                className={renderInputClasses(
                                  "is_mandatoryemail"
                                )}
                                labelAlign={labelAlignment}
                                placeholder="Your Email *"
                              />
                              {values?.is_mandatoryemail?.error && (
                                <p className="form-error-message">
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>
                                  This Field Is Required.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {!!section.elements.length &&
                        section.elements.map((element) => renderJSX(element))}
                    </div>
                  </React.Fragment>
                ))}
              <div className="form-footer">
                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={formSubmissionLoading}
                >
                  Submit{" "}
                  {formSubmissionLoading && (
                    <i className="fa fa-spinner fa-spin"></i>
                  )}
                </button>
              </div>
            </form>
          )}
          {success && (
            <div>
              <h1>Thanks your form is submitted</h1>
              {/* <button className="form-submit-btn" onClick={() => push("/")}>
                <i className="fa fa-long-arrow-left"></i> Go Back
              </button> */}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Form;
