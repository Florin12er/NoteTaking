// OAuthCallback.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      const redirectUrl = localStorage.getItem("redirectUrl") || "/note";
      localStorage.removeItem("redirectUrl");
      navigate(redirectUrl);
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Processing login...</div>;
};

export default OAuthCallback;
