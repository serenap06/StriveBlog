import { createContext, useEffect, useState } from "react";
import { API_URL } from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authorData, setAuthorData] = useState(null)

 
  const fetchAuthor = async (currentToken) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if(response.ok){
        const data = await response.json()
        setAuthorData(data)
        console.log(data)
      }else{
        setToken(null)
      }
    } catch (e) {
      console.error("Errore nel recupero dell'utente")
    }
  };

   useEffect(() => {
    
    if (token) {
      localStorage.setItem("token", token);
      if (!authorData) {
        fetchAuthor(token);
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("author");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        authorData,
        setAuthorData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
