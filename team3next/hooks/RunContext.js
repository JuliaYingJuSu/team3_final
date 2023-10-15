import { createContext, useContext, useState } from "react";
import { ThemeProvider } from "react-bootstrap";

const RunContext = createContext({});

export default RunContext;

export const RunContextProvider = ({ children }) => {
  const [run, setRun] = useState(false);
  return (
    <RunContext.Provider value={{ run, setRun }}>
      {children}
    </RunContext.Provider>
  );
};
