import React from "react";

export const AuthContext = React.createContext({
  login: () => {},
  logout: () => {},
  user: null,
});
