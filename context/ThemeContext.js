import React, { useState } from "react";

const colorOptions = [
  {
    name: "default",
    inputStyle: "default",
    themeColor: "#f1f1f1",
    primaryColor: "#333333",
    secondaryColor: "#333333",
    tertiaryColor: "#333333",
    pageBgColor: "#e3e3e3",
    toggleIconColor: "#333333",
    iconColor: "#333333",
    sidebarBgColor: "#e1e1e1",
    formBgColor: "#f5f5f5",
    inputBgColor: "#ffffff",
    whiteColor: "#ffffff",
    textColor: "#333333",
    labelColor: "#333333",
    fontColor: "#333333",
    formBgImg: null,
    pageBgImg: null,
    formWidth: 1024,
    labelAlignment: "top",
  },
  {
    name: "primary",
    inputStyle: "default",
    themeColor: "#5b017d",
    primaryColor: "#5b017d",
    secondaryColor: "#fb0874",
    tertiaryColor: "#32dcdc",
    pageBgColor: "#5b017d",
    toggleIconColor: "#5b017d",
    iconColor: "#da77f2",
    sidebarBgColor: "#710698",
    formBgColor: "#ffffff",
    inputBgColor: "#ffffff",
    whiteColor: "#ffffff",
    textColor: "#ffffff",
    labelColor: "#ffffff",
    fontColor: "#5b017d",
    formBgImg: null,
    pageBgImg: null,
    formWidth: 1024,
    labelAlignment: "top",
  },
  {
    name: "secondary",
    inputStyle: "default",
    themeColor: "#b3d37a",
    primaryColor: "#343D22",
    secondaryColor: "#876445",
    tertiaryColor: "#76BA99",
    pageBgColor: "#b3d37a",
    toggleIconColor: "#b3d37a",
    iconColor: "#ffffff",
    sidebarBgColor: "#9cb76d",
    formBgColor: "#F4FFDF",
    textColor: "#ffffff",
    labelColor: "#566639",
    whiteColor: "#ffffff",
    inputBgColor: "#F4FFDF",
    fontColor: "#343D22",
    formBgImg: null,
    pageBgImg: null,
    formWidth: 1024,
    labelAlignment: "top",
  },
  {
    name: "tertiary",
    inputStyle: "default",
    themeColor: "#83d0e4",
    primaryColor: "#09314F",
    secondaryColor: "#ffafcc",
    tertiaryColor: "#cdb4db",
    pageBgColor: "#83d0e4",
    toggleIconColor: "#83d0e4",
    iconColor: "#09314F",
    sidebarBgColor: "#a2d2ff",
    formBgColor: "#F0FCFF",
    textColor: "#264B67",
    labelColor: "#264B67",
    whiteColor: "#ffffff",
    inputBgColor: "#F0FCFF",
    fontColor: "#09314F",
    formBgImg: null,
    pageBgImg: null,
    formWidth: 1024,
    labelAlignment: "top",
  },
];

export const ThemeContext = React.createContext({
  themeOptions: [],
  activeTheme: "",
  selectedTheme: {},
  setActiveTheme: () => {},
  setSelectedTheme: () => {},
});

ThemeContext.displayName = "ThemeContext";

export const ThemeContextProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState({
    name: "default",
    inputStyle: "default",
    themeColor: "#f1f1f1",
    primaryColor: "#333333",
    secondaryColor: "#333333",
    tertiaryColor: "#333333",
    pageBgColor: "#e3e3e3",
    toggleIconColor: "#333333",
    iconColor: "#333333",
    sidebarBgColor: "#e1e1e1",
    formBgColor: "#f5f5f5",
    inputBgColor: "#ffffff",
    whiteColor: "#ffffff",
    textColor: "#333333",
    labelColor: "#333333",
    fontColor: "#333333",
    formBgImg: null,
    pageBgImg: null,
    formWidth: 1024,
    labelAlignment: "top",
  });
  const [activeTheme, setActiveTheme] = useState("default");

  return (
    <ThemeContext.Provider
      value={{
        selectedTheme,
        setSelectedTheme,
        activeTheme,
        setActiveTheme,
        themeOptions: colorOptions,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
