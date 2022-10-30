import "../stylesheets/Main.css";
// import"./Development/Header.css";
// import Button from "react-bootstrap/Button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import Trellis from "../Resources/trellis_ph_clear900.png";
import Image from "react-bootstrap/Image";
import { useAppContext } from "../Lib/AppContext";
// import DisabledButton from "./Development/DisabledButton";
import Header from "./Development/Header";

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
