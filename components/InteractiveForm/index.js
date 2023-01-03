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
    setFormSubmissionLoading(true);

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

      for (const key in values) {
        formData[key] = values[key].value;
      }

      formData.id = uuidv4();
      formData.userId = id;
      formData.formId = formId;

      try {
        const res = await axios.post(formsService.formSubmissions, {
          formData,
        });
        if (res.status === 200) {
          const valuesClone = { ...values };
          for (const key in valuesClone) {
            valuesClone = {
              ...valuesClone,
              [key]: { ...valuesClone[key], value: "" },
            };
          }

          console.log({ valuesClone });
          setValues(valuesClone);
          successToast("Form Submitted SuccessFully");
          // setSuccess(true);
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
                    value={values[`${id}-addressline1`]?.value}
                    name={`${id}-addressline1`}
                    type="text"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses(`${id}-addressline1`)}
                    labelAlign={labelAlignment}
                    placeholder="Address line 1 *"
                  />
                  {values[`${id}-addressline1`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-addressline2`]?.value}
                      name={`${id}-addressline2`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-addressline2`)}
                      labelAlign={labelAlignment}
                      placeholder="Address line 2"
                    />
                  </div>
                  {values[`${id}-addressline2`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-city`]?.value}
                      name={`${id}-city`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-city`)}
                      labelAlign={labelAlignment}
                      placeholder="City *"
                    />
                  </div>
                  {values[`${id}-city`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-state`]?.value}
                      name={`${id}-state`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-state`)}
                      labelAlign={labelAlignment}
                      placeholder="State *"
                    />
                  </div>
                  {values[`${id}-state`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-country`]?.value}
                      name={`${id}-country`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-country`)}
                      labelAlign={labelAlignment}
                      placeholder="Country *"
                    />
                  </div>
                  {values[`${id}-country`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-zipcode`]?.value}
                      name={`${id}-zipcode`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-zipcode`)}
                      labelAlign={labelAlignment}
                      placeholder="Zipcode *"
                    />
                  </div>
                  {values[`${id}-zipcode`]?.error && (
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
                      value={values[`${id}-prefix`]?.value}
                      name={`${id}-prefix`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-prefix`)}
                      labelAlign={labelAlignment}
                      placeholder="Prefix *"
                    />
                  </div>
                  {values[`${id}-prefix`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-firstname`]?.value}
                      name={`${id}-firstname`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-firstname`)}
                      labelAlign={labelAlignment}
                      placeholder="First Name *"
                    />
                  </div>
                  {values[`${id}-firstname`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-middlename`]?.value}
                      name={`${id}-middlename`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-middlename`)}
                      labelAlign={labelAlignment}
                      placeholder="Middle Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-lastname`]?.value}
                      name={`${id}-lastname`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-lastname`)}
                      labelAlign={labelAlignment}
                      placeholder="Last Name *"
                    />
                  </div>
                  {values[`${id}-lastname`]?.error && (
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
                      value={values[`${id}-areacode`]?.value}
                      name={`${id}-areacode`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-areacode`)}
                      labelAlign={labelAlignment}
                      placeholder="Area Code *"
                    />
                  </div>
                  {values[`${id}-areacode`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-phonenumber`]?.value}
                      name={`${id}-phonenumber`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-phonenumber`)}
                      labelAlign={labelAlignment}
                      placeholder="Phone Number *"
                    />
                  </div>
                  {values[`${id}-phonenumber`]?.error && (
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
                      value={values[`${id}-email`]?.value}
                      name={`${id}-email`}
                      type="email"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-email`)}
                      labelAlign={labelAlignment}
                      placeholder="Email *"
                    />
                  </div>
                  {values[`${id}-email`]?.error && (
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
                      value={values[`${id}-hours`]?.value}
                      name={`${id}-hours`}
                      type="number"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-hours`)}
                      labelAlign={labelAlignment}
                      placeholder="Hours *"
                    />
                  </div>
                  {values[`${id}-hours`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-minutes`]?.value}
                      type="number"
                      name={`${id}-minutes`}
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-minutes`)}
                      labelAlign={labelAlignment}
                      placeholder="Minutes *"
                    />
                  </div>
                  {values[`${id}-minutes`]?.error && (
                    <p className="form-error-message">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      This Field Is Required.
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="form-input-wrapper">
                    <FormInput
                      value={values[`${id}-period`]?.value}
                      name={`${id}-period`}
                      type="number"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-period`)}
                      labelAlign={labelAlignment}
                      placeholder="Period *"
                    />
                  </div>
                  {values[`${id}-period`]?.error && (
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
                      value={values[`${id}-date`]?.value}
                      name={`${id}-date`}
                      type="date"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-date`)}
                      labelAlign={labelAlignment}
                      placeholder="Date *"
                    />
                  </div>
                  {values[`${id}-date`]?.error && (
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
                      value={values[`${id}-integar`]?.value}
                      name={`${id}-integar`}
                      // type="date"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-integar`)}
                      labelAlign={labelAlignment}
                      placeholder="Integar *"
                    />
                  </div>
                  {values[`${id}-integar`]?.error && (
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
                      value={values[`${id}-decimel`]?.value}
                      name={`${id}-decimel`}
                      type="text"
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-decimel`)}
                      labelAlign={labelAlignment}
                      placeholder="Decimel *"
                    />
                  </div>
                  {values[`${id}-decimel`]?.error && (
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
                      value={values[`${id}-longtext`]?.value}
                      type="textarea"
                      name={`${id}-longtext`}
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-longtext`)}
                      labelAlign={labelAlignment}
                      placeholder="Long Text *"
                    />
                  </div>
                  {values[`${id}-longtext`]?.error && (
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
                      value={values[`${id}-shorttext`]?.value}
                      type="text"
                      name={`${id}-shorttext`}
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-shorttext`)}
                      labelAlign={labelAlignment}
                      placeholder="Short Text *"
                    />
                  </div>
                  {values[`${id}-shorttext`]?.error && (
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
                            className={renderInputClasses(`${id}-multichoice`)}
                            name={`${id}-multichoice`}
                            value={option.value}
                            // checked={option.checked}
                            onChange={(e) => handleChange(e, index)}
                          />
                          <label htmlFor="">{option.title}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {values[`${id}-multichoice`]?.error && (
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
                            className={renderInputClasses(`${id}-singlechoice`)}
                            type="radio"
                            name={`${id}-singlechoice`}
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
                  {values[`${id}-singlechoice`]?.error && (
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
                      name={`${id}-dropdown`}
                      onChange={handleChange}
                      formStyle={inputStyle}
                      className={renderInputClasses(`${id}-dropdown`)}
                      labelAlign={labelAlignment}
                      placeholder="Dropdown *"
                    />
                  </div>
                  {values[`${id}-dropdown`]?.error && (
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
                                value={values?.emailMandatory?.value}
                                type="text"
                                name="emailMandatory"
                                onChange={handleChange}
                                formStyle={inputStyle}
                                className={renderInputClasses("email")}
                                labelAlign={labelAlignment}
                                placeholder="Your Email *"
                              />
                              {values?.emailMandatory?.error && (
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
              <button className="form-submit-btn" onClick={() => push("/")}>
                <i className="fa fa-long-arrow-left"></i> Go Back
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Form;
