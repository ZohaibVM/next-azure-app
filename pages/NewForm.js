import { useState, useEffect, useRef } from "react";
import {
  createElement,
  errorToast,
  getUserFromLocalStorage,
  successToast,
} from "./../utils/utils";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { formsService } from "./../services/formsService";
import axios from "axios";
import LeftDrawer from "./../components/LeftDrawer";
import Drawer from "./../shared/Drawer";
import useTheme from "./../hooks/useTheme";
import RightDrawerContent from "./../shared/RightDrawerContent";
import ConfirmationModal from "./../shared/ConfirmationModal";
import TopHeader from "../components/common/TopHeader";
import ContainerHeader from "./../components/common/ContainerHeader";
import ContainerContent from "./../components/common/ContainerContent";
import PreviewForm from "./../components/common/PreviewForm";
import Spinner from "../components/Spinner/Spinner";
import arrayMove from "array-move";
import useAuth from "./../hooks/useAuth";

const NewForm = () => {
  const { user } = useAuth({ redirectTo: "/" });
  const [isLeftDrawerActive, setIsLeftDrawerActive] = useState(false);
  const [isRightDrawerActive, setIsRightDrawerActive] = useState(false);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [sections, setSections] = useState([
    {
      sectionId: uuidv4(),
      sectionTitle: "Section Name Here",
      sectionDescription: "",
      isFirstSection: true,
      elements: [],
    },
  ]);
  const [form, setForm] = useState({
    isEmailMendatory: false,
  });
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const sectionsEndRef = useRef(null);
  const formTitleRef = useRef(null);
  const nodeRef = useRef(null);

  const {
    push,
    query: { formId },
    pathname,
  } = useRouter();

  useEffect(() => {
    if (nodeRef.current) {
      const element = document.getElementById(nodeRef.current.id);
      element?.focus();

      setTimeout(() => {
        nodeRef.current = null;
      }, 100);
    }
  }, [sections]);

  useEffect(() => {
    const initValues = async () => {
      if (pathname.includes("NewForm")) {
        setIsFetching(false);
        return;
      }

      if (formId) {
        const newForms = [];
        try {
          const { data } = await axios.post(formsService.getForms, {
            user: getUserFromLocalStorage(),
          });
          newForms = [...data?.forms];
        } catch (error) {
          console.log(error);
          user && errorToast("Something went wrong");
          user ? push("/AllForms") : push("/");
        }
        const singleForm = newForms.find((form) => form.formId === formId);

        if (singleForm) {
          setSections([...singleForm?.sections]);
          setForm({
            formId: singleForm?.formId,
            formTitle: singleForm?.formTitle,
            formDescription: singleForm?.formDescription,
            creationDate: singleForm?.creationDate,
            lastUpdateDate: singleForm?.lastUpdateDate,
            isEmailMendatory: singleForm?.isEmailMendatory,
          });
          setIsFetching(false);
        } else {
          user && errorToast("404: Form Not Found");
          push("/");
        }
      }
    };

    initValues();
  }, [formId, push, pathname]);

  const scrollToBottom = () => {
    sectionsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [sections]);

  const {
    selectedTheme: {
      formBgImg,
      pageBgColor,
      pageBgImg,
      formBgColor,
      formWidth,
    },
  } = useTheme();

  const handleLeftClosing = () => setIsLeftDrawerActive(!isLeftDrawerActive);

  const handleRightClosing = () => setIsRightDrawerActive(!isRightDrawerActive);

  const handleAddElement = (name) => {
    const sectionsClone = [...sections]; // clone sections
    sectionsClone[activeSectionIndex] = { ...sections[activeSectionIndex] }; // clone active section

    const newElement = createElement(name);
    sectionsClone[activeSectionIndex].elements = [
      ...sectionsClone[activeSectionIndex].elements,
      newElement,
    ]; // clone active section elements and add new element

    setSections(sectionsClone);
  };

  const handleActiveSection = (section, index) => {
    setActiveSectionIndex(index);
    setIsPreviewActive(false);
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        sectionId: uuidv4(),
        sectionTitle: "New Section Title",
        sectionDescription: "",
        isFirstSection: false,
        elements: [],
      },
    ]);
    setActiveSectionIndex(sections.length);
  };

  const handleDeleteSection = (section) => {
    const sectionId = section.sectionId;
    setSections(sections.filter((section) => section.sectionId !== sectionId));
    setActiveSectionIndex(
      activeSectionIndex > 0
        ? (activeSectionIndex = activeSectionIndex - 1)
        : activeSectionIndex
    );
  };

  const handleEditSection = (isEdit, sectionIndex) => {
    if (isEdit) {
      setActiveSectionIndex(sectionIndex);
      setIsPreviewActive(false);
      return;
    }
    setIsPreviewActive(true);
  };

  const handleElementDelete = (event, element) => {
    const elementId = element.id;
    const elements = [...sections[activeSectionIndex]?.elements]; // clone current section elements
    const newElements = elements.filter((element) => element.id !== elementId);

    const sectionsClone = [...sections]; // sections clone
    sectionsClone[activeSectionIndex] = {
      ...sectionsClone[activeSectionIndex],
    }; // clone section on active step

    sectionsClone[activeSectionIndex].elements = [...newElements]; // modify current section elements
    setSections(sectionsClone);
  };

  const handleModalOpen = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleModal = (isContinue = false) => {
    if (isContinue) {
      handleDeleteSection(sections[activeSectionIndex]);
    }
    setIsConfirmationModalOpen(false);
  };

  const handleSaveForm = async () => {
    setIsSubmitting(true);

    const newForm = {
      formId: form?.formId ? form.formId : uuidv4(),
      formTitle: formTitleRef.current.value,
      formDescription: form?.formDescription ? form?.formDescription : "",
      creationDate: form?.creationDate ? form.creationDate : Date.now(),
      lastUpdateDate: form?.lastUpdateDate ? form?.lastUpdateDate : null,
      isEmailMendatory: form?.isEmailMendatory,
      sections: [...sections],
    };

    try {
      const res = await axios.post(formsService.createForm, {
        form: newForm,
        user: getUserFromLocalStorage(),
      });
      if (res.status === 200) {
        form?.formId
          ? successToast("Form Edited SuccessFully")
          : successToast("Form Created SuccessFully");
        push("/AllForms");
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailMandatory = () => {
    setForm((prevForm) => ({
      ...prevForm,
      isEmailMendatory: !prevForm.isEmailMendatory,
    }));
  };

  // ref used
  const handleTitleChange = (event, element) => {
    // event.preventDefault();
    // event.stopPropagation();

    if (event.target.id === "section") {
      const sectionsClone = [...sections];
      sectionsClone[activeSectionIndex] = {
        ...sectionsClone[activeSectionIndex],
      };
      sectionsClone[activeSectionIndex].sectionTitle = event.target.value;
      setSections(sectionsClone);
      return;
    }

    nodeRef.current = event.target;
    const sectionsClone = [...sections];
    sectionsClone[activeSectionIndex] = {
      ...sectionsClone[activeSectionIndex],
    };

    sectionsClone[activeSectionIndex].elements = [
      ...sectionsClone[activeSectionIndex].elements,
    ];

    const foundElementIndex = sectionsClone[
      activeSectionIndex
    ].elements.findIndex((e) => e.id === element.id);

    if (foundElementIndex >= 0) {
      sectionsClone[activeSectionIndex].elements[foundElementIndex] = {
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex],
      };

      sectionsClone[activeSectionIndex].elements[foundElementIndex] = {
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex],
        elementTitle: event.target.value,
      };
      setSections(sectionsClone);
    }
  };

  // ref used
  const handleDescriptionChange = (event, element) => {
    if (event.target.id === "section") {
      const sectionsClone = [...sections];
      sectionsClone[activeSectionIndex] = {
        ...sectionsClone[activeSectionIndex],
      };
      sectionsClone[activeSectionIndex].sectionDescription = event.target.value;
      setSections(sectionsClone);
      return;
    }

    nodeRef.current = event.target;
    const sectionsClone = [...sections];
    sectionsClone[activeSectionIndex] = {
      ...sectionsClone[activeSectionIndex],
    };

    sectionsClone[activeSectionIndex].elements = [
      ...sectionsClone[activeSectionIndex].elements,
    ];

    const foundElementIndex = sectionsClone[
      activeSectionIndex
    ].elements.findIndex((e) => e.id === element.id);

    if (foundElementIndex >= 0) {
      sectionsClone[activeSectionIndex].elements[foundElementIndex] = {
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex],
      };

      sectionsClone[activeSectionIndex].elements[foundElementIndex] = {
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex],
        elementDescription: event.target.value,
      };
      setSections(sectionsClone);
    }
  };

  const handleAddOption = (event, element) => {
    const sectionsClone = [...sections]; // sections clone

    sectionsClone[activeSectionIndex] = {
      ...sectionsClone[activeSectionIndex],
    }; // clone active section

    sectionsClone[activeSectionIndex].elements = [
      ...sectionsClone[activeSectionIndex].elements,
    ]; // clone active section elements

    const foundElementIndex = sectionsClone[
      activeSectionIndex
    ].elements.findIndex((e) => e.id === element.id); // find changed element

    if (foundElementIndex >= 0) {
      sectionsClone[activeSectionIndex].elements[foundElementIndex] = {
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex],
      }; // clone changed element

      sectionsClone[activeSectionIndex].elements[foundElementIndex].fields = [
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex].fields,
      ]; // clone changed element fields

      sectionsClone[activeSectionIndex].elements[foundElementIndex].fields[0] =
        {
          ...sectionsClone[activeSectionIndex].elements[foundElementIndex]
            .fields[0],
        }; // clone changed element first field

      sectionsClone[activeSectionIndex].elements[
        foundElementIndex
      ].fields[0].options = [
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex]
          .fields[0].options,
      ]; // clone changed element first field => options

      sectionsClone[activeSectionIndex].elements[
        foundElementIndex
      ].fields[0].options = [
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex]
          .fields[0].options,
        {
          title: "",
          value: "",
          isVisible: true,
          isDefault: true,
        },
      ]; // add new empty option in => options

      setSections(sectionsClone);
    } else {
      console.log("element not found in sections");
    }
  };

  // ref used
  const handleElementOptionChange = (event, element, optionIndex) => {
    nodeRef.current = event.target;
    const sectionsClone = [...sections]; // sections clone

    sectionsClone[activeSectionIndex] = {
      ...sectionsClone[activeSectionIndex],
    }; // clone active section

    sectionsClone[activeSectionIndex].elements = [
      ...sectionsClone[activeSectionIndex].elements,
    ]; // clone active section elements

    const foundElementIndex = sectionsClone[
      activeSectionIndex
    ].elements.findIndex((e) => e.id === element.id); // find changed element

    if (foundElementIndex >= 0) {
      sectionsClone[activeSectionIndex].elements[foundElementIndex] = {
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex],
      }; // clone changed element

      sectionsClone[activeSectionIndex].elements[foundElementIndex].fields = [
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex].fields,
      ]; // clone changed element fields

      sectionsClone[activeSectionIndex].elements[foundElementIndex].fields[0] =
        {
          ...sectionsClone[activeSectionIndex].elements[foundElementIndex]
            .fields[0],
        }; // clone changed element first field

      sectionsClone[activeSectionIndex].elements[
        foundElementIndex
      ].fields[0].options = [
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex]
          .fields[0].options,
      ]; // clone changed element first field => options

      sectionsClone[activeSectionIndex].elements[
        foundElementIndex
      ].fields[0].options[optionIndex] = {
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex]
          .fields[0].options[optionIndex],
      }; // clone changed element first field => changed option index

      sectionsClone[activeSectionIndex].elements[
        foundElementIndex
      ].fields[0].options[optionIndex] = {
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex]
          .fields[0].options[optionIndex],
        title: event.target.value,
        value: event.target.value,
      }; // update (title & value) of changed option

      setSections(sectionsClone);
    } else {
      console.log("element not found in sections");
    }
  };

  const handleElementClone = ({ elementType }) => {
    handleAddElement(elementType);
  };

  const invertElementProperty = (property, element) => {
    const sectionsClone = [...sections]; // sections clone

    sectionsClone[activeSectionIndex] = {
      ...sectionsClone[activeSectionIndex],
    }; // clone active section

    sectionsClone[activeSectionIndex].elements = [
      ...sectionsClone[activeSectionIndex].elements,
    ]; // clone active section elements

    const foundElementIndex = sectionsClone[
      activeSectionIndex
    ].elements.findIndex((e) => e.id === element.id); // find changed element

    if (foundElementIndex >= 0) {
      sectionsClone[activeSectionIndex].elements[foundElementIndex] = {
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex],
      }; // clone changed element

      sectionsClone[activeSectionIndex].elements[foundElementIndex] = {
        ...sectionsClone[activeSectionIndex].elements[foundElementIndex],
        [property]:
          !sectionsClone[activeSectionIndex].elements[foundElementIndex][
            property
          ],
      }; // invert property of and element

      return sectionsClone;
      // setSections(sectionsClone);
    } else {
      console.log("No Element matched");
    }
  };

  const handleElementVisibility = (element) => {
    const newSections = invertElementProperty("isVisible", element);
    setSections(newSections);
  };

  const handleElementRequired = (element) => {
    const newSections = invertElementProperty("isRequired", element);
    setSections(newSections);
  };

  const handleElememtPrimary = (element) => {
    const newSections = invertElementProperty("isPrimary", element);
    setSections(newSections);
  };

  const handleDragAndDropElement = ({ oldIndex, newIndex }) => {
    console.log("handleDragAndDropElement");
    const sectionsClone = [...sections]; // clone sections

    sectionsClone[activeSectionIndex] = {
      ...sectionsClone[activeSectionIndex],
    }; // clone active section

    sectionsClone[activeSectionIndex].elements = [
      ...sectionsClone[activeSectionIndex].elements,
    ]; // clone active section elements

    sectionsClone[activeSectionIndex].elements = arrayMove(
      sectionsClone[activeSectionIndex].elements,
      oldIndex,
      newIndex
    ); // change position of element in elements array

    setSections(sectionsClone);
  };

  if (!user)
    return (
      <Spinner
        styles={{ position: "fixed", inset: 0 }}
        message="Getting Your Requested Page..."
      />
    );

  if (isFetching) return <Spinner message="Getting Form Data Please Wait..." />;

  if (!isFetching)
    return (
      <div className="content-wrapper application_form">
        {/* CENTER CONTENT AREA */}
        <div
          className="application_form_content"
          style={{
            backgroundColor: pageBgImg === null ? pageBgColor : "",
            backgroundImage: pageBgImg ? `url(${pageBgImg})` : "",
          }}
        >
          <TopHeader
            form={form}
            sections={sections}
            formTitleRef={formTitleRef}
            onActiveSection={handleActiveSection}
          />
          <div
            className="application_form_area registered_class_information"
            style={
              formBgImg !== null
                ? {
                    maxWidth: `${formWidth}px`,
                    background: `url(${formBgImg})`,
                  }
                : {
                    maxWidth: `${formWidth}px`,
                    backgroundColor: formBgColor,
                  }
            }
          >
            {isPreviewActive && (
              <PreviewForm
                sections={sections}
                onEditSection={handleEditSection}
              />
            )}
            {!isPreviewActive && (
              <>
                <ContainerHeader
                  form={form}
                  sections={sections}
                  activeSectionIndex={activeSectionIndex}
                  isSaveLoading={isSubmitting}
                  onAddSection={handleAddSection}
                  onEditSection={handleEditSection}
                  onDeleteSection={handleDeleteSection}
                  onModalOpen={handleModalOpen}
                  onEmailMandatory={handleEmailMandatory}
                  onSave={handleSaveForm}
                />
                <ContainerContent
                  sections={sections}
                  sectionIndex={activeSectionIndex}
                  onAddOption={handleAddOption}
                  onElementClone={handleElementClone}
                  onElementDelete={handleElementDelete}
                  onElementPrimary={handleElememtPrimary}
                  onElementTitleChange={handleTitleChange}
                  onElementRequired={handleElementRequired}
                  onElementVisible={handleElementVisibility}
                  onDragDropElement={handleDragAndDropElement}
                  onElementOptionChange={handleElementOptionChange}
                  onElementDescriptionChange={handleDescriptionChange}
                />
              </>
            )}
          </div>
          <div ref={sectionsEndRef} />
        </div>

        {/* LEFT DRAWER ACTIVATOR */}
        <button
          className="drawer-btn drawer-btn-left"
          onClick={() => setIsLeftDrawerActive(!isLeftDrawerActive)}
        >
          <i className="fa fa-pencil-square-o"></i>
        </button>
        {/* LEFT DRAWER */}
        <LeftDrawer isOpen={isLeftDrawerActive} onClose={handleLeftClosing} />
        {/* RIGHT DRAWER ACTIVATOR */}
        <button
          className="drawer-btn drawer-btn-right"
          onClick={() => setIsRightDrawerActive(!isRightDrawerActive)}
        >
          <i className="fa fa-plus-circle"></i>
        </button>
        {/* RIGHT DRAWER */}
        <Drawer
          right
          drawerWidth={200}
          isOpen={isRightDrawerActive}
          onClose={handleRightClosing}
        >
          <RightDrawerContent onAddElement={handleAddElement} />
        </Drawer>
        <ConfirmationModal
          message="Are you sure you want to delete this section ?"
          show={isConfirmationModalOpen}
          onModalClick={handleModal}
        />
      </div>
    );

  return null;
};

export default NewForm;
