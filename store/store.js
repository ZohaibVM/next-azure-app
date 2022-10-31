import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
import publishedFormSlice from "./publishedFormSlice";
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {
    allForms: formSlice,
    publishedForm: publishedFormSlice,
  },
});
export default store;

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
