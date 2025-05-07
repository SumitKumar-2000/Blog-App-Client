import React from "react";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "@utils/LocalStorage";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(getLocalStorage("token"));
  const [user, setUser] = React.useState(getLocalStorage("user"));
  const [authenticated, setAuthenticated] = React.useState(false);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setLocalStorage("user", userData);
    setLocalStorage("token", authToken);
    setAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthenticated(false);
    removeLocalStorage("user");
    removeLocalStorage("token");
  };

  React.useEffect(() => {
    const storedUser = getLocalStorage("user");
    const storedToken = getLocalStorage("token");

    setUser(storedUser);
    setToken(storedToken);
    setAuthenticated(!!storedUser && !!storedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
