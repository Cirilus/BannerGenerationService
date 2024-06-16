import styles from './Registration.module.css';
import GazpromLogo from "../../assets/GazpromLogo.svg"
import Person from "../../assets/Person.svg"
import Lock from "../../assets/Lock.svg"
import {useContext, useEffect, useState} from "react";
import {Context} from "../../main.jsx";
import {Link, useNavigate} from "react-router-dom";

const Registration = () => {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const {store} = useContext(Context);
    const navigate = useNavigate();


    useEffect(() => {
        const { username, password, confirmPassword } = formState;
        const isValid = username && password && confirmPassword && password === confirmPassword;
        setIsFormValid(isValid);
        setPasswordMatch(password === confirmPassword);
    }, [formState]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleRegistration = async () => {
        try {
            if (formState.password === formState.confirmPassword){
                const responce = await store.registration(formState.username,formState.password);
                if (responce.success) {
                    navigate("/main");
                } else {
                    // Обработка неуспешного ответа от сервера
                    console.log('Registration failed', responce.message);
                }
            } else {
                setPasswordMatch(false)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={styles.BodyContainer}>
            <div className={styles.MainContainer}>
                <img src={GazpromLogo} alt="Gazprom"/>
                <div className={styles.TextContainer}>
                    Регистрация
                </div>
                <div className={styles.LoginAndTextContainer}>
                    <img src={Person}/>
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
                <div className={styles.LoginAndTextContainer}>
                    <img src={Lock}/>
                    <input placeholder="Повторите пароль" className={styles.Input}
                           type="password" id="confirmPassword"
                           onChange={handleChange} value={formState.confirmPassword}/>
                </div>
                {!passwordMatch && (
                    <div className={styles.ErrorText}>Пароли не совпадают</div>
                )}
                <button className={styles.ButtonAuth} onClick={handleRegistration}
                        style={{ opacity: isFormValid ? 1 : 0.5, color: isFormValid ? '#FFFFFF' : '#9A9FA5' }}
                        disabled={!isFormValid}
                >Зарегистрироваться</button>
                <div className={styles.TextRoute}>
                    Есть аккаунт?
                    <Link to={"/"} className={styles.TextRoute}>    Войдите</Link>
                </div>
            </div>
        </div>
    )
}

export default Registration;