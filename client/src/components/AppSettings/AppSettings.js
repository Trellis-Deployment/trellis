import AppName from "./AppNameCard";
import GitRepo from "./GitRepoCard";
import AppDescription from "./AppDescriptionCard";
import AddUsers from "./AddUsersCard";
import DeleteApp
 from "./DeleteAppCard";
import AppStages from "./AppStagesCard";
import { useAppContext } from "../../Lib/AppContext";
import { useEffect, useState } from "react";
import APICalls from "../../services/APICalls";
const AppSettings = () => {
  const [ app, setApp ] = useState();
  const { appId } = useAppContext();
  const [ stages, setStages ] = useState([]);
  
  useEffect(() => {
    const getApp = async() => {
      try {
        const appPromise = APICalls.getApp(appId);
        const stagesPromise = APICalls.getStages(appId);
        const [ app, stages ] = await Promise.all([appPromise, stagesPromise]);
        setStages(stages);
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


  return (
    <div className="container pipes mt-3 mid-card holder">
    <div className="row">
      <div className="col pipeline-title mt-1">Settings</div>
    </div>
    {
    app ?
      <>
        <AppName setApp={setApp} app={app}/>
        <GitRepo setApp={setApp} app={app}/>
        <AppDescription setApp={setApp} app={app}/>
        <AddUsers setApp={setApp} app={app}/>
        <AppStages setApp={setApp} app={app} stages={stages} setStages={setStages}/>
        <DeleteApp stages={stages}></DeleteApp>
      </> :
      null
    }
  </div>
  );
}

export default AppSettings;