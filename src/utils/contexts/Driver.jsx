import React from "react";

export const DriverContext = React.createContext();

export const DriverProvider = ({ children }) => {
  const [driver, setDriver] = React.useState({ name: "teste" });
  return (
    <DriverContext.Provider value={{ driver, setDriver }}>
      {children}
    </DriverContext.Provider>
  );
};
