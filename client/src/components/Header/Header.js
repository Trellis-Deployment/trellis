import "../../stylesheets/Main.css";
import "./Header.css";
import Shapes from "../Development/Shapes";
import { Github } from "react-bootstrap-icons";
import Logo from "../../Resources/Motion/logo_intro_5.mov";
import { Row, Col } from "react-bootstrap";

const Header = () => {
  const SIGN_UP = `https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`;
  const SIGN_IN = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_Client_ID}`;
  return (
    <div className="home">
      <Shapes></Shapes>
      <Row className="blockade header-inner pb-4 pt-4">
        <div className="container">
          <Row>
            <Col className="col-sm align-self-center text-md-end text-sm-center">
              <video className="VideoTag intro" autoPlay muted>
                <source src={Logo} type="video/mp4" />
              </video>
            </Col>
            <Col className="col-md p-2 ms-4 align-self-md-center">
              <div className="text-md-start text-sm-center">
                <h3>Welcome to</h3>
                <h1>TRELLIS</h1>
                <div>
                  <p>
                    An open-source, low-config deployment pipeline for your
                    serverless applications
                  </p>
                </div>
                <div>
                  <a href={SIGN_UP} className="btn bttn">
                    Sign Up via Github{" "}
                    <Github className="ms-1" size={20}></Github>
                  </a>
                </div>
                <div>
                  <a href={SIGN_IN} className="btn bttn ">
                    Sign In via Github{" "}
                    <Github className="ms-1" size={20}></Github>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default Header;
