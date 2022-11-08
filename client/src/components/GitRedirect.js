import "../stylesheets/GitRedirect.css";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import APICalls from "../services/APICalls";
import { useAppContext } from "../Lib/AppContext";
import Trell from "../Resources/Motion/trellis loop.mov";

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
    <div className="text-center">
      <div>
        <div>
          <video className="VideoTag loop1" autoPlay loop muted>
            <source src={Trell} type="video/mp4" />
          </video>
        </div>
        <div>
          <h2 className="waiting-auth mt-3 text-center animate-wait">
            {authenticated
              ? `Congratulations you signed in`
              : `Waiting for Authentication`}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GitRedirect;
