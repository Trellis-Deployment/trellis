import AppName from "./AppName";
import GitRepo from "./GitRepo";
import AppDescription from "./AppDescription";
import UnitTest from "./UnitTest";
import AddUsers from "./AddUsers";
import DeleteApp
 from "./DeleteApp";
import { useAppContext } from "../../Lib/AppContext";
import { useEffect, useState } from "react";
import APICalls from "../../services/APICalls";
const AppSettings = () => {
  const [app, setApp] = useState({});
  const { appId } = useAppContext();

  useEffect(() => {
    const getApp = async() => {
      try {
        const app = await APICalls.getApp(appId);
        setApp(app);
      } catch(e) {
        if(e.response.data) {
          alert(e.response.data.error);
        } else {
          alert(e.message);
        }
      }
    }
    getApp();
  }, [appId]);

  console.log({app});

  return (
    <div className="container pipes mt-3 mid-card holder">
    <div className="row">
      <div className="col pipeline-title mt-1">Settings</div>
    </div>
    <AppName appName={app.appName}></AppName>
    <GitRepo repo={app.repoName}></GitRepo>
    <AppDescription description={app.description}></AppDescription>
    <UnitTest></UnitTest>
    <AddUsers users={app.users}></AddUsers>
    <DeleteApp></DeleteApp>
  </div>
  );
}

export default AppSettings;