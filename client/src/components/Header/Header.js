import "../../App.css";
import "./Header.css";
import Image from "react-bootstrap/Image";
import Trellis from "../../Resources/trellis_ph_clear900.png";
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
        {/* <div className="d-flex-center align-items-center justify-content-center"> */}
        <div className="row">
          <div className="col">
            <Image fluid="true" src={Trellis} className="App-logo" alt="logo" />
          </div>
          <div className="col">
            <div className="row">
              <h2 className="text-light pt-2">Welcome to Trellis</h2>
            </div>
            <div className="row">
              <h5 className="text-white pb-2">
                An open-source, low-config deployment pipeline for your serverless applications
              </h5>
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default Header;
