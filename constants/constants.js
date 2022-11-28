const ADD_APPLICATION_FORM_STEPS = [
  "Student Information",
  "Parent Information",
  "Education History",
  "Emergency Contact",
  "Review and Submit",
];

const ADD_APPLICATION_FORM_ELEMENTS = [
  {
    name: "Heading",
    type: "heading",
    icon: "fa fa-fw fa-header",
  },
  {
    name: "Address",
    type: "address",
    icon: "fa fa-fw fa-map-marker",
  },
  {
    name: "Full Name",
    type: "full name",
    icon: "fa fa-fw fa-address-card",
  },
  {
    name: "Phone Number",
    type: "phone number",
    icon: "fa fa-fw fa-phone",
  },
  {
    name: "Email Address",
    type: "email address",
    icon: "fa fa-fw fa-envelope-o",
  },
  {
    name: "Time",
    type: "time",
    icon: "fa fa-fw fa-clock-o",
  },
  {
    name: "Date",
    type: "date",
    icon: "fa fa-fw fa-calendar-o",
  },
  {
    name: "Integer",
    type: "integer",
    icon: "fa fa-fw fa-list-ol",
  },
  {
    name: "Decimal",
    type: "decimal",
    icon: "fa fa-fw fa-list-ol",
  },
  {
    name: "Long Text",
    type: "long text",
    icon: "fa fa-fw fa-align-left",
  },
  {
    name: "Short Text",
    type: "short text",
    icon: "fa fa-fw fa-minus",
  },
  {
    name: "Multiple Choice",
    type: "multiple choice",
    icon: "fa fa-fw fa-check-square-o",
  },
  {
    name: "Single Choice",
    type: "single choice",
    icon: "fa fa-fw fa-dot-circle-o",
  },
  {
    name: "File Upload",
    type: "file upload",
    icon: "fa fa-fw fa-upload",
  },
  {
    name: "Dropdown",
    type: "dropdown",
    icon: "fa fa-fw fa-arrow-circle-down",
  },
  {
    name: "Scale Rating",
    type: "scale rating",
    icon: "fa fa-fw fa-signal",
  },
  {
    name: "Signature",
    type: "signature",
    icon: "fa fa-fw fa-ils",
  },
];

const COLORS_PALETTE = [
  "#fb0874", // pink
  "#7cfc00", // lawn green
  "#4839eb", // blue
  "#1b874b", // green
  "#009688", // premium green
  "#ff5722", // orange
  "#fca311", // dark yellow
  "#d90429", // dark red
  "#344e41", // dark green
  "#03045e", // dark blue
  "#2a0800", // darkish brown
];

const APPLICATION_PREVIEW_DROPDOWN_OPTIONS = [
  "Under Review",
  "Approve and invoice",
  "Approve and record payment",
  "Waiting list",
  "Withdraw",
  "Reject",
  "Send Email",
];

const PI_CLASS_CHECK_FAILURE = "Picked item class check fails";
const PI_ROOM_CHECK_FAILURE = "Picked item room check fails";
const PI_TEACHER_CHECK_FAILURE = "Picked item teacher check fails";
const TI_CLASS_CHECK_FAILURE = "Target item class check fails";
const TI_ROOM_CHECK_FAILURE = "Target item room check fails";
const TI_TEACHER_CHECK_FAILURE = "Target item teacher check fails";

const ELEMENTS_DATA = {
  heading: {
    id: "",
    elementType: "heading",
    elementTitle: "Heading",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: false,
    isPrimary: false,
    isVisible: false,
    isTemplateElement: true,
    fields: null,
  },
  address: {
    id: "",
    elementType: "address",
    elementTitle: "Address",
    elementDescription: "",
    isMultiFieldElement: true,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Street Address",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
      {
        order: 2,
        fieldTitle: "Street Address Line 2",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
      {
        order: 3,
        fieldTitle: "City",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
      {
        order: 4,
        fieldTitle: "State/Province",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
      {
        order: 5,
        fieldTitle: "Postal/Zipcode",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
      {
        order: 5,
        fieldTitle: "Country",
        isVisible: true,
        isRequired: true,
        fieldType: "dropdown",
        isMultiSelect: false,
        placeholder: "",
        defaultValue: "",
        value: "",
        options: [
          {
            title: "Option 1",
            value: "opt1",
            isVisible: true,
            isDefault: true,
          },
          {
            title: "Option 2",
            value: "opt2",
            isVisible: true,
            isDefault: false,
          },
          {
            title: "Option 3",
            value: "opt3",
            isVisible: true,
            isDefault: false,
          },
        ],
      },
    ],
  },
  time: {
    id: "",
    elementType: "time",
    elementTitle: "Time",
    elementDescription: "",
    isMultiFieldElement: true,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Hours",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
      {
        order: 2,
        fieldTitle: "Minutes",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
      {
        order: 3,
        fieldTitle: "Period",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
  date: {
    id: "",
    elementType: "date",
    elementTitle: "Date",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Date",
        isVisible: true,
        isRequired: true,
        fieldType: "date",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
  integer: {
    id: "",
    elementType: "integer",
    elementTitle: "Integer",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Integer",
        isVisible: true,
        isRequired: true,
        fieldType: "number",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
  decimal: {
    id: "",
    elementType: "decimal",
    elementTitle: "Decimal",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Decimel",
        isVisible: true,
        isRequired: true,
        fieldType: "number",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
  dropdown: {
    id: "",
    elementType: "dropdown",
    elementTitle: "Dropdown",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Dropdown",
        isVisible: true,
        isRequired: false,
        fieldType: "dropdown",
        isMultiSelect: false,
        placeholder: "",
        defaultValue: "",
        value: "",
        options: [
          {
            title: "Mr.",
            value: "mr",
            isVisible: true,
            isDefault: true,
          },
          {
            title: "Mrs.",
            value: "mrs",
            isVisible: false,
            isDefault: false,
          },
          {
            title: "Ms.",
            value: "ms",
            isVisible: true,
            isDefault: false,
          },
        ],
      },
    ],
  },
  signature: {
    id: "",
    elementType: "signature",
    elementTitle: "Signature",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Signature",
        isVisible: true,
        isRequired: false,
        fieldType: "signature",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
  "full name": {
    id: "",
    elementType: "full name",
    elementTitle: "Full Name",
    elementDescription: "",
    isMultiFieldElement: true,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Prefix",
        isVisible: true,
        isRequired: false,
        fieldType: "dropdown",
        isMultiSelect: false,
        placeholder: "Dummy Text",
        defaultValue: "",
        value: "",
        options: [
          {
            title: "Mr.",
            value: "mr",
            isVisible: true,
            isDefault: true,
          },
          {
            title: "Mrs.",
            value: "mrs",
            isVisible: false,
            isDefault: false,
          },
          {
            title: "Ms.",
            value: "ms",
            isVisible: true,
            isDefault: false,
          },
        ],
      },
      {
        order: 2,
        fieldTitle: "First Name",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "Dummy Text",
        defaultValue: "",
        value: "",
      },
      {
        order: 3,
        fieldTitle: "Middle Name",
        isVisible: true,
        isRequired: false,
        fieldType: "text",
        placeholder: "Dummy Text",
        defaultValue: "",
        value: "",
      },
      {
        order: 4,
        fieldTitle: "Last Name",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "Dummy Text",
        defaultValue: "",
        value: "",
      },
    ],
  },
  "phone number": {
    id: "",
    elementType: "phone number",
    elementTitle: "Phone Number",
    elementDescription: "",
    isMultiFieldElement: true,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Area Code",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
      {
        order: 2,
        fieldTitle: "Phone Number",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
  "email address": {
    id: "",
    elementType: "email address",
    elementTitle: "Email Address",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Email Address",
        isVisible: true,
        isRequired: true,
        fieldType: "email",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
  "long text": {
    id: "",
    elementType: "long text",
    elementTitle: "Long Text",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Long Text",
        isVisible: true,
        isRequired: true,
        fieldType: "textarea",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
  "short text": {
    id: "",
    elementType: "short text",
    elementTitle: "Short Text",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Short Text",
        isVisible: true,
        isRequired: true,
        fieldType: "text",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
  "multiple choice": {
    id: "",
    elementType: "multiple choice",
    elementTitle: "Multiple Choice",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Multichoice",
        isVisible: true,
        isRequired: true,
        fieldType: "dropdown",
        isMultiSelect: true,
        placeholder: "",
        defaultValue: "",
        value: "",
        options: [
          {
            title: "Ms.",
            value: "ms",
            isVisible: true,
            isDefault: false,
          },
        ],
      },
    ],
  },
  "single choice": {
    id: "",
    elementType: "single choice",
    elementTitle: "Single Choice",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Singlechoice",
        isVisible: true,
        isRequired: true,
        fieldType: "dropdown",
        isMultiSelect: false,
        placeholder: "",
        defaultValue: "",
        value: "",
        options: [
          {
            title: "Ms.",
            value: "ms",
            isVisible: true,
            isDefault: false,
          },
        ],
      },
    ],
  },
  "file upload": {
    id: "",
    elementType: "file upload",
    elementTitle: "File Upload",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "File Upload",
        isVisible: true,
        isRequired: true,
        fieldType: "file",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
  "scale rating": {
    id: "",
    elementType: "scale rating",
    elementTitle: "Scale Rating",
    elementDescription: "",
    isMultiFieldElement: false,
    isRequired: true,
    isPrimary: true,
    isVisible: true,
    isTemplateElement: true,
    fields: [
      {
        order: 1,
        fieldTitle: "Scale Rating",
        isVisible: true,
        isRequired: false,
        fieldType: "rating",
        placeholder: "",
        defaultValue: "",
        value: "",
      },
    ],
  },
};

export {
  ADD_APPLICATION_FORM_STEPS,
  ADD_APPLICATION_FORM_ELEMENTS,
  APPLICATION_PREVIEW_DROPDOWN_OPTIONS,
  COLORS_PALETTE,
  PI_CLASS_CHECK_FAILURE,
  PI_ROOM_CHECK_FAILURE,
  TI_CLASS_CHECK_FAILURE,
  TI_ROOM_CHECK_FAILURE,
  PI_TEACHER_CHECK_FAILURE,
  TI_TEACHER_CHECK_FAILURE,
  ELEMENTS_DATA,
};
