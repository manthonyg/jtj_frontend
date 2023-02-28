import React from "react";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage.jsx";

export const useAuth = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const [profile, setProfile] = useLocalStorage("profile", null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (user) {
      if (user === "demo") {
        setProfile({
          email: "demouser@jtj.com",
          family_name: "Demo",
          given_name: "Demo",
          id: "123456789",
          link: "https://plus.google.com/123456789",
          locale: "en",
          picture: "https://ui-avatars.com/api/?background=455a64&color=ffffff",
        });
      }
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          navigate("/strikezone", { state: { user: res.data } });
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log({ codeResponse });
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const demoLogin = () => {
    setUser("demo");
  };

  const logout = () => {
    console.log("logging out");
    googleLogout();
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("profile");
    navigate("/login");
  };

  return { user, loading, profile, login, demoLogin, logout };
};
