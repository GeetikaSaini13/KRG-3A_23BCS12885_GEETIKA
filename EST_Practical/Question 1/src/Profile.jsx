import { useContext } from "react";
import { userContext } from "./App";

function Profile(){
  const user = useContext(userContext);

  return(
    <>
      <h3>LoggedIn: {String(user.isLoggedIn)}</h3>
      <h3>Name: {user.name}</h3>
    </>
  );
}

export default Profile;
