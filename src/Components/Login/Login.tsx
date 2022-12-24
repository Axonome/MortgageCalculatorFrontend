import { useNavigate} from "react-router-dom";
import { FaLock, FaUser } from 'react-icons/fa';
import "./Login.css";

function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="login-page">
            <div className="login-wrapper">
                <div className="head">
                    <a onClick={() => navigate(-1)}>{"<"} Назад</a>
                    <label>Войти</label>
                </div>
                <div className="body">
                    <div className="input-group">
                        <FaUser className="text-accent" />
                        <input id="username" placeholder="Имя пользователя"/>
                    </div>
                    <div className="input-group">
                        <FaLock className="text-accent" />
                        <input id="password" type="password" placeholder="Пароль"/>
                    </div>
                    <button id="login" type="submit">Войти</button>
                    <div className="strike">
                        <span>или</span>
                    </div>
                    <button id="register" type="submit">Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;