import APICalls from "../../services/APICalls";
import CardLayout from "./CardLayout";
import { useAppContext } from "../../Lib/AppContext";
import NameAndDescriptionForm from "./forms/NameAndDescriptionForm";
import { useNavigate } from "react-router-dom";

const AppName = ({app, setApp}) => {
  const { setAppName } = useAppContext();
  const navigate = useNavigate();

  const handleFormSubmit = async (name) => {
    const newApp = {...app, appName: name};
    try {
      const data = await APICalls.putApp(newApp);
      setApp(data);
      window.sessionStorage.setItem("trellisAppName", data.appName);
      setAppName(data.appName);
      navigate(`/application/${data.appName}/settings`);
    } catch(e) {
      console.log(e.message);
      alert(e.message);
    }
  }
  return (
    <CardLayout
      property="name"
      appValue={app.appName}
      inputForm={<NameAndDescriptionForm
        property="name"
        onSubmit={handleFormSubmit}
      />}
    />
  )
}

export default AppName;