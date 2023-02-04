import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the current user from the server
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      });
  }, []);

  const login = (username: string, password: string) => {
    // Send a login request to the server
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
      });
  };

  const logout = () => {
    // Send a logout request to the server
    fetch("/api/logout").then(() => {
      setUser(null);
    });
  };

  return { user, loading, login, logout };
};
