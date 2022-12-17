import './Navbar.css';
import { useState } from "react"
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <Link to="/"><button type="button" >Главная</button></Link>
                <ul>
                    <li><Link to="Calculator/"><button type="button">Калькулятор</button></Link></li>
                    <li><Link to="Calculator/"><button type="button">Войти</button></Link></li> 
                </ul>
            </nav>
        </div>
    )
}

export default Navbar