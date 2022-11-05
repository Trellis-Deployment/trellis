import APICalls from "../../services/APICalls";
import CardLayout from "./CardLayout";
import NameAndDescriptionForm from "./forms/NameAndDescriptionForm";
import { useState } from "react";

const AppDescription = ({ app, setApp}) => {
  const [ showForm, toggleShowForm ] = useState(false);

  const handleFormSubmit = async (description) => {
    const newApp = {...app, description: description};
    try {
      const data = await APICalls.putApp(newApp);
      setApp(data);
    } catch(e) {
      console.log(e.message);
      alert(e.message);
    }
  }
  return (
    <CardLayout
      property="description"
      appValue={app.description}
      showForm={showForm}
      toggleShowForm={toggleShowForm}
      inputForm={<NameAndDescriptionForm
        property="description"
        onSubmit={handleFormSubmit}
        toggleShowForm={toggleShowForm}
      />}
    />
  )
}

export default AppDescription;