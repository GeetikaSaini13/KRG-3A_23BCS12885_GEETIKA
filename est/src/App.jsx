import { createContext } from "react";
import Profile from "./Profile";

export const userContext = createContext();

const userData = {
  name: "Arjun",
  isLoggedIn: true
};

function App(){
  return(
    <userContext.Provider value={userData}>
      <Profile/>
    </userContext.Provider>
  );
}

export default App;
