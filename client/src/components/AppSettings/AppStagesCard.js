import APICalls from "../../services/APICalls";
import CardLayout from "./CardLayout";
import StagesForm from "./forms/StagesForm";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Lib/AppContext";

const AppDescription = ({ app, setApp}) => {
  const [ showForm, toggleShowForm ] = useState(false);
  const [ stages, setStages ] = useState([]);
  const { appId } = useAppContext();

  useEffect(() => {
    const getStages = async() => {
      try {
        const data = await APICalls.getStages(appId);
        setStages(data);
      } catch(e) {
        console.log(e.message);
        alert(e.message);
      }
    }

    getStages();
  }, [appId]);
  return (
    <CardLayout
      property="stages"
      appValue={stages.map(stage => stage.stageName).join(' | ')}
      showForm={showForm}
      toggleShowForm={toggleShowForm}
      inputForm={<StagesForm
        toggleShowForm={toggleShowForm}
        stages={stages}
        app={app}
      />}
    />
  )
}

export default AppDescription;