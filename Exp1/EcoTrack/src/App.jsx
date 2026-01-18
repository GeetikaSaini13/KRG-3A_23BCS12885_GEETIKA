import Header from "./components/Header";
import Logs from "./pages/Logs";
import Dashboard from "./pages/dashboard";

const App=()=>{
  return (
<>
  <Header title= "Ecotrack-Experiment 1"/>
  <main style={{padding:"1rem"}}>
  <Dashboard/>
  <br></br>
  <Logs/>
</main>


</>
  );
}
export default App;