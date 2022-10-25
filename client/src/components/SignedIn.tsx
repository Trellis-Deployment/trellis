import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import APICalls from "../services/APICalls";

const SignedIn = ({ setAuthUser }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [authenticated, setAuthenticated] = useState(false);
  const code = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const data = await APICalls.authenticate(code);
        setAuthUser(data.user);
        setAuthenticated(true);
        navigate("/repos");
      } catch (e) {
        setAuthenticated(false);
      }
    };
    makeRequest();
  }, [code]);

  return (
    <h1>
      {authenticated
        ? `Congratulations you signed in`
        : `Failed to authenticate`}
    </h1>
  );
};

export default SignedIn;
