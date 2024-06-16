import styles from './AuthPage.module.css';
import GazpromLogo from "../../assets/GazpromLogo.svg";
import Person from "../../assets/Person.svg";
import Lock from "../../assets/Lock.svg";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../main.jsx";
import {Link, useNavigate} from "react-router-dom";


const AuthPage = () => {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const {store} = useContext(Context);
    const navigate = useNavigate();


    useEffect(() => {
        const { username, password } = formState;
        const isValid = username && password;
        setIsFormValid(isValid);
    }, [formState]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleLogin = async () => {
        store.login(formState.username,formState.password).then(()=>{
            if (store.isAuth){
                navigate("/main");
            } else {
                navigate("/registration");
            }
        }).catch((error)=>{
            console.log("Login error",error)
        })
    }

    return (
        <div className={styles.BodyContainer}>
            <div className={styles.MainContainer}>
                <img src={GazpromLogo} alt="Gazprom" />
                <div className={styles.TextContainer}>
                    Авторизация
                </div>
                <div className={styles.LoginAndTextContainer}>
                    <img src={Person} />
                    <input placeholder="Логин" className={styles.Input}
                           onChange={handleChange}
                           type="text" id="username" value={formState.username}/>
                </div>
                <div className={styles.LoginAndTextContainer}>
                    <img src={Lock}/>
                    <input placeholder="Пароль" className={styles.Input}
                           onChange={handleChange}
                           type="password" id="password" value={formState.password}/>
                </div>
                <button className={styles.ButtonAuth} onClick={handleLogin}
                        style={{ opacity: isFormValid ? 1 : 0.5, color: isFormValid ? '#FFFFFF' : '#9A9FA5' }}
                        disabled={!isFormValid}>Войти</button>
                <div className={styles.TextRoute}>
                    Нет аккаунта?
                    <Link to={"/registration"} className={styles.TextRoute}>     Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;