import './App.css';
import { NotifCard } from './components/NotifCard/NotifCard';

function App() {
  return (
    <div className="App">
      <h1>Pending Requests</h1>
      <div className="notifStack">
        <NotifCard/>
        <NotifCard/>
        <NotifCard/>
        <NotifCard/>
      </div>
    </div>
  );
}

export default App;
