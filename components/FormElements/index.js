import FormHeading from "./FormHeading";
import FormSection from "./FormSection";
import FormAddress from "./FormAddress";
import FormName from "./FormName";
import FormPhoneNumber from "./FormPhoneNumber";
import FormTime from "./FormTime";
import FormDate from "./FormDate";
import FormShortText from "./FormShortText";
import FormLongText from "./FormLongText";
import FormInteger from "./FormInteger";
import FormEmail from "./FormEmail";
import FormDecimel from "./FormDecimel";
import FormDropdown from "./FormDropdown";
import FormFileUpload from "./FormFileUpload";
import FormMultiChoice from "./FormMultiChoice";
import FormSingleChoice from "./FormSingleChoice";
import FormScaleRating from "./FormScaleRating";
import FormSignature from "./FormSignature";

const Elements = {
  FormDropdown,
  FormSignature,
  FormScaleRating,
  FormSingleChoice,
  FormMultiChoice,
  FormFileUpload,
  FormInteger,
  FormEmail,
  FormDecimel,
  FormHeading,
  FormAddress,
  FormName,
  FormPhoneNumber,
  FormTime,
  FormDate,
  FormShortText,
  FormLongText,
};

export { FormSection };

export const renderSectionElements = ({
  element,
  onElementDelete,
  onElementTitleChange,
  onElementDescriptionChange,
  onAddOption,
  onElementOptionChange,
  onElementClone,
  onElementPrimary,
  onElementRequired,
  onElementVisible,
}) => {
  switch (element?.elementType) {
    case "heading":
      return (
        <FormHeading
          // key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "address":
      return (
        <FormAddress
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementVisible={onElementVisible}
          onElementPrimary={onElementPrimary}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "full name":
      return (
        <FormName
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "phone number":
      return (
        <FormPhoneNumber
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "email address":
      return (
        <FormEmail
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "time":
      return (
        <FormTime
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "date":
      return (
        <FormDate
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "integer":
      return (
        <FormInteger
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "decimal":
      return (
        <FormDecimel
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "long text":
      return (
        <FormLongText
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "short text":
      return (
        <FormShortText
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "multiple choice":
      return (
        <FormMultiChoice
          // key={element?.id}
          data={element}
          onAddOption={onAddOption}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementOptionChange={onElementOptionChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "single choice":
      return (
        <FormSingleChoice
          // key={element?.id}
          data={element}
          onAddOption={onAddOption}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementOptionChange={onElementOptionChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "file upload":
      return (
        <FormFileUpload
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "dropdown":
      return (
        <FormDropdown
          // key={element?.id}
          data={element}
          onAddOption={onAddOption}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementOptionChange={onElementOptionChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "scale rating":
      return (
        <FormScaleRating
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );
    case "signature":
      return (
        <FormSignature
          // key={element?.id}
          data={element}
          onElementClone={onElementClone}
          onElementDelete={onElementDelete}
          onElementPrimary={onElementPrimary}
          onElementVisible={onElementVisible}
          onElementRequired={onElementRequired}
          onElementTitleChange={onElementTitleChange}
          onElementDescriptionChange={onElementDescriptionChange}
        />
      );

    default:
      return "No Element Matched";
  }
};
export default Elements;
