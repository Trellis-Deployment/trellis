import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import Image from "react-bootstrap/Image";
import Trellis from "../../resources/android-chrome-512x512.png";
// import Container from 'react-bootstrap/Container';

const Header = ({ authUser, setAuthUser }) => {
  // const handleLogoutClick = (e) => {
  //   e.preventDefault();
  //   window.sessionStorage.removeItem("authUser");
  //   setAuthUser(undefined);
  // };

  return (
    <div className="pt-4">
      <div className="px-4">
        <Image fluid="true" src={Trellis} className="App-logo" alt="logo" />

        {/* <div className="d-flex-center align-items-center justify-content-center"> */}
        <h2 className="text-light pt-2">Welcome to Dobby</h2>
        <h5 className="text-white pb-2">
          An open-source CI/CD pipeline dedicated to simplifying deployments
        </h5>
        {/* </div> */}
      </div>

    </div>
  );
};

export default Header;