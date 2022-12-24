import { useNavigate} from "react-router-dom";
import { FaLock, FaUser } from 'react-icons/fa';
import "./Login.css";

function RegisterPage() {
    const navigate = useNavigate();

    return (
        <div className="register-page">
            <div className="login-wrapper">
                <div className="head">
                    <a onClick={() => navigate(-1)}>{"<"} Назад</a>
                    <label>Регистрация</label>
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
                    <div className="input-group">
                        <FaLock className="text-accent" />
                        <input id="second-password" type="password" placeholder="Повторите пароль"/>
                    </div>
                    <button id="login" type="submit">Зарегистрироваься</button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;