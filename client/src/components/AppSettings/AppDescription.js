import APICalls from "../../services/APICalls";
import CardLayout from "./CardLayout";

const AppDescription = ({ app, setApp}) => {
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
    <CardLayout property="description" appValue={app.description} onSubmit={handleFormSubmit}></CardLayout>
    
  )
}

export default AppDescription;