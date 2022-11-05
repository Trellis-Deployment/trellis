import APICalls from "../../services/APICalls";
import CardLayout from "./CardLayout";
import { useAppContext } from "../../Lib/AppContext";

const AppName = ({app, setApp}) => {
  const { setAppName } = useAppContext();

  const handleFormSubmit = async (name) => {
    const newApp = {...app, appName: name};
    try {
      const data = await APICalls.putApp(newApp);
      setApp(data);
      window.sessionStorage.setItem("trellisAppName", data.appName);
      setAppName(data.appName);
    } catch(e) {
      console.log(e.message);
      alert(e.message);
    }
  }
  return (
    <CardLayout property="name" appValue={app.appName} onSubmit={handleFormSubmit}></CardLayout>
    
  )
}

export default AppName;