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
    <div class="pt-4">
      <div class="px-4">
        {/* <div class="d-flex-center align-items-center justify-content-center"> */}
        <div class="row">
          <div class="col">
            <Image fluid="true" src={Trellis} className="App-logo" alt="logo" />
          </div>
          <div class="col">
            <div class="row">
              <h2 class="text-light pt-2">Welcome to Trellis</h2>
            </div>
            <div class="row">
              <h5 class="text-white pb-2">
                An open-source CI/CD pipeline dedicated to simplifying
                deployments
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
