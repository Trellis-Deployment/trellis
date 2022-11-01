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
      <div class="row blockade header-inner">
            <div class="col"><img src={Trellis} alt="" className="mx-auto d-block albert" /></div>
        <div className="col home-inner ">
          <div className="text">
            <h3>Welcome to</h3>
            <h1>TRELLIS</h1>
            <p>
              An open-source, low-config deployment pipeline for your serverless
              applications
            </p>
            <a
              href={`https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`}
              className="btn bttn"
            >
               Sign Up via Github <Github class="ms-1" size={20}></Github>
            </a>
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_Client_ID}`}
              className="btn"
            >
              Sign In via Github <Github class="ms-1" size={20}></Github>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Header;
