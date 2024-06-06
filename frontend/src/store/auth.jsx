import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  // checking sessionStorage on component mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
