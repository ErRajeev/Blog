import React, { createContext, useState, useEffect } from "react";
import { FirebaseAuth } from "../../../FirebaseConfig";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
      return;
    }

    const unSubscribe = FirebaseAuth.onAuthStateChanged(
      async (firebaseUser) => {
        if (firebaseUser && firebaseUser.emailVerified) {
          // Set user to state and local storage
          const userToStore = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
          };
          if (localStorage.getItem("expirationTime")) {
            setupAutoLogout(localStorage.getItem("expirationTime"));
          }
          setUser(userToStore);
          localStorage.setItem("user", JSON.stringify(userToStore));

          const expirationTime = firebaseUser.stsTokenManager.expirationTime;
          localStorage.setItem("expirationTime", expirationTime);
          setupAutoLogout(expirationTime);
        } else {
          // Clear user from state and local storage
          console.log("Loooo out");
          handleLogout();
          localStorage.removeItem("user");
          localStorage.removeItem("expirationTime");
        }
      }
    );

    return () => {
      unSubscribe();
      handleLogout(); // Clear user and clean up on unmount
    };
  }, []);

  const setupAutoLogout = (expirationTime) => {
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    if (timeUntilExpiration <= 0) {
      handleLogout(); // Immediately logout if expiration time is past
      return;
    }

    setTimeout(() => {
      handleLogout();
      alert("Your session has expired. Please login again.");
    }, timeUntilExpiration);
  };

  const handleLogout = () => {
    FirebaseAuth.signOut();
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
