import { useState, useEffect, useRef } from "react";
import { createElement, errorToast, successToast } from "./../utils/utils";
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
import { useForm } from "./../context/CreateFormContext";

const NewForm = () => {
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
  const [form, setForm] = useState(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const sectionsEndRef = useRef(null);

  const {
    push,
    query: { formId },
    pathname,
  } = useRouter();

  const { addFormsJSON } = useForm();

  useEffect(() => {
    const initValues = async () => {
      if (pathname.includes("NewForm")) {
        setIsFetching(false);
        return;
      }

      if (formId) {
        const newForms = [];
        try {
          const { data } = await axios.get(formsService.getForms);
          newForms = [...data?.forms];
        } catch (error) {
          console.log(error);
          errorToast("Something went wrong");
          push("/");
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
          });
          setIsFetching(false);
        } else {
          errorToast("404: Form Not Found");
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

  const handleElementsClick = ({ currentTarget }) => {
    const name = currentTarget.id;
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
      formTitle: form?.formTitle ? form.formTitle : "New Form Title",
      formDescription: form?.formDescription ? form?.formDescription : "",
      creationDate: form?.creationDate ? form.creationDate : Date.now(),
      lastUpdateDate: form?.lastUpdateDate ? form?.lastUpdateDate : null,
      sections: [...sections],
    };

    // console.log({ form });
    // console.log({ newForm });

    try {
      const res = await axios.post(formsService.createForm, { form: newForm });
      if (res.status === 200) {
        // console.log(res);
        form?.formId
          ? successToast("Form Edited SuccessFully")
          : successToast("Form Created SuccessFully");

        // Refactor this context code
        addFormsJSON(newForm);
        push("/");
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  sections={sections}
                  activeSectionIndex={activeSectionIndex}
                  isSaveLoading={isSubmitting}
                  onAddSection={handleAddSection}
                  onEditSection={handleEditSection}
                  onDeleteSection={handleDeleteSection}
                  onModalOpen={handleModalOpen}
                  onSave={handleSaveForm}
                />
                <ContainerContent
                  sections={sections}
                  sectionIndex={activeSectionIndex}
                  onElementDelete={handleElementDelete}
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
          <RightDrawerContent handleElementsClick={handleElementsClick} />
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
