import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <Link to="/"><img className="logo" src="/Axonome.png"/></Link>
                <ul>
                    <li><Link to="Calculator/"><button type="button">Калькулятор</button></Link></li>
                    <li><Link to="Auth/"><button type="button">Войти</button></Link></li> 
                </ul>
            </nav>
        </div>
    )
}

export default Navbar