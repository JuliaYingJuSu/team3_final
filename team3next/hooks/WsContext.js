import React, { createContext, useContext, useState } from "react";

const WsContext = createContext({});
export default WsContext;

export const WsContextProvider = ({ children }) => {
  const [wsMsgs, setWsMsgs] = useState([]);

  return (
    <WsContext.Provider value={{ wsMsgs, setWsMsgs }}>
      {children}
    </WsContext.Provider>
  );
};
