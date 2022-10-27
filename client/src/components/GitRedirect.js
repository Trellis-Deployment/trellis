// import "../stylesheets/GitRedirect.css";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import APICalls from "../services/APICalls";
import Waiting from "../Resources/Trellis_house.jpg";
import Image from "react-bootstrap/Image";

const GitRedirect = ({ setAuthUser, setUserId }) => {
  const [searchParams] = useSearchParams();
  const [authenticated, setAuthenticated] = useState(false);
  const code = searchParams.get("code");
  const application = searchParams.get("installation_id");
  const navigate = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        if (application) {
          const data = await APICalls.signup(code);
          setAuthUser(data.user.githubLogin);
          setUserId(data.user.userId)
          setAuthenticated(true);
          window.sessionStorage.setItem("authUser", data.user.githubLogin);
          window.sessionStorage.setItem("trellisUserId", data.user.userId);
          navigate("/apps");
        } else {
          const data = await APICalls.signin(code);
          if (!data.user) {
            alert("User not found");
            navigate("/apps");
          }
          setAuthUser(data.user.githubLogin);
          setUserId(data.user.userId);
          setAuthenticated(true);
          window.sessionStorage.setItem("authUser", data.user.githubLogin);
          window.sessionStorage.setItem("trellisUserId", data.user.userId);
          navigate("/apps");
        }
      } catch (e) {
        setAuthenticated(false);
      }
    };
    makeRequest();
  }, [code, navigate, setAuthUser, application, setUserId]);

  return (
    <div className="position-absolute top-50 start-50 translate-middle bg-light">
      <header className="App-header pt-3 pb-2">
        <div className="container">
          <Image src={Waiting} className="App-logo" alt="logo" fluid="true" />
        </div>
      </header>
      <div className="spinner-border text-secondary">
        <strong>{`<`}</strong>
      </div>
      <h3 className="box text-dark p-1">
        {authenticated
          ? `Congratulations you signed in`
          : `Waiting for Authentication`}
      </h3>
    </div>
  );
};

export default GitRedirect;