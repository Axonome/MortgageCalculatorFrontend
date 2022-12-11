import './App.css';
import { Outlet } from "react-router-dom";

import {
  Link
} from "react-router-dom";

function App() {

  return (
    <div className="font-semibold min-h-screen bg-primary">
      <div className="page">
        <nav className="header">
          <ul>
            <li className=""><Link to="/"><button type="button" >Главная</button></Link></li>
            <li><Link to="Calculator/"><button type="button">Калькулятор</button></Link></li>
          </ul>
        </nav>
        <div className="main-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default App;
