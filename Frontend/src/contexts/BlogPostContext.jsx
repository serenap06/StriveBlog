//import
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../services/api";
import { AuthContext } from "./AuthContext";

//context
export const BlogPostContext = createContext();

//provider
export const BlogPostProvider = ({ children }) => {
  const [blogPostData, setBlogPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const getBlogPosts = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/blogPosts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Impossibile recuperare i post");
      }
      const dataPosts = await response.json();
      if (Array.isArray(dataPosts.blogPosts)) {
        setBlogPostData(dataPosts.blogPosts);
      } else {
        setBlogPostData([]);
        console.log("Formato dati non riconosciuto", dataPosts);
      }
    } catch (e) {
      console.error(e);
      setError("Errore nel caricamento dei post");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogPosts();
  }, []);

  return (
    <BlogPostContext.Provider
      value={{
        blogPostData,
        setBlogPostData,
        isLoading,
        setIsLoading,
        error,
        setError,
        getBlogPosts,
      }}
    >
      {children}
    </BlogPostContext.Provider>
  );
};
