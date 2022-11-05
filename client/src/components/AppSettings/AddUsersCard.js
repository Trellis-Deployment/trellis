import { useState, useEffect } from "react";
import { useAppContext } from "../../Lib/AppContext";
import APICalls from "../../services/APICalls";
import CardLayout from "./CardLayout";
import AddUsersForm from "./forms/AddUsersForm";

const AddUsers = ({ app, setApp }) => {
  
  const [ users, setUsers ] = useState([]); // Full details about users
  const [ appUsers, setAppUsers ] = useState(); // loginOfAppUsers
  const appOwnerLogin = users.length !== 0 ? users.find(user => user.userId === app.userId).githubLogin : '';
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await APICalls.getUsers();
        const users = data;
        const appUsersLogin = app.users.map(userId => {
          const appUser = users.find(user => user.userId === userId);
          return appUser.githubLogin;
        });        
        setAppUsers(appUsersLogin);
        setUsers(users);
      } catch(e) {
        console.log(e.message);
        alert(e.message);
      }
    }

    getUsers();
    
  }, [app.userId, app.users]);
  console.log({appUsers});

  const handleFormSubmit = async (updatedUsersLogins) => {
    const updatedUsersIds = updatedUsersLogins.map(userLogin => users.find(user => user.githubLogin === userLogin).userId);
    const newApp = {...app, users: updatedUsersIds}
    try {
      const data = await APICalls.putApp(newApp);
      setApp(data);
    } catch(e) {
      console.log(e.message);
      alert(e.message);
    }
  }
  
  return (
    <>
      {
        appUsers ? 
          <CardLayout
            property="users"
            appValue={`${appOwnerLogin} ('App Owner') | ${appUsers.join(" |")}`}
            inputForm={<AddUsersForm
              property="users"
              onSubmit={handleFormSubmit}
              users={users.filter(user => user.userId !== app.userId)}
              appUsers={appUsers}
            />}
          /> :
          null
      }
    </>
  )
}

export default AddUsers;