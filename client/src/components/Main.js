import "../stylesheets/Main.css";
import Button from "react-bootstrap/Button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
    <div className="Main" class="card main mx-3 mt-3 pt-0 pb-3 ">
      <div class="">
        <div class="d-flex justify-content-center">
          <Header
            authUser={authUser}
            setAuthUser={setAuthUser}
            handleLogoutClick={handleLogoutClick}
          ></Header>
        </div>
        <div class="card justified-content-center p-3 m-2" className="mid">
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
        </div>
      </div>
    </div>
  );
};

export default Main;

/*
          
          */