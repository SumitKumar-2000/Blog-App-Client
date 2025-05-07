import React from "react";
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));
  const [authenticated, setAuthenticated] = React.useState(false);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

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
