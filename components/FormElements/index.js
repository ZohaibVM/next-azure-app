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

export const renderSectionElements = (element, onElementDelete) => {
  switch (element?.elementType) {
    case "heading":
      return (
        <Elements.FormHeading
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "address":
      return (
        <Elements.FormAddress
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "full name":
      return (
        <Elements.FormName
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "phone number":
      return (
        <Elements.FormPhoneNumber
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "email address":
      return (
        <Elements.FormEmail
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "time":
      return (
        <Elements.FormTime
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "date":
      return (
        <Elements.FormDate
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "integer":
      return (
        <Elements.FormInteger
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "decimal":
      return (
        <Elements.FormDecimel
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "long text":
      return (
        <Elements.FormLongText
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "short text":
      return (
        <Elements.FormShortText
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "multiple choice":
      return (
        <Elements.FormMultiChoice
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "single choice":
      return (
        <Elements.FormSingleChoice
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "file upload":
      return (
        <Elements.FormFileUpload
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "dropdown":
      return (
        <Elements.FormDropdown
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "scale rating":
      return (
        <Elements.FormScaleRating
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );
    case "signature":
      return (
        <Elements.FormSignature
          key={element?.id}
          data={element}
          onElementDelete={onElementDelete}
        />
      );

    default:
      return "No Element Matched";
  }
};
export default Elements;
