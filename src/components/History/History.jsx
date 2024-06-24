import styles from './History.module.css';
import GazpromLogo from "../../assets/GazpromLogo.svg";
import {Link} from "react-router-dom";
import Time from "../../assets/Time.svg";
import Settings from "../../assets/Settings.svg";
import Plus from '../../assets/Plus.svg';
import Search from '../../assets/Search.svg'
import {useContext, useEffect, useState} from "react";
import {Context} from "../../main.jsx";

const History = () => {
    const { store } = useContext(Context);
    const [banners, setBanners] = useState([]);
    const [bannerStatuses, setBannerStatuses] = useState(banners.map(banner => banner.is_successful));

    useEffect(() => {
        store.bannerList()
            .then(bannerData => {
                setBanners(bannerData);
            })
            .catch(error => {
                console.log('Error fetching banners:', error);
            });
    }, [store]);




    const handleStatusClick = async (index, isSuccessful) => {
        const updatedStatuses = [...bannerStatuses];
        updatedStatuses[index] = isSuccessful;
        setBannerStatuses(updatedStatuses);

        const bannerId = banners[index].id;
        // Отправляем запрос на сервер с ID баннера и его статусом
        try {
            await store.isSuccesfulBanner(bannerId, isSuccessful);
        } catch (e) {
            console.log(e);
        }
    };

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
                            <div className={styles.CreateBannerContainer}>
                                <img src={Time}/>
                                <Link to={"/history"} className={styles.TextContainer}>История</Link>
                            </div>
                            <div className={styles.BannerContainer}>
                                <img src={Settings}/>
                                <Link to={"/settings"} className={styles.TextContainer}>Настройки</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.CreateContainer}>
                    <div className={styles.BannerCreatedContainer}>
                        <div className={styles.HeaderContainer}>
                            <Link to={"/main"} className={styles.HeaderButton}>Создать новый баннер</Link>
                        </div>
                    </div>
                    <div className={styles.ContentContainer}>
                        <div className={styles.ContentHeaderBanner}>Мои баннеры</div>
                        <div className={styles.ContentBannerContainer}>
                            <div className={styles.ContentBannerPadding}>
                                <div className={styles.HeaderOfBanner}>
                                    <div className={styles.ContainerOfSearch}>
                                        <img src={Search}/>
                                        <input type={'text'} className={styles.textField}/>
                                    </div>
                                </div>
                                <div className={styles.historyMap}>
                                    <div className={styles.names}>
                                        <div className={styles.textBanners}>Баннер</div>
                                        <div className={styles.textBanners}>Успешно</div>
                                        <div className={styles.textBanners}>Автор</div>
                                        <div className={styles.textBanners}>Дата</div>
                                        <div className={styles.textBanners}>Успешность</div>
                                    </div>
                                    <div className={styles.NamesMap}>
                                        {banners.length > 0 ? (
                                            banners.map((banner, index) => (
                                                <div key={index} className={styles.names}>
                                                    <div className={styles.textBanners}>
                                                        <img src={banner.link} width={100} alt={`Banner ${index}`}/>
                                                    </div>
                                                    <div
                                                        className={`${styles.textBanners} ${!banner.is_succesfull ? styles.redBox : styles.greenBox}`}>
                                                        {banner.is_succesfull ? 'да' : 'нет'}
                                                    </div>
                                                    <div className={styles.textBanners}>{banner.user}</div>
                                                    <div className={styles.textBanners}>{banner.updated_at}</div>
                                                    <div className={styles.buttonContainer}>
                                                        <button
                                                            className={styles.successButton}
                                                            onClick={() => handleStatusClick(index, true)}
                                                        >
                                                            Успешный
                                                        </button>
                                                        <button
                                                            className={styles.failButton}
                                                            onClick={() => handleStatusClick(index, false)}
                                                        >
                                                            Неуспешный
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className={styles.names}>Баннеры тут</div>
                                        )}
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

export default History;