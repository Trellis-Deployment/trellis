import "../stylesheets/Main.css";
import Button from "react-bootstrap/Button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import Header from "./Header/Header";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Trellis from "../Resources/trellis_ph_clear900.png";
import Image from "react-bootstrap/Image";
// import Card from 'react-bootstrap/Card'

const Main = ({ authUser, setAuthUser, handleLogoutClick }) => {
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
    <div className="Main" class="card main m-3 mx-4 p-3">
      <div class="">
        <div class="d-flex justify-content-center">
          <div class="row">
            <div class="col text-center">
              <Image
                // fluid="true"
                src={Trellis}
                class="#"
                className="App-logo"
                alt="logo"
              />
            </div>
            <div class="col">
              <div class="row py-3">
                <h2 class="text-light pt-4">Welcome to Trellis</h2>
              </div>
              <div class="row">
                <h5 class="text-white pb-2">
                  An open-source CI/CD pipeline dedicated to simplifying
                  deployments
                </h5>
                <div class="#">
                  <div class="row pt-3 m-1">
                    <Button
                      size="md"
                      class="sign-buttons"
                      variant="light"
                      href={`https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`}
                    >
                      Signup via Github
                    </Button>
                  </div>
                  <div class="row pt-3 m-1 ">
                    <Button
                      size="md"
                      class="sign-buttons"
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
        {/* <div class="card justified-content-center p-3 m-2" className="mid">
          <Container>
            <Row>
              <Col>
                <div class="d-grid gap-2 col-8 mx-auto">
                  <Button
                    size="md"
                    class="sign-buttons"
                    variant="outline-light"
                    href={`https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`}
                  >
                    Signup via Github
                  </Button>
                </div>
              </Col>
              <Col>
                <div class="d-grid gap-2 col-8 mx-auto">
                  <Button
                    size="md"
                    class="sign-buttons"
                    variant="outline-light"
                    href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_Client_ID}`}
                  >
                    Signin via Github
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div> */}
      </div>
    </div>
  );
};

export default Main;

/*
          
          */
