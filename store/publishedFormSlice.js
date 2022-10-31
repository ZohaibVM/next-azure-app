import { createSlice } from "@reduxjs/toolkit";

const publishedFormSlice = createSlice({
  name: "publishedForm",
  initialState: {
    values: {},
  },
  reducers: {
    mapFormState: (state, action) => {
      const { form } = action.payload;
      const sections = form.sections.map((sec) => sec);
      const elements = sections
        .map((sec) => sec.elements.map((el) => el))
        .flat();

      const fields = elements.map((elem) => {
        if (elem.elementType === "address") {
          return {
            addressline1: { value: "", required: true, error: false },
            addressline2: { value: "", required: false, error: false },
            city: { value: "", required: true, error: false },
            state: { value: "", required: true, error: false },
            country: { value: "", required: true, error: false },
            zipcode: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "full name") {
          return {
            prefix: { value: "", required: true, error: false },
            firstname: { value: "", required: true, error: false },
            middlename: { value: "", required: false, error: false },
            lastname: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "phone number") {
          return {
            areacode: { value: "", required: true, error: false },
            phonenumber: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "email address") {
          return {
            email: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "time") {
          return {
            hours: { value: "", required: true, error: false },
            minutes: { value: "", required: true, error: false },
            period: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "date") {
          return {
            date: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "integer") {
          return {
            integar: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "decimal") {
          return {
            decimel: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "long text") {
          return {
            longtext: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "short text") {
          return {
            shorttext: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "multiple choice") {
          return {
            multichoice: {
              value: [],
              required: true,
              error: false,
            },
          };
        }
        if (elem.elementType === "single choice") {
          return {
            singlechoice: { value: "", required: true, error: false },
          };
        }
        if (elem.elementType === "file upload") {
          return {
            fileupload: { value: "", required: false, error: false },
          };
        }
        if (elem.elementType === "dropdown") {
          return {
            dropdown: { value: "", required: true, error: false },
          };
        }
      });

      const formValuesObject = fields.reduce(
        (previousValue, currentValue) => ({
          ...previousValue,
          ...currentValue,
        }),
        {}
      );
    },
  },
});

export const { mapFormState } = publishedFormSlice.actions;
export default publishedFormSlice.reducer;
