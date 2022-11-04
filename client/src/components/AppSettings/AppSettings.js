import AppName from "./AppName";
import GitRepo from "./GitRepo";
import AppDescription from "./AppDescription";
import UnitTest from "./UnitTest";
import AddUsers from "./AddUsers";
import DeleteApp
 from "./DeleteApp";
import { useAppContext } from "../../Lib/AppContext";
import { useEffect } from "react";
const AppSettings = () => {
  const { appId } = useAppContext();

  useEffect(() => {

  }, []);
  
  return (
    <div className="container pipes mt-3 mid-card holder">
    <div className="row">
      <div className="col pipeline-title mt-1">Settings</div>
    </div>
    <AppName></AppName>
    <GitRepo></GitRepo>
    <AppDescription></AppDescription>
    <UnitTest></UnitTest>
    <AddUsers></AddUsers>
    <DeleteApp></DeleteApp>
  </div>
  );
}

export default AppSettings;