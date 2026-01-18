import {logs} from '../data/logs';
const Dashboard=()=>{
const  total=logs.reduce((sum,log)=>sum+log.carbon,0); //exporting this function directlty change the data
return(
    <div className="dashboard">
        <h2>Dashboard</h2>
        <p>Total Carbon Footprint: {total} kg</p>
        <ul>
            {logs.map(log=>(
                <li key={log.id}>
                    {log.activity}={log.carbon} kg
                </li>
            ))}
        </ul>
    </div>
);
}; 


export default Dashboard;