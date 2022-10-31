import React, { useEffect, useState, useRef, useContext } from "react";
import Faker from "faker";
import arrayMove from "array-move";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { addForm } from "../store/formSlice";
import { CreateFormContext } from "../context/CreateFormContext";
import LeftDrawer from "../components/LeftDrawer";
import AddApplicationFormSteps from "../components/FormSteps";
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";
import SectionName from "../shared/SectionName";
import Heading from "../shared/Heading";
import Name from "../shared/Name";
import PhoneNumber from "../shared/PhoneNumber";
import Address from "../shared/Address";
import EmailAddress from "../shared/EmailAddress";
import IntegerElement from "../shared/IntegerElement";
import DecimalElement from "../shared/DecimalElement";
import Date from "../shared/Date";
import Time from "../shared/Time";
import ShortText from "../shared/ShortText";
import LongText from "../shared/LongText";
import DropDown from "../shared/DropDown";
import SingleChoiceQuestion from "../shared/SingleChoiceQuestion";
import MultipleChoiceQuestion from "../shared/MultipleChoiceQuestion";
import ScaleRating from "../shared/ScaleRating";
import Signature from "../shared/Signature";
import FileUpload from "../shared/FileUpload";
import ConfirmationModal from "../shared/ConfirmationModal";
import Drawer from "../shared/Drawer";
import useTheme from "../hooks/useTheme";

const generateRandomString = () =>
  `${Faker.name.findName()}-${Math.random()}-${Faker.internet.email()}`;

function titleCase(str) {
  let splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  return splitStr.join(" ");
}

let persistentSections;
let persistentActiveStep;

const AddApplicationForm = () => {
  const newFormId = uuidv4();
  const {
    push,
    query: { formId },
    pathname,
  } = useRouter();
  //   const { formId } = useParams();
  const { forms, onAddForm } = useContext(CreateFormContext);

  const [selectedSection, setSelectedSection] = useState([
    { step: "Student Information", index: 0 },
  ]);

  let uniqueIdentifier;

  if (formId) {
    const form = forms.find((form) => form.formId === formId);
    uniqueIdentifier = form.uniqueIdentifier;
  } else {
    uniqueIdentifier = generateRandomString();
  }

  const existingFormIndex = useSelector((state) =>
    state.allForms.forms.findIndex((form) => form.formId === formId)
  );

  const existingForm = useSelector((state) =>
    state.allForms.forms.find((form) => form.formId === formId)
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const [elementUniqueIdentifier, setElementUniqueIdentifier] =
    useState(undefined);
  const [isEmailMandatory, setIsEmailMandatory] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const handleEditableElementChange = (e) => {
    const key = e.target.getAttribute("uniqueIdentifier");
    const persistentSectionsCopy = [...persistentSections];
    switch (e.target.id) {
      case "section":
        const selectedSection = persistentSectionsCopy.find(
          (s) => s.uniqueIdentifier === key
        );
        selectedSection.name = e.target.innerText;
        setSections(persistentSectionsCopy);
        break;
      case "element":
        persistentSections &&
          persistentSections.forEach((section) => {
            const currentElement = section.elements.find(
              (element) => element.uniqueIdentifier === key
            );
            if (currentElement) {
              currentElement.name = e.target.innerText;
            }
          });
        break;
      default:
        break;
    }
  };

  const handleSingleInputChange = (e, uniquekey, isSection = false) => {
    const newSections = [...persistentSections];
    const activeSection = newSections.find(
      (section) =>
        section.uniqueIdentifier === persistentActiveStep.uniqueIdentifier
    );
    if (isSection) {
      activeSection.value = e.currentTarget.value;
    } else {
      const modifiedElement = activeSection.elements.find(
        ({ uniqueIdentifier }) => uniqueIdentifier === uniquekey
      );
      if (modifiedElement) {
        modifiedElement.value = e.currentTarget.value;
      }
    }
    if (
      window.location.pathname.toLowerCase().includes("edit") ||
      (window.location.pathname.toLowerCase().includes("create") &&
        window.location.search.length)
    ) {
      persistentSections = newSections;
    } else {
      persistentSections = isSection ? newSections : sections;
    }
  };

  const handleRemoveSection = () => {
    if (!activeStep.isFirstSection) {
      setActiveStep(
        persistentSections[
          persistentSections.findIndex(
            (section) =>
              section.uniqueIdentifier === activeStep.uniqueIdentifier
          ) - 1
        ]
      );
      setSections(
        persistentSections.filter(
          (section) => section.uniqueIdentifier !== activeStep.uniqueIdentifier
        )
      );
    }
  };

  const [activeStep, setActiveStep] = useState(() => {
    if (formId) {
      const form = forms.find((form) => form.formId === formId);
      return { ...form.activeStep };
    } else {
      return {
        name: "Section Name",
        reactElement: (
          <SectionName
            uniqueIdentifier={uniqueIdentifier}
            editMode={{ status: false }}
            handleEditableElementChange={handleEditableElementChange}
            handleChange={handleSingleInputChange}
          />
        ),
        elements: [],
        value: null,
        uniqueIdentifier,
        isFirstSection: true,
        elementType: "Section Name",
      };
    }
  });

  const [sections, setSections] = useState(() => {
    if (formId) {
      const form = forms.find((form) => form.formId === formId);
      return [...form.sections];
    } else {
      return [
        {
          name: "Section Name",
          reactElement: (
            <SectionName
              uniqueIdentifier={uniqueIdentifier}
              editMode={{ status: false }}
              handleEditableElementChange={handleEditableElementChange}
              handleChange={handleSingleInputChange}
            />
          ),
          elements: [],
          value: null,
          uniqueIdentifier,
          isFirstSection: true,
          elementType: "Section Name",
        },
      ];
    }
  });

  persistentActiveStep = activeStep;
  persistentSections = sections;

  useEffect(() => {
    if (persistentSections[0].isEmailMandatory) {
      setIsEmailMandatory(true);
    }
  }, [persistentSections[0].isEmailMandatory]);

  useEffect(() => {
    if (elementUniqueIdentifier) {
      const newElement = document.getElementById(elementUniqueIdentifier);
      if (newElement) {
        newElement.scrollIntoView();
        setTimeout(() => setElementUniqueIdentifier(undefined), 100);
      }
    }
  });

  const handleClickedElement = (e, name, uniquekey) => {
    const key = generateRandomString();
    const newSections = [...persistentSections];
    let currentSection = newSections.find(
      (section) =>
        section.uniqueIdentifier === persistentActiveStep.uniqueIdentifier
    );
    let modifiedElement = currentSection.elements.find(
      ({ uniqueIdentifier }) => uniqueIdentifier === uniquekey
    );
    switch (e.currentTarget.id) {
      case "duplicate-icon":
        if (modifiedElement) {
          currentSection.elements = [
            ...currentSection.elements,
            {
              name: modifiedElement.name,
              reactElement: getElement(name, key),
              isVisible: modifiedElement.isVisible,
              isRequired: modifiedElement.isRequired,
              uniqueIdentifier: key,
              value: modifiedElement.value,
              options: { ...modifiedElement.options },
              elementType: `${name.toLowerCase()}`,
              isPrimary: modifiedElement.isPrimary,
            },
          ];
        }
        break;
      case "required-toggle-icon":
        if (modifiedElement) {
          modifiedElement.isRequired = modifiedElement.isVisible
            ? !modifiedElement.isRequired
            : false;
        }
        break;
      case "visibility-icon":
        if (modifiedElement) {
          if (modifiedElement.isVisible) {
            modifiedElement.isRequired = false;
          }
          modifiedElement.isVisible = !modifiedElement.isVisible;
        }
        break;
      case "remove-icon":
        if (modifiedElement) {
          currentSection.elements = currentSection.elements.filter(
            ({ uniqueIdentifier }) => uniqueIdentifier !== uniquekey
          );
        }
        break;
      default:
        break;
    }
    setSections(newSections);
  };

  const handleIsPrimaryChange = (isPrimary, key) => {
    const persistentSectionsCopy = [...persistentSections];
    persistentSectionsCopy &&
      persistentSectionsCopy.forEach((section) => {
        section.elements &&
          section.elements.forEach((element) => {
            if (element.uniqueIdentifier === key) {
              element.isPrimary = isPrimary;
            }
          });
      });
    setSections(persistentSectionsCopy);
  };

  const getElement = (
    name,
    key,
    isNew = false,
    editMode = { status: false }
  ) => {
    switch (name) {
      case "Heading":
        return (
          <Heading
            uniqueIdentifier={key}
            handleChange={handleSingleInputChange}
            handleClickedElement={handleClickedElement}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Address":
        return (
          <Address
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            editMode={editMode}
            handleChange={handleSingleInputChange}
            handleIsPrimaryChange={handleIsPrimaryChange}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Full Name":
        return (
          <Name
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            editMode={editMode}
            handleIsPrimaryChange={handleIsPrimaryChange}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Phone Number":
        return (
          <PhoneNumber
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            editMode={editMode}
            handleChange={handleSingleInputChange}
            handleIsPrimaryChange={handleIsPrimaryChange}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Integer":
        return (
          <IntegerElement
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            handleChange={handleSingleInputChange}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Decimal":
        return (
          <DecimalElement
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            handleChange={handleSingleInputChange}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Email Address":
        return (
          <EmailAddress
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            editMode={editMode}
            handleChange={handleSingleInputChange}
            handleIsPrimaryChange={handleIsPrimaryChange}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Time":
        return (
          <Time
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            editMode={editMode}
            handleChange={handleSingleInputChange}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Date":
        return (
          <Date
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            editMode={editMode}
            handleChange={handleSingleInputChange}
            handleIsPrimaryChange={handleIsPrimaryChange}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Long Text":
        return (
          <LongText
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            handleChange={handleSingleInputChange}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Short Text":
        return (
          <ShortText
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            handleChange={handleSingleInputChange}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Multiple Choice":
        return (
          <MultipleChoiceQuestion
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            handleChange={handleSingleInputChange}
            handleOptionsChange={handleMultipleInputsChange}
            isNew={isNew}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Single Choice":
        return (
          <SingleChoiceQuestion
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            handleChange={handleSingleInputChange}
            handleOptionsChange={handleMultipleInputsChange}
            isNew={isNew}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "File Upload":
        return (
          <FileUpload
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            handleChange={handleSingleInputChange}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Dropdown":
        return (
          <DropDown
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            handleChange={handleSingleInputChange}
            handleOptionsChange={handleMultipleInputsChange}
            isNew={isNew}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Scale Rating":
        return (
          <ScaleRating
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            handleChange={handleSingleInputChange}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      case "Signature":
        return (
          <Signature
            handleClickedElement={handleClickedElement}
            uniqueIdentifier={key}
            editMode={editMode}
            handleEditableElementChange={handleEditableElementChange}
          />
        );
      default:
        return;
    }
  };

  const handleSetSections = () => {
    let newSections = [...persistentSections];
    newSections = [
      ...newSections,
      {
        name: "Section Name",
        reactElement: (
          <SectionName
            uniqueIdentifier={uniqueIdentifier}
            editMode={{ status: false }}
            handleEditableElementChange={handleEditableElementChange}
            handleChange={handleSingleInputChange}
          />
        ),
        elements: [],
        value: null,
        uniqueIdentifier,
        elementType: "Section Name",
      },
    ];

    setActiveStep(newSections[newSections.length - 1]);
    setSections(newSections);
  };

  const handleElementsClick = (e) => {
    const name = e.currentTarget.id;
    const newSections = [...sections];
    const currentSection = newSections.find(
      (section) =>
        section.uniqueIdentifier === persistentActiveStep.uniqueIdentifier
    );
    currentSection.elements = [
      ...currentSection.elements,
      {
        name: `${name.toLowerCase()}`,
        reactElement: getElement(name, uniqueIdentifier, true),
        isVisible: true,
        isRequired: false,
        uniqueIdentifier,
        value: "",
        options: null,
        elementType: `${name.toLowerCase()}`,
      },
    ];
    setElementUniqueIdentifier(uniqueIdentifier);
    setSections(newSections);
  };

  const handleMultipleInputsChange = (value, uniquekey, option) => {
    const newSections = [...persistentSections];
    const currentSection = newSections.find(
      (section) =>
        section.uniqueIdentifier === persistentActiveStep.uniqueIdentifier
    );
    const modifiedElement = currentSection.elements.find(
      ({ uniqueIdentifier }) => uniqueIdentifier === uniquekey
    );
    if (modifiedElement) {
      if (!modifiedElement.options) {
        modifiedElement.options = {};
        modifiedElement.options[option] = value;
      } else {
        modifiedElement.options[option] = value;
      }
    }
    persistentSections = newSections;
  };

  useEffect(() => {
    if (window.location.pathname.toLowerCase().includes("edit")) {
      axios
        .get(
          `${window.location.origin}/ApplicationForm/get?formId=${Number(
            window.location.pathname.split("/").pop()
          )}`
        )
        .then((response) => {
          if (response.status === 200) {
            response.data.applicationForm &&
              response.data.applicationForm.forEach((section) => {
                const sectionKey = generateRandomString();
                section.reactElement = (
                  <SectionName
                    uniqueIdentifier={sectionKey}
                    handleChange={handleSingleInputChange}
                    editMode={{
                      status: true,
                      value: section.value,
                      name: section.name,
                    }}
                    handleEditableElementChange={handleEditableElementChange}
                  />
                );
                section.uniqueIdentifier = sectionKey;
                section.elements &&
                  section.elements.forEach((element) => {
                    const elementKey = generateRandomString();
                    element.reactElement = getElement(
                      titleCase(element.elementType),
                      elementKey,
                      false,
                      {
                        status: true,
                        value: element.value,
                        isRequired: element.isRequired,
                        isVisible: element.isVisible,
                        options: element.options,
                        name: element.name,
                        isPrimary: element.isPrimary,
                        isTemplateElement: element.isTemplateElement,
                      }
                    );
                    element.uniqueIdentifier = elementKey;
                  });
              });
            if (response.data.applicationForm) {
              setActiveStep(response.data.applicationForm[0]);
              setSections(response.data.applicationForm);
            }
          }
        })
        .catch((error) => {
          // errorAlert(error);
          console.log("errorAlert", error);
        });
    }
    if (
      window.location.pathname.toLowerCase().includes("create") &&
      window.location.search.length
    ) {
      axios
        .get(
          `${
            window.location.origin
          }/ApplicationForm/getTemplate?formId=${Number(
            window.location.search.split("=").pop()
          )}`
        )
        .then((response) => {
          if (response.status === 200) {
            response.data.applicationForm &&
              response.data.applicationForm.forEach((section) => {
                const sectionKey = generateRandomString();
                section.reactElement = (
                  <SectionName
                    uniqueIdentifier={sectionKey}
                    handleChange={handleSingleInputChange}
                    editMode={{
                      status: true,
                      value: section.value,
                      name: section.name,
                    }}
                    handleEditableElementChange={handleEditableElementChange}
                  />
                );
                section.uniqueIdentifier = sectionKey;
                section.elements &&
                  section.elements.forEach((element) => {
                    const elementKey = generateRandomString();
                    element.reactElement = getElement(
                      titleCase(element.elementType),
                      elementKey,
                      false,
                      {
                        status: true,
                        value: element.value,
                        isRequired: element.isRequired,
                        isVisible: element.isVisible,
                        options: element.options,
                        name: element.name,
                        isPrimary: element.isPrimary,
                        isTemplateElement: element.isTemplateElement,
                      }
                    );
                    element.uniqueIdentifier = elementKey;
                  });
              });
            if (response.data.applicationForm) {
              if (response.data.applicationForm[0]) {
                setActiveStep(response.data.applicationForm[0]);
              }
              setSections(response.data.applicationForm);
            }
          }
        })
        .catch((error) => {
          // errorAlert(error);
          console.log("errorAlert", error);
        });
    }
    setIsLoaded(true);
  }, []);

  const handleElementsDragChange = (oldIndex, newIndex, section) => {
    const newSections = [...sections];
    persistentSections = arrayMove(section.elements, oldIndex, newIndex);
    section.elements = arrayMove(section.elements, oldIndex, newIndex);
    setSections(newSections);
  };

  const handleEditSectionClick = (e) => {
    const persistentSectionsCopy = [...persistentSections];
    const currentSection = persistentSectionsCopy.find(
      (s) => s.uniqueIdentifier === e.currentTarget.id
    );
    setActiveStep(currentSection);
  };

  const handleApplicationFormStepChange = (clickedStep) => {
    setActiveStep(clickedStep);
  };

  const handleConfirmationModalResponse = (isContinue = false) => {
    if (isContinue) {
      handleRemoveSection();
    }
    setIsConfirmationModalOpen(false);
  };

  const [isLeftDrawerActive, setIsLeftDrawerActive] = useState(false);
  const [isRightDrawerActive, setIsRightDrawerActive] = useState(false);

  const handleLeftClosing = () => {
    setIsLeftDrawerActive(!isLeftDrawerActive);
  };

  const handleRightClosing = () => {
    setIsRightDrawerActive(!isRightDrawerActive);
  };

  const {
    selectedTheme: {
      formBgImg,
      toggleIconColor,
      pageBgColor,
      pageBgImg,
      textColor,
      whiteColor,
      formBgColor,
      primaryColor,
      secondaryColor,
      tertiaryColor,
      formWidth,
    },
  } = useTheme();

  const titleRef = useRef();

  const formStyles = {
    maxWidth: `${formWidth}px`,
    minHeight: "50vh",
    margin: "auto",
    borderRadius: "0.5rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };

  return (pathname.toLowerCase().includes("edit") && !sections.length) ||
    !isLoaded ? (
    <div className="react-loader-wrapper">
      <div className="lds-dual-ring" />
    </div>
  ) : (
    <div className="content-wrapper application_form">
      {!persistentActiveStep["isLastSection"] && (
        <>
          <button
            className="drawer-btn drawer-btn-left"
            onClick={() => setIsLeftDrawerActive(!isLeftDrawerActive)}
          >
            <i className="fa fa-pencil-square-o"></i>
          </button>
          <button
            className="drawer-btn drawer-btn-right"
            onClick={() => setIsRightDrawerActive(!isRightDrawerActive)}
          >
            <i className="fa fa-plus-circle"></i>
          </button>
        </>
      )}
      <LeftDrawer isOpen={isLeftDrawerActive} onClose={handleLeftClosing} />
      {!persistentActiveStep["isLastSection"] && (
        <Drawer
          right
          drawerWidth={200}
          isOpen={isRightDrawerActive}
          onClose={handleRightClosing}
        >
          <RightSection
            sections={sections}
            setSelectedSection={setSelectedSection}
            handleSetSections={handleSetSections}
            handleElementsClick={handleElementsClick}
            selectedSection={selectedSection}
            activeStep={persistentActiveStep}
          />
        </Drawer>
      )}
      <div
        className="application_form_content"
        style={{
          backgroundColor: pageBgImg === null ? pageBgColor : "",
          backgroundImage: pageBgImg ? `url(${pageBgImg})` : "",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="application_form_header">
          <div
            className="afh_bottom text-center"
            style={{
              padding:
                persistentActiveStep &&
                !persistentActiveStep.isLastSection &&
                "0 20px",
            }}
          >
            <h3
              contentEditable
              style={{ color: textColor }}
              title="This text is editable"
              className="my-4 d-inline-block"
              ref={titleRef}
            >
              Form Title
            </h3>
            <AddApplicationFormSteps
              activeStep={persistentActiveStep}
              persistentSections={persistentSections}
              handleApplicationFormStepChange={handleApplicationFormStepChange}
            />
          </div>
        </div>
        <div
          className="application_form_area registered_class_information"
          style={
            formBgImg !== null
              ? {
                  ...formStyles,
                  background: `url(${formBgImg})`,
                }
              : {
                  ...formStyles,
                  backgroundColor: formBgColor,
                }
          }
        >
          {persistentActiveStep && !persistentActiveStep.isLastSection && (
            <div
              className={`d-flex align-items-end justify-content-between mb-1`}
              style={{
                padding: "0 20px",
              }}
            >
              <div className="d-flex flex-column">
                {persistentActiveStep && persistentActiveStep.isFirstSection && (
                  <>
                    <div className="d-flex">
                      <div
                        className="toggle-container mr-1 element-icon"
                        style={{ backgroundColor: toggleIconColor }}
                        onClick={() => {
                          persistentSections &&
                            persistentSections.forEach((section) => {
                              if (section.isFirstSection) {
                                section.isEmailMandatory =
                                  !section.isEmailMandatory;
                              }
                            });
                          setIsEmailMandatory(!isEmailMandatory);
                        }}
                      >
                        <div
                          className={`dialog-button ${
                            !isEmailMandatory ? "disabled" : ""
                          }`}
                          style={{
                            width: "17px",
                            height: "17px",
                            backgroundColor: whiteColor,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: "medium",
                          color: primaryColor,
                          fontWeight: "bolder",
                        }}
                      >
                        Make Email Mandatory
                      </div>
                    </div>
                    <div style={{ color: primaryColor, marginTop: "0.5rem" }}>
                      Check this if you want to send email to the user
                    </div>
                  </>
                )}
              </div>
              <div className="d-flex">
                <div className="ACT_next_btn mr-1">
                  <button
                    className="btn_color_signup btn-block round waves-effect waves-light applicaion-button-preview-button-background-color"
                    id="preview"
                    style={{
                      margin: 0,
                      fontWeight: "600",
                      fontSize: "15px",
                      padding: "0 12px",
                      height: "40px",
                      backgroundColor: tertiaryColor,
                    }}
                    onClick={() =>
                      setActiveStep({ isLastSection: true, uniqueIdentifier })
                    }
                  >
                    Preview
                  </button>
                </div>
                <div className="ACT_next_btn mr-1">
                  <button
                    className="btn_color_signup btn-block round waves-effect waves-light"
                    id="next"
                    style={{
                      margin: 0,
                      fontWeight: "600",
                      fontSize: "15px",
                      padding: "0 12px",
                      height: "40px",
                      backgroundColor: secondaryColor,
                    }}
                    onClick={() => handleSetSections()}
                  >
                    Create New Section
                  </button>
                </div>
                <div className="ACT_next_btn">
                  <button
                    className="btn_color_signup btn-block round waves-effect waves-light applicaion-button-save-button-background-color"
                    style={{
                      margin: 0,
                      fontWeight: "600",
                      fontSize: "15px",
                      padding: "0 12px",
                      height: "40px",
                      backgroundColor: primaryColor,
                    }}
                    onClick={() => {
                      const apiData = [];
                      persistentSections.map((s) => {
                        const elements = [];
                        s.elements.map((e) => {
                          elements.push({
                            elementType: e.elementType,
                            name: e.name,
                            value: e.value,
                            isRequired: e.isRequired,
                            isVisible: e.isVisible,
                            isPrimary: e.isPrimary,
                            isTemplateElement: !!e.isTemplateElement,
                            options: e.options ? { ...e.options } : null,
                          });
                        });
                        apiData.push({
                          name: s.name,
                          value: s.value,
                          isEmailMandatory: s.isEmailMandatory,
                          isFirstSection: s.isFirstSection,
                          elements,
                        });
                      });

                      // manage redux state
                      dispatch(
                        addForm({
                          sectionsData: apiData,
                          title: titleRef.current.innerText,
                          formId:
                            existingFormIndex !== -1
                              ? existingForm.formId
                              : newFormId,
                        })
                      );

                      // manage context state
                      onAddForm({
                        formId:
                          existingFormIndex !== -1
                            ? existingForm.formId
                            : newFormId,
                        sections,
                        activeStep,
                        uniqueIdentifier,
                      });
                      push("/");
                      // axios
                      //   .post(
                      //     `${window.location.origin}/ApplicationForm/Create`,
                      //     apiData
                      //   )
                      //   .then(() => {
                      //     //   removeAlert();
                      //     //   successAlert("Section Saved Successfully !!!");
                      //     console.log(
                      //       "successAlert Section Saved Successfully !!!"
                      //     );
                      //   })
                      //   .catch((error) => {
                      //     //   removeAlert();
                      //     //   errorAlert(error);
                      //     console.log("errorAlert", error);
                      //   });
                    }}
                  >
                    Save
                  </button>
                </div>
                {!persistentActiveStep.isFirstSection && (
                  <div className="ACT_next_btn ml-1">
                    <button
                      className="btn_color_signup btn-block round waves-effect waves-light application-form-delete-section-button"
                      id="preview"
                      style={{
                        margin: 0,
                        fontWeight: "600",
                        fontSize: "15px",
                        padding: "0 12px",
                        height: "40px",
                      }}
                      onClick={() => setIsConfirmationModalOpen(true)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <LeftSection
            persistentSections={persistentSections}
            sections={sections}
            activeStep={persistentActiveStep}
            handleElementsDragChange={handleElementsDragChange}
            handleEditSectionClick={handleEditSectionClick}
            selectedSection={selectedSection}
            handleSetSections={handleSetSections}
          />
          {/* <RightSection
            sections={sections}
            setSelectedSection={setSelectedSection}
            handleSetSections={handleSetSections}
            handleElementsClick={handleElementsClick}
            selectedSection={selectedSection}
            activeStep={persistentActiveStep}
          /> */}
        </div>
      </div>
      <ConfirmationModal
        message="Are you sure you want to delete this section ?"
        show={isConfirmationModalOpen}
        handleClose={handleConfirmationModalResponse}
      />
    </div>
  );
};

export default AddApplicationForm;
