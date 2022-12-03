import './App.css';
import { NotifCard } from './components/NotifCard/NotifCard';
import {useState, useEffect} from 'react';
const PushAPI = require('@pushprotocol/restapi');


function App() {
  const [notifs, setNotifs] = useState([])
  const Alerts = () => {
    useEffect(() => {
        const fetchNotifs = async (
          chainId = "8001",
          public_key = "0x5E4EE2aA55C20cae19eb8592aC8216264F9813dE",
          environment = "staging"
        ) => {
          try {
            const notifications = await PushAPI.user.getFeeds({
              user: `eip155:${chainId}:${public_key}`, // user address in CAIP
              env: `${environment}`,
            });
        
            console.log(notifications);
            setNotifs(notifications);
          } catch (error) {
            console.log(
              "There was some issue getting the Notifications. Error: ",
              error
            );
            return;
          }
        };
        
        fetchNotifs()
        const interval = setInterval(() => fetchNotifs(), 2000)
        return () => {
          clearInterval(interval);
        }
    }, [])}

    Alerts();

  return (
    <div className="App">
      <h1>Pending Requests</h1>
      <div className="notifStack">
        {
          notifs.map(notif => {
            return (<NotifCard notifTitle={notif.title} notifMessage={notif.message} />)
          })
        }
      </div>
    </div>
  );
}

export default App;
