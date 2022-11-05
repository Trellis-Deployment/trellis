import handler from "../util/templates/handler";
import getAllUsers from "../util/usersTableUtils/getAllUsers"


export const main = handler(async (event) => {

  try{
    const users = await getAllUsers();
    return(users);
  } catch(e) {
    throw e;
  }
  
});