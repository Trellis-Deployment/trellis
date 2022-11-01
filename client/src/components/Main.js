import "../stylesheets/Main.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../Lib/AppContext";
import Header from "./Header/Header";

const Main = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();
  const { authUser } = useAppContext();
  useEffect(() => {
    if (!authUser) {
      return;
    } else {
      if (!redirect || redirect === "apps") {
        navigate("/apps");
      } else if (redirect === "create-app") {
        navigate("/create-app");
      }
    }
  }, [authUser, navigate, redirect]);

  return (
    <div className="pt-1">
      <Header></Header>
    </div>
  );
};

export default Main;
