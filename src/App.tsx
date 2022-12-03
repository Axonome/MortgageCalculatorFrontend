import { useState } from "react";
import './App.css';

import LandingPage from "./Landing";
import CalculatorPage from "./Calculator";

const Pages = {
  Logo: <LandingPage />,
  Calculator: <CalculatorPage />
};

function App() {
  const [currentPage, setCurrentPage] = useState(Pages.Logo);

  return (
    <div className="font-semibold min-h-screen bg-primary">
      <div className="page">
        <nav className="header">
          <ul>
            <li className=""><button type="button" onClick={() => setCurrentPage(Pages.Logo)}>Главная</button></li>
            <li><button type="button" onClick={() => setCurrentPage(Pages.Calculator)}>Калькулятор</button></li>
          </ul>
        </nav>
        <div className="main-content">
          {currentPage}
        </div>
      </div>
    </div>

  );
}

export default App;
