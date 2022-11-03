import "../stylesheets/GitRedirect.css";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import APICalls from "../services/APICalls";
import Waiting from "../Resources/Trellis_house.jpg";
import Image from "react-bootstrap/Image";
import { useAppContext } from "../Lib/AppContext";
import { PersonPlusFill } from "react-bootstrap-icons";

const GitRedirect = () => {
  const [searchParams] = useSearchParams();
  const [authenticated, setAuthenticated] = useState(false);
  const code = searchParams.get("code");
  const application = searchParams.get("installation_id");
  const navigate = useNavigate();
  const { setAuthUser, setUserId } = useAppContext();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        if (application) {
          const data = await APICalls.signup(code);
          setAuthUser(data.user.githubLogin);
          setUserId(data.user.userId)
          setAuthenticated(true);
          window.sessionStorage.setItem("trellisAuthUser", data.user.githubLogin);
          window.sessionStorage.setItem("trellisUserId", data.user.userId);
          if (data.user.new === false) {
            alert(`${data.user.githubLogin} is already signed up, retrieving your information`);
          }
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
          window.sessionStorage.setItem("trellisAuthUser", data.user.githubLogin);
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
    <div>
      <div className="position-absolute top-50 start-50 translate-middle wait pb-1 px-2">
        <header className="App-header pt-3 pb-2">
          <div className="container">
            <Image src={Waiting} className="App-logo" alt="logo" fluid="true" />
          </div>
        </header>
        <div className="text-center">
        <div className="spinner-grow" role="status"><PersonPlusFill color="black" size={30}></PersonPlusFill></div>
          <h3 className="box text-dark p-1">
            {authenticated
              ? `Congratulations you signed in`
              : `Waiting for Authentication`}
          </h3>
        </div>
      </div>
      <div> </div>
    </div>
  );
};

export default GitRedirect;
