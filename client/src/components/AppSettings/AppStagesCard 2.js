import CardLayout from "./CardLayout";
import StagesForm from "./forms/StagesForm";
import { useState } from "react";

const AppDescription = ({ app, stages, setStages}) => {
  const [ showForm, toggleShowForm ] = useState(false);

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
        setStages={setStages}
      />}
    />
  )
}

export default AppDescription;