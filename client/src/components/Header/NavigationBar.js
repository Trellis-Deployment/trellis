import "../../App.css";
import "../../stylesheets/NavigationBar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Trellis from "../../Resources/Asset 4.svg";
import { LinkContainer } from "react-router-bootstrap";
import { Container } from "react-bootstrap";
import { useAppContext } from "../../Lib/AppContext";
import { useNavigate } from "react-router-dom";

function NavigationBar({ handleLogoutClick }) {
  const SIGN_UP = `https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`;
  const SIGN_IN = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_Client_ID}`;
  const { authUser, appName, setAppName, setAppId } = useAppContext();
  const navigate = useNavigate();

  const handleMainPageClick = (e) => {
    e.preventDefault();
    window.sessionStorage.removeItem("trellisAppName");
    window.sessionStorage.removeItem("trellisAppId");
    setAppName(undefined);
    setAppId(undefined);
    navigate(`/`);
  };
  return (
    <Navbar
      collapseOnSelect
      variant="dark"
      expand="sm"
      className="trellis-navigation animate-nav"
      sticky="top"
    >
      <Container>
        <LinkContainer to="/" onClick={handleMainPageClick}>
          <Navbar.Brand>
            <img
              src={Trellis}
              alt="Trellis Deployment"
              className="icons-trellis me-1"
            ></img>
            Trellis
            {authUser ? ` ➤ ${authUser}` : null}
          </Navbar.Brand>
        </LinkContainer>
        {appName ? (
          <LinkContainer to={`/application/${appName}`}>
            <Navbar.Brand>{` ➤ ${appName}`}</Navbar.Brand>
          </LinkContainer>
        ) : null}
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          {!authUser ? (
            <>
              <Nav>
                <Nav.Link href={SIGN_UP} className="Signup">
                  Sign up
                </Nav.Link>
                <Nav.Link href={SIGN_IN} className="Signup">
                  Sign in
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav>
              <Nav.Link onClick={handleLogoutClick} variant="dark" size="md">
                Logout
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
