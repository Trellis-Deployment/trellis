// import '../../App.css';
import './NavigationBar.css'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Dobby from "../../Resources/favicon-32x32.png";
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';

function NavigationBar({authUser, handleLogoutClick, repoName}) {
  const SIGN_UP = `https://github.com/apps/${process.env.REACT_APP_GitHubApp}/installations/new`
  const SIGN_IN = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_Client_ID}`
  const appName = useParams().appName;
  console.log({appName});
  return (    
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="md"
       className="#" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={ Dobby } alt="Dobby Placeholder Logo" class="topicon pe-2"></img>
            Trellis
            { authUser ? ` ➤ ${authUser}` : null}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        { !authUser ? (
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
              <Nav.Link onClick={ handleLogoutClick } variant="dark" size="md">Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar;