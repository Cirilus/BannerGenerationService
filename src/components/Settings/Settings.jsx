import styles from './Settings.module.css';
import GazpromLogo from "../../assets/GazpromLogo.svg";
import Plus from "../../assets/Plus.svg";
import {Link} from "react-router-dom";
import Time from "../../assets/Time.svg";
import SettingsS from "../../assets/Settings.svg";
import Search from "../../assets/Search.svg";
import Back from "../../assets/Back.svg";
import {useState} from "react";

const Settings = () => {

    const [isToggle1On, setIsToggle1On] = useState(false);
    const [isToggle2On, setIsToggle2On] = useState(false);

    const handleToggle1 = () => setIsToggle1On(!isToggle1On);
    const handleToggle2 = () => setIsToggle2On(!isToggle2On);

    return (
        <div className={styles.BodyContainer}>
            <div className={styles.MainContainer}>
                <div className={styles.SideBar}>
                    <div className={styles.SideBarContent}>
                        <img src={GazpromLogo} width={237} height={50} alt="Gazprom"/>
                        <div className={styles.Navigation}>
                            <div className={styles.BannerContainer}>
                                <img src={Plus}/>
                                <Link to={'/main'} className={styles.TextContainer}>Создание нового баннера</Link>
                            </div>
                            <div className={styles.BannerContainer}>
                                <img src={Time}/>
                                <Link to={"/history"} className={styles.TextContainer}>История</Link>
                            </div>
                            <div className={styles.CreateBannerContainer}>
                                <img src={SettingsS}/>
                                <Link to={"/settings"} className={styles.TextContainer}>Настройки</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.CreateContainer}>
                    <div className={styles.BannerCreatedContainer}>
                        <div className={styles.HeaderContainer}>
                            <div className={styles.HeaderButton}>Создать новый баннер</div>
                        </div>
                    </div>
                    <div className={styles.ContentContainer}>
                        <div className={styles.ContentHeaderBanner}>Настройки</div>
                        <div className={styles.ContentBannerContainer}>
                            <div className={styles.ContentBannerPadding}>
                                <div className={styles.HeaderOfBanner}>
                                    <div className={styles.BackContainer}>
                                        <img src={Back} className={styles.BackLogo} alt="BackButton"/>
                                        <div>Назад</div>
                                    </div>
                                </div>
                                <div className={styles.Buttons}>
                                    <div className={styles.toggleGroup}>
                                        <span className={styles.label}>Автоматическая публикация баннера</span>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={isToggle1On}
                                                onChange={handleToggle1}
                                            />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                    <div className={styles.toggleGroup}>
                                        <span className={styles.label}>Выгрузка баннера в хранилище устройства</span>
                                        <label className={styles.switch}>
                                            <input
                                                type="checkbox"
                                                checked={isToggle2On}
                                                onChange={handleToggle2}
                                            />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;

