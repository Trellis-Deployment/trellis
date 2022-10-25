// import "../stylesheets/GitRedirect.css";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import APICalls from "../services/APICalls";
import Image from "react-bootstrap/Image";

const GitRedirect = ({ setAuthUser }) => {
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
          setAuthUser(data.user.login);
          setAuthenticated(true);
          window.sessionStorage.setItem("authUser", data.user.login);
          navigate("/apps");
        } else {
          const data = await APICalls.signin(code);
          if (!data.user) {
            alert("User not found");
            navigate("/apps");
          }
          setAuthUser(data.user.login);
          setAuthenticated(true);
          window.sessionStorage.setItem("authUser", data.user.login);
          navigate("/apps");
        }
      } catch (e) {
        setAuthenticated(false);
      }
    };
    makeRequest();
  }, [code, navigate, setAuthUser, application]);

  return (
    <div class="position-absolute top-50 start-50 translate-middle bg-light">
      <header className="App-header" class="pt-3 pb-2">
        <div class="container">
          place image here
        </div>
      </header>
      <div class="spinner-border text-secondary">
        <strong>{`<`}</strong>
      </div>
      <h3 class="box text-dark p-1">
        {authenticated
          ? `Congratulations you signed in`
          : `Waiting for Authentication`}
      </h3>
    </div>
  );
};

export default GitRedirect;