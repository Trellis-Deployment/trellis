import AppName from "./AppName";
import GitRepo from "./GitRepo";
import AppDescription from "./AppDescription";
import UnitTest from "./UnitTest";
import AddUsers from "./AddUsers";
import DeleteApp
 from "./DeleteApp";
import { useAppContext } from "../../Lib/AppContext";
import { useEffect, useState, useCallback } from "react";
import APICalls from "../../services/APICalls";
const AppSettings = () => {
  const [ app, setApp ] = useState();
  const [ appDescription, setAppDescription ] = useState();
  const [ appRepo, setAppRepo ] = useState();
  const [ appUsers, setAppUsers ] = useState();
  const { appId, appName, setAppName } = useAppContext();
  
  useEffect(() => {
    const getApp = async() => {
      try {
        const app = await APICalls.getApp(appId);
        setApp(app);
        setAppDescription(app.description);
        setAppRepo(app.repoName);
        setAppUsers(app.appUsers);
        setAppName(app.appName);
      } catch(e) {
        if(e.response.data) {
          alert(e.response.data.error);
        } else {
          alert(e.message);
        }
      }
    }
    getApp();
  }, [appId, appUsers, appRepo, appDescription]);


  return (
    <div className="container pipes mt-3 mid-card holder">
    <div className="row">
      <div className="col pipeline-title mt-1">Settings</div>
    </div>
    <AppName appName={appName} setAppName={setAppName}></AppName>
    <GitRepo repo={appRepo} setRepo={setAppRepo}></GitRepo>
    <AppDescription description={appDescription} setDescription={setAppDescription} app={app}></AppDescription>
    <UnitTest></UnitTest>
    <AddUsers users={appUsers} setUsers={setAppUsers}></AddUsers>
    <DeleteApp></DeleteApp>
  </div>
  );
}

export default AppSettings;