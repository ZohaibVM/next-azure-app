import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import FormInput from "./../../shared/FormInput";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";
import {
  initialValues,
  checkboxInitialValues,
  radioInitialValues,
  dropdownValues,
  mapFormState,
  singleForm,
} from "../../utils/utils";

const Form = () => {
  const { query, push } = useRouter();
  const { formId } = query;

  //   const singleForm = useSelector((state) =>
  //     state.allForms.forms.find((form) => form.formId === formId)
  //   );

  const [values, setValues] = useState(mapFormState(singleForm));
  const [checkedList, setCheckedList] = useState(checkboxInitialValues);
  const [radioList, setRadioList] = useState(radioInitialValues);
  const [dropdownList, setDropdownList] = useState(dropdownValues);
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

  const getValue = (fieldTitle) => {
    switch (fieldTitle) {
      case "Street Address":
        return values.addressline1.value;
      case "Street Address Line 2":
        return values.addressline2.value;
      case "City":
        return values.city.value;
      case "State/Province":
        return values.state.value;
      case "Postal/Zipcode":
        return values.zipcode.value;
      case "Country":
        return values.country.value;
      case "Prefix":
        return values.prefix.value;
      case "First Name":
        return values.firstname.value;
      case "Middle Name":
        return values.middlename.value;
      case "Last Name":
        return values.lastname.value;
      case "Area Code":
        return values.areacode.value;
      case "Phone Number":
        return values.phonenumber.value;
      case "Hours":
        return values.hours.value;
      case "Minutes":
        return values.minutes.value;
      case "Period":
        return values.period.value;
      case "Email Address":
        return values.email.value;
      case "Date":
        return values.date.value;
      case "Integer":
        return values.integar.value;
      case "Decimel":
        return values.decimel.value;
      case "Long Text":
        return values.longtext.value;
      case "Short Text":
        return values.shorttext.value;
      case "Multichoice":
        return values.multichoice.value;
      case "Singlechoice":
        return values.singlechoice.value;
      case "File Upload":
        return values.fileupload.value;
      case "Dropdown":
        return values.dropdown.value;
      case "Scale Rating":
        return "";
      case "Signature":
        return "";

      default:
        break;
    }
  };

  const getJSON = () => {
    const formSections = singleForm.sections.map((section) => {
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
                        value: getValue(field.fieldTitle),
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

  const handleSubmit = (e) => {
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

      // else if (
      //   values[key].value &&
      //   values[key].value.length &&
      //   values[key].error
      // ) {
      //   // hide error if exists
      //   setValues((prevState) => {
      //     return {
      //       ...prevState,
      //       [key]: { ...prevState[key], error: false },
      //     };
      //   });
      // }
    }

    // console.log({ ref: validated.current });
    if (validated.current) {
      const formJSON = getJSON();
      console.log({ formJSON });
      setValues(initialValues);
      setRadioList(radioInitialValues);
      setCheckedList(checkboxInitialValues);
      setSuccess(true);
    }
  };

  const handleChange = ({ target }, index) => {
    const { name, value } = target;
    if (name === "multichoice") {
      const checkedListClone = [...checkedList];
      checkedListClone[index] = {
        ...checkedListClone[index],
        checked: !checkedListClone[index].checked,
      };

      const checkedArray = [];
      for (const item of checkedListClone) {
        if (item.checked) {
          checkedArray.push(item.label);
        }
      }
      setCheckedList(checkedListClone);
      setValues({
        ...values,
        [name]: {
          ...values[name],
          value: checkedArray,
        },
      });
      return;
    }
    if (name === "singlechoice") {
      const newRadioList = radioList.map((radio, mapIndex) => {
        if (index === mapIndex) {
          setValues({
            ...values,
            [name]: { ...values[name], value: radio.value },
          });
          return {
            ...radio,
            checked: true,
          };
        }
        return {
          ...radio,
          checked: false,
        };
      });
      setRadioList(newRadioList);
      return;
    }
    if (name === "integar") {
      setValues({
        ...values,
        [name]: { ...values[name], value: value.replace(/\D/g, "") },
      });
      return;
    }
    if (name === "decimel") {
      if (!value || value.match(/^\d{1,}(\.\d{0,4})?$/)) {
        setValues({ ...values, [name]: { ...values[name], value } });
      }
      return;
    }
    setValues({ ...values, [name]: { ...values[name], value } });
  };

  const renderInputClasses = (name) => {
    if (name === "email") {
      return values[name].error ? "form-email error" : "form-email";
    }
    if (name === "date") {
      return values[name].error ? "form-date error" : "form-date";
    }
    if (name === "longtext") {
      return values[name].error ? "form-longtext error" : "form-longtext";
    }
    if (name === "multichoice" || name === "singlechoice") {
      return values[name].error ? "form-choice error" : "form-choice";
    }
    if (name === "dropdown") {
      return values[name].error ? "form-dropdown error" : "form-dropdown";
    }
    if (name === "fileupload") {
      return values[name].error ? "form-upload error" : "form-upload";
    }

    return values[name].error ? "form-textbox error" : "form-textbox";
  };

  const renderJSX = ({ id, elementType, elementTitle, elementDescription }) => {
    switch (elementType) {
      case "heading":
        return (
          <h3 key={id} className="form-title mb-4" style={{ color: fontColor }}>
            {elementTitle} <span>{elementDescription}</span>
          </h3>
        );
      case "address":
        return (
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
                  value={values.addressline1.value}
                  type="text"
                  name="addressline1"
                  onChange={handleChange}
                  formStyle={inputStyle}
                  className={renderInputClasses("addressline1")}
                  labelAlign={labelAlignment}
                  placeholder="Address line 1 *"
                />
                {values.addressline1.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.addressline2.value}
                    type="text"
                    name="addressline2"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("addressline2")}
                    labelAlign={labelAlignment}
                    placeholder="Address line 2"
                  />
                </div>
                {values.addressline2.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.city.value}
                    type="text"
                    name="city"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("city")}
                    labelAlign={labelAlignment}
                    placeholder="City *"
                  />
                </div>
                {values.city.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.state.value}
                    type="text"
                    name="state"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("state")}
                    labelAlign={labelAlignment}
                    placeholder="State *"
                  />
                </div>
                {values.state.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.country.value}
                    type="text"
                    name="country"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("country")}
                    labelAlign={labelAlignment}
                    placeholder="Country *"
                  />
                </div>
                {values.country.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.zipcode.value}
                    type="text"
                    name="zipcode"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("zipcode")}
                    labelAlign={labelAlignment}
                    placeholder="Zipcode *"
                  />
                </div>
                {values.zipcode.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "full name":
        return (
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
                  <FormInput
                    value={values.prefix.value}
                    type="text"
                    name="prefix"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("prefix")}
                    labelAlign={labelAlignment}
                    placeholder="Prefix *"
                  />
                </div>
                {values.prefix.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.firstname.value}
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("firstname")}
                    labelAlign={labelAlignment}
                    placeholder="First Name *"
                  />
                </div>
                {values.firstname.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.middlename.value}
                    type="text"
                    name="middlename"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("middlename")}
                    labelAlign={labelAlignment}
                    placeholder="Middle Name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.lastname.value}
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("lastname")}
                    labelAlign={labelAlignment}
                    placeholder="Last Name *"
                  />
                </div>
                {values.lastname.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "phone number":
        return (
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
                  <FormInput
                    value={values.areacode.value}
                    type="text"
                    name="areacode"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("areacode")}
                    labelAlign={labelAlignment}
                    placeholder="Area Code *"
                  />
                </div>
                {values.areacode.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.phonenumber.value}
                    type="text"
                    name="phonenumber"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("phonenumber")}
                    labelAlign={labelAlignment}
                    placeholder="Phone Number *"
                  />
                </div>
                {values.phonenumber.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "email address":
        return (
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
                  <FormInput
                    value={values.email.value}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("email")}
                    labelAlign={labelAlignment}
                    placeholder="Email *"
                  />
                </div>
                {values.email.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "time":
        return (
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
                  <FormInput
                    value={values.hours.value}
                    type="number"
                    name="hours"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("hours")}
                    labelAlign={labelAlignment}
                    placeholder="Hours *"
                  />
                </div>
                {values.hours.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.minutes.value}
                    type="number"
                    name="minutes"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("minutes")}
                    labelAlign={labelAlignment}
                    placeholder="Minutes *"
                  />
                </div>
                {values.minutes.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.period.value}
                    type="number"
                    name="period"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("period")}
                    labelAlign={labelAlignment}
                    placeholder="Period *"
                  />
                </div>
                {values.period.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "date":
        return (
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
                  <FormInput
                    value={values.date.value}
                    type="date"
                    name="date"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("date")}
                    labelAlign={labelAlignment}
                    placeholder="Date *"
                  />
                </div>
                {values.date.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "integer":
        return (
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
                  <FormInput
                    value={values.integar.value}
                    // type="date"
                    name="integar"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("integar")}
                    labelAlign={labelAlignment}
                    placeholder="Integar *"
                  />
                </div>
                {values.integar.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "decimal":
        return (
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
                  <FormInput
                    value={values.decimel.value}
                    type="text"
                    name="decimel"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("decimel")}
                    labelAlign={labelAlignment}
                    placeholder="Decimel *"
                  />
                </div>
                {values.decimel.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "long text":
        return (
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
                  <FormInput
                    value={values.longtext.value}
                    type="textarea"
                    name="longtext"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("longtext")}
                    labelAlign={labelAlignment}
                    placeholder="Long Text *"
                  />
                  {/* <textarea
                    className={renderInputClasses("longtext")}
                    placeholder="Long Text"
                    rows="4"
                    name="longtext"
                    value={values.longtext.value}
                    onChange={handleChange}
                  ></textarea> */}
                </div>
                {values.longtext.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "short text":
        return (
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
                  <FormInput
                    value={values.shorttext.value}
                    type="text"
                    name="shorttext"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("shorttext")}
                    labelAlign={labelAlignment}
                    placeholder="Short Text *"
                  />
                </div>
                {values.shorttext.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "multiple choice":
        return (
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
                  <div className="form-choice-wrapper">
                    {/* <label className="form-choice-label">Multichoice</label> */}
                    {checkedList.map((option, index) => (
                      <div key={option.label} className="form-choice-row">
                        <input
                          type="checkbox"
                          className={renderInputClasses("multichoice")}
                          name="multichoice"
                          checked={option.checked}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <label htmlFor="">{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {values.multichoice.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "single choice":
        return (
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
                  <div className="form-choice-wrapper">
                    {radioList.map((radio, index) => (
                      <div className="form-choice-row" key={radio.label}>
                        <input
                          className={renderInputClasses("singlechoice")}
                          type="radio"
                          name="singlechoice"
                          checked={radio.checked}
                          value={radio.value}
                          onChange={(e) => handleChange(e, index)}
                          style={{ visibility: "visible", position: "static" }}
                        />
                        <label>{radio.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {values.singlechoice.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "file upload":
        return (
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

                  <div className="form-upload-wrapper">
                    <label htmlFor="form-upload" className="form-upload-label">
                      <i class="fa fa-cloud-upload"></i> Upload here
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
        );
      case "dropdown":
        return (
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
                  <FormInput
                    value={values.dropdown.value}
                    type="dropdown"
                    name="dropdown"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("dropdown")}
                    labelAlign={labelAlignment}
                    placeholder="Short Text *"
                  />
                  {/* <select
                    name="dropdown"
                    className={renderInputClasses("dropdown")}
                    value={values.dropdown.value}
                    onChange={handleChange}
                  >
                    <option value="">Select dropdown *</option>
                    {dropdownList.map((dropdown) => (
                      <option value={dropdown.value} key={dropdown.value}>
                        {dropdown.label}
                      </option>
                    ))}
                  </select> */}
                </div>
                {values.dropdown.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "scale rating":
        return (
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
        <i class="fa fa-info-circle" aria-hidden="true"></i>
        This Field Is Required.
      </p> */}
              </div>
            </div>
          </div>
        );
      case "signature":
        return (
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
        <i class="fa fa-info-circle" aria-hidden="true"></i>
        This Field Is Required.
      </p> */}
              </div>
            </div>
          </div>
        );
      default:
        return "element type didn't match";
    }
  };

  return (
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
          {!!singleForm.sections.length &&
            singleForm.sections.map((section, index) => (
              <React.Fragment key={index}>
                <div className="form-header">
                  <h2 className="form-title" style={{ color: fontColor }}>
                    {section.sectionTitle}
                  </h2>
                  <h6 className="form-subtitle" style={{ color: fontColor }}>
                    {section.sectionDescription}
                  </h6>
                </div>
                <div className="form-content">
                  {!!section.elements.length &&
                    section.elements.map((element) => renderJSX(element))}
                </div>
              </React.Fragment>
            ))}
          <div className="form-footer">
            <button type="submit" className="form-submit-btn">
              Submit
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
  );
};

export default Form;

const PublishedForm = () => {
  const singleForm = useSelector((state) =>
    state.allForms.forms.find((form) => form.formId === formId)
  );
  const [values, setValues] = useState(mapFormState(singleForm));
  const [checkedList, setCheckedList] = useState(checkboxInitialValues);
  const [radioList, setRadioList] = useState(radioInitialValues);
  const [dropdownList, setDropdownList] = useState(dropdownValues);
  const [success, setSuccess] = useState(false);
  const validated = useRef(false);
  const navigate = useNavigate();

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

  const getValue = (fieldTitle) => {
    switch (fieldTitle) {
      case "Street Address":
        return values.addressline1.value;
      case "Street Address Line 2":
        return values.addressline2.value;
      case "City":
        return values.city.value;
      case "State/Province":
        return values.state.value;
      case "Postal/Zipcode":
        return values.zipcode.value;
      case "Country":
        return values.country.value;
      case "Prefix":
        return values.prefix.value;
      case "First Name":
        return values.firstname.value;
      case "Middle Name":
        return values.middlename.value;
      case "Last Name":
        return values.lastname.value;
      case "Area Code":
        return values.areacode.value;
      case "Phone Number":
        return values.phonenumber.value;
      case "Hours":
        return values.hours.value;
      case "Minutes":
        return values.minutes.value;
      case "Period":
        return values.period.value;
      case "Email Address":
        return values.email.value;
      case "Date":
        return values.date.value;
      case "Integer":
        return values.integar.value;
      case "Decimel":
        return values.decimel.value;
      case "Long Text":
        return values.longtext.value;
      case "Short Text":
        return values.shorttext.value;
      case "Multichoice":
        return values.multichoice.value;
      case "Singlechoice":
        return values.singlechoice.value;
      case "File Upload":
        return values.fileupload.value;
      case "Dropdown":
        return values.dropdown.value;
      case "Scale Rating":
        return "";
      case "Signature":
        return "";

      default:
        break;
    }
  };

  const getJSON = () => {
    const formSections = singleForm.sections.map((section) => {
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
                        value: getValue(field.fieldTitle),
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

  const handleSubmit = (e) => {
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

      // else if (
      //   values[key].value &&
      //   values[key].value.length &&
      //   values[key].error
      // ) {
      //   // hide error if exists
      //   setValues((prevState) => {
      //     return {
      //       ...prevState,
      //       [key]: { ...prevState[key], error: false },
      //     };
      //   });
      // }
    }

    // console.log({ ref: validated.current });
    if (validated.current) {
      const formJSON = getJSON();
      console.log({ formJSON });
      setValues(initialValues);
      setRadioList(radioInitialValues);
      setCheckedList(checkboxInitialValues);
      setSuccess(true);
    }
  };

  const handleChange = ({ target }, index) => {
    const { name, value } = target;
    if (name === "multichoice") {
      const checkedListClone = [...checkedList];
      checkedListClone[index] = {
        ...checkedListClone[index],
        checked: !checkedListClone[index].checked,
      };

      const checkedArray = [];
      for (const item of checkedListClone) {
        if (item.checked) {
          checkedArray.push(item.label);
        }
      }
      setCheckedList(checkedListClone);
      setValues({
        ...values,
        [name]: {
          ...values[name],
          value: checkedArray,
        },
      });
      return;
    }
    if (name === "singlechoice") {
      const newRadioList = radioList.map((radio, mapIndex) => {
        if (index === mapIndex) {
          setValues({
            ...values,
            [name]: { ...values[name], value: radio.value },
          });
          return {
            ...radio,
            checked: true,
          };
        }
        return {
          ...radio,
          checked: false,
        };
      });
      setRadioList(newRadioList);
      return;
    }
    if (name === "integar") {
      setValues({
        ...values,
        [name]: { ...values[name], value: value.replace(/\D/g, "") },
      });
      return;
    }
    if (name === "decimel") {
      if (!value || value.match(/^\d{1,}(\.\d{0,4})?$/)) {
        setValues({ ...values, [name]: { ...values[name], value } });
      }
      return;
    }
    setValues({ ...values, [name]: { ...values[name], value } });
  };

  const renderInputClasses = (name) => {
    if (name === "email") {
      return values[name].error ? "form-email error" : "form-email";
    }
    if (name === "date") {
      return values[name].error ? "form-date error" : "form-date";
    }
    if (name === "longtext") {
      return values[name].error ? "form-longtext error" : "form-longtext";
    }
    if (name === "multichoice" || name === "singlechoice") {
      return values[name].error ? "form-choice error" : "form-choice";
    }
    if (name === "dropdown") {
      return values[name].error ? "form-dropdown error" : "form-dropdown";
    }
    if (name === "fileupload") {
      return values[name].error ? "form-upload error" : "form-upload";
    }

    return values[name].error ? "form-textbox error" : "form-textbox";
  };

  const renderJSX = ({ id, elementType, elementTitle, elementDescription }) => {
    switch (elementType) {
      case "heading":
        return (
          <h3 key={id} className="form-title mb-4" style={{ color: fontColor }}>
            {elementTitle} <span>{elementDescription}</span>
          </h3>
        );
      case "address":
        return (
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
                  value={values.addressline1.value}
                  type="text"
                  name="addressline1"
                  onChange={handleChange}
                  formStyle={inputStyle}
                  className={renderInputClasses("addressline1")}
                  labelAlign={labelAlignment}
                  placeholder="Address line 1 *"
                />
                {values.addressline1.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.addressline2.value}
                    type="text"
                    name="addressline2"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("addressline2")}
                    labelAlign={labelAlignment}
                    placeholder="Address line 2"
                  />
                </div>
                {values.addressline2.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.city.value}
                    type="text"
                    name="city"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("city")}
                    labelAlign={labelAlignment}
                    placeholder="City *"
                  />
                </div>
                {values.city.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.state.value}
                    type="text"
                    name="state"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("state")}
                    labelAlign={labelAlignment}
                    placeholder="State *"
                  />
                </div>
                {values.state.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.country.value}
                    type="text"
                    name="country"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("country")}
                    labelAlign={labelAlignment}
                    placeholder="Country *"
                  />
                </div>
                {values.country.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.zipcode.value}
                    type="text"
                    name="zipcode"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("zipcode")}
                    labelAlign={labelAlignment}
                    placeholder="Zipcode *"
                  />
                </div>
                {values.zipcode.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "full name":
        return (
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
                  <FormInput
                    value={values.prefix.value}
                    type="text"
                    name="prefix"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("prefix")}
                    labelAlign={labelAlignment}
                    placeholder="Prefix *"
                  />
                </div>
                {values.prefix.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.firstname.value}
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("firstname")}
                    labelAlign={labelAlignment}
                    placeholder="First Name *"
                  />
                </div>
                {values.firstname.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.middlename.value}
                    type="text"
                    name="middlename"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("middlename")}
                    labelAlign={labelAlignment}
                    placeholder="Middle Name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.lastname.value}
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("lastname")}
                    labelAlign={labelAlignment}
                    placeholder="Last Name *"
                  />
                </div>
                {values.lastname.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "phone number":
        return (
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
                  <FormInput
                    value={values.areacode.value}
                    type="text"
                    name="areacode"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("areacode")}
                    labelAlign={labelAlignment}
                    placeholder="Area Code *"
                  />
                </div>
                {values.areacode.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.phonenumber.value}
                    type="text"
                    name="phonenumber"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("phonenumber")}
                    labelAlign={labelAlignment}
                    placeholder="Phone Number *"
                  />
                </div>
                {values.phonenumber.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "email address":
        return (
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
                  <FormInput
                    value={values.email.value}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("email")}
                    labelAlign={labelAlignment}
                    placeholder="Email *"
                  />
                </div>
                {values.email.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "time":
        return (
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
                  <FormInput
                    value={values.hours.value}
                    type="number"
                    name="hours"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("hours")}
                    labelAlign={labelAlignment}
                    placeholder="Hours *"
                  />
                </div>
                {values.hours.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.minutes.value}
                    type="number"
                    name="minutes"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("minutes")}
                    labelAlign={labelAlignment}
                    placeholder="Minutes *"
                  />
                </div>
                {values.minutes.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <div className="form-input-wrapper">
                  {/* <label className="form-label">Name</label> */}
                  <FormInput
                    value={values.period.value}
                    type="number"
                    name="period"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("period")}
                    labelAlign={labelAlignment}
                    placeholder="Period *"
                  />
                </div>
                {values.period.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "date":
        return (
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
                  <FormInput
                    value={values.date.value}
                    type="date"
                    name="date"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("date")}
                    labelAlign={labelAlignment}
                    placeholder="Date *"
                  />
                </div>
                {values.date.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "integer":
        return (
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
                  <FormInput
                    value={values.integar.value}
                    // type="date"
                    name="integar"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("integar")}
                    labelAlign={labelAlignment}
                    placeholder="Integar *"
                  />
                </div>
                {values.integar.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "decimal":
        return (
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
                  <FormInput
                    value={values.decimel.value}
                    type="text"
                    name="decimel"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("decimel")}
                    labelAlign={labelAlignment}
                    placeholder="Decimel *"
                  />
                </div>
                {values.decimel.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "long text":
        return (
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
                  <FormInput
                    value={values.longtext.value}
                    type="textarea"
                    name="longtext"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("longtext")}
                    labelAlign={labelAlignment}
                    placeholder="Long Text *"
                  />
                  {/* <textarea
                    className={renderInputClasses("longtext")}
                    placeholder="Long Text"
                    rows="4"
                    name="longtext"
                    value={values.longtext.value}
                    onChange={handleChange}
                  ></textarea> */}
                </div>
                {values.longtext.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "short text":
        return (
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
                  <FormInput
                    value={values.shorttext.value}
                    type="text"
                    name="shorttext"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("shorttext")}
                    labelAlign={labelAlignment}
                    placeholder="Short Text *"
                  />
                </div>
                {values.shorttext.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "multiple choice":
        return (
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
                  <div className="form-choice-wrapper">
                    {/* <label className="form-choice-label">Multichoice</label> */}
                    {checkedList.map((option, index) => (
                      <div key={option.label} className="form-choice-row">
                        <input
                          type="checkbox"
                          className={renderInputClasses("multichoice")}
                          name="multichoice"
                          checked={option.checked}
                          onChange={(e) => handleChange(e, index)}
                        />
                        <label htmlFor="">{option.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {values.multichoice.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "single choice":
        return (
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
                  <div className="form-choice-wrapper">
                    {radioList.map((radio, index) => (
                      <div className="form-choice-row" key={radio.label}>
                        <input
                          className={renderInputClasses("singlechoice")}
                          type="radio"
                          name="singlechoice"
                          checked={radio.checked}
                          value={radio.value}
                          onChange={(e) => handleChange(e, index)}
                          style={{ visibility: "visible", position: "static" }}
                        />
                        <label>{radio.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {values.singlechoice.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "file upload":
        return (
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

                  <div className="form-upload-wrapper">
                    <label htmlFor="form-upload" className="form-upload-label">
                      <i class="fa fa-cloud-upload"></i> Upload here
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
        );
      case "dropdown":
        return (
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
                  <FormInput
                    value={values.dropdown.value}
                    type="dropdown"
                    name="dropdown"
                    onChange={handleChange}
                    formStyle={inputStyle}
                    className={renderInputClasses("dropdown")}
                    labelAlign={labelAlignment}
                    placeholder="Short Text *"
                  />
                  {/* <select
                    name="dropdown"
                    className={renderInputClasses("dropdown")}
                    value={values.dropdown.value}
                    onChange={handleChange}
                  >
                    <option value="">Select dropdown *</option>
                    {dropdownList.map((dropdown) => (
                      <option value={dropdown.value} key={dropdown.value}>
                        {dropdown.label}
                      </option>
                    ))}
                  </select> */}
                </div>
                {values.dropdown.error && (
                  <p className="form-error-message">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    This Field Is Required.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case "scale rating":
        return (
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
        <i class="fa fa-info-circle" aria-hidden="true"></i>
        This Field Is Required.
      </p> */}
              </div>
            </div>
          </div>
        );
      case "signature":
        return (
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
        <i class="fa fa-info-circle" aria-hidden="true"></i>
        This Field Is Required.
      </p> */}
              </div>
            </div>
          </div>
        );
      default:
        return "element type didn't match";
    }
  };

  return (
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
          {!!singleForm.sections.length &&
            singleForm.sections.map((section, index) => (
              <React.Fragment key={index}>
                <div className="form-header">
                  <h2 className="form-title" style={{ color: fontColor }}>
                    {section.sectionTitle}
                  </h2>
                  <h6 className="form-subtitle" style={{ color: fontColor }}>
                    {section.sectionDescription}
                  </h6>
                </div>
                <div className="form-content">
                  {!!section.elements.length &&
                    section.elements.map((element) => renderJSX(element))}
                </div>
              </React.Fragment>
            ))}
          <div className="form-footer">
            <button type="submit" className="form-submit-btn">
              Submit
            </button>
          </div>
        </form>
      )}
      {success && (
        <div>
          <h1>Thanks your form is submitted</h1>
          <button className="form-submit-btn" onClick={() => navigate(-1)}>
            <i className="fa fa-long-arrow-left"></i> Go Back
          </button>
        </div>
      )}
    </div>
  );
};
