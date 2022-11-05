import "../../stylesheets/Main.css";
import "./Header.css";
import Shapes from "../Development/Shapes";
// import Shape from "../../Resources/terllis_border_white.svg";
import Trellis from "../../Resources/android-chrome-512x512.png";
import { Github } from "react-bootstrap-icons";

const Header = () => {
  return (
    <div className="home">
      <Shapes></Shapes>
      <div className="row blockade header-inner pb-4 pt-4">
        <div className="container">
          <div className="row">
            <div class="col col-sm align-self-center text-md-end text-sm-center">
              <img src={Trellis} className="img-fluid front" alt="#"></img>
            </div>
            <div class="col-md p-2 ms-4 align-self-md-center">
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
                  <a
                    href={`https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`}
                    className="btn bttn"
                  >
                    Sign Up via Github{" "}
                    <Github className="ms-1" size={20}></Github>
                  </a>
                </div>
                <div>
                  <a
                    href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_Client_ID}`}
                    className="btn bttn "
                  >
                    Sign In via Github{" "}
                    <Github className="ms-1" size={20}></Github>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
