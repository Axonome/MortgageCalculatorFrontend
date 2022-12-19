import { useNavigate} from "react-router-dom";
import "./Login.css";

function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="page">
            <div className="login-wrapper">
                <div className="head">
                    <a onClick={() => navigate(-1)}>{"<"} Назад</a>
                    <label>Войти</label>
                </div>
                <div className="body">
                    <div className="input-group">
                        <label>Логин</label>
                        <input/>
                    </div>
                    <div className="input-group">
                        <label>Пароль</label>
                        <input type="password"/>
                    </div>
                    <button type="submit">Войти</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;