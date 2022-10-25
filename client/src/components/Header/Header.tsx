import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
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
        <h2 class="text-light pt-2">Welcome to Trellis</h2>
        <h5 class="text-white pb-2">
          An open-source CI/CD pipeline dedicated to simplifying deployments
        </h5>
        {/* </div> */}
      </div>

    </div>
  );
};

export default Header;
