import "../stylesheets/Main.css";
import Button from "react-bootstrap/Button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Trellis from "../Resources/trellis_ph_clear900.png";
import Image from "react-bootstrap/Image";

const Main = ({ authUser}) => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();
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
    <div className="card main m-3 mx-4 p-3">
      <div className="">
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col text-center">
              <Image
                src={Trellis}
                className="App-logo"
                alt="logo"
              />
            </div>
            <div className="col">
              <div className="row py-3">
                <h2 className="text-light pt-4">Welcome to Trellis</h2>
              </div>
              <div className="row">
                <h5 className="text-white pb-2">
                  An open-source, low-config deployment pipeline for your
                  serverless applications
                </h5>
                <div className="#">
                  <div className="row pt-3 m-1">
                    <Button
                      size="md"
                      className="sign-buttons"
                      variant="light"
                      href={`https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`}
                    >
                      Signup via Github
                    </Button>
                  </div>
                  <div className="row pt-3 m-1 ">
                    <Button
                      size="md"
                      className="sign-buttons"
                      variant="light"
                      href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_Client_ID}`}
                    >
                      Signin via Github
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
