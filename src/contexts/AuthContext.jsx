import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isSigned, setIsSigned] = useState(false);

  return <AuthContext.Provider value={{ isSigned, setIsSigned }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthContextProvider;
