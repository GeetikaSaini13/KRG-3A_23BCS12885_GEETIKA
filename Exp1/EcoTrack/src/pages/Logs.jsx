import {logs} from '../data/logs'

const Activities=()=>{
    const highCarbon=logs.filter(log=>log.carbon>3);
    const lowCarbon=logs.filter(log=>log.carbon<=3);
    return(
    <div>
      <h2>High Carbon Activities</h2>

      <ul>
        {highCarbon.map(log => (
          <li key={log.id} style={{color:"red"}}>
             {log.activity}={log.carbon} kg
          </li>
        ))}
      </ul>

      <h2>Low Carbon Activities</h2>
      <ul>
        {lowCarbon.map(log=>(
          <li key={log.id} style={{color:"green"}}>
            {log.activity}={log.carbon} kg
          </li>
        ))}
      </ul>
    </div>
            );
};

export default Activities;