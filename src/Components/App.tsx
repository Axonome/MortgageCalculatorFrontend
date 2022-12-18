import './App.css';
import { Outlet } from "react-router-dom";
import Navbar from './Navbar/Navbar';

function App() {

  return (
    <div>
      {<Navbar/>}
      <div className="font-semibold bg-neutral">
        <div className="page">
          <div className="main-content">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
