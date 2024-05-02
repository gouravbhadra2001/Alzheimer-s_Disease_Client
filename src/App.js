
import './App.css';
import "./styles/hamburger.css"
import "./styles/navBar.css"
import "./styles/prediction.css"
import "./styles/main.css"
import NavBar from "./Components/NavBar";
import Main from "./Components/Main";

import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useState } from 'react';



const ActiveContext = createContext()


function App() {
 
  const { /*loginWithRedirect ,*/ isAuthenticated, /*logout,*/ user} = useAuth0();

 const [activeIndex, setActiveIndex] = useState(0)


  return (
    <>
    <div className="App" >
    
  

<ActiveContext.Provider value={{activeIndex, setActiveIndex}}>
<NavBar />

      <Main />
</ActiveContext.Provider>

      
    </div>
    </>
  );
}

export default App;
export { ActiveContext };