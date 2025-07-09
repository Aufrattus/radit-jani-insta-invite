import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in, if not redirect to login
    const currentGuest = localStorage.getItem("currentGuest");
    if (!currentGuest) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return null; // This will be handled by the redirect
};

export default Index;
