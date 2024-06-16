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

    useEffect(() => {
        store.bannerList()
            .then(bannerData => {
                setBanners(bannerData);
            })
            .catch(error => {
                console.log('Error fetching banners:', error);
            });
    }, [store]);

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
                            <div className={styles.HeaderButton}>Создать новый баннер</div>
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
                                        <div className={styles.textBanners}>Опубликовано</div>
                                        <div className={styles.textBanners}>Автор</div>
                                        <div className={styles.textBanners}>Дата</div>
                                    </div>
                                    <div className={styles.NamesMap}>
                                        {banners.length > 0 ? (
                                            banners.map((banner, index) => (
                                                <div key={index} className={styles.names}>
                                                    <div className={styles.textBanners}><img src={banner.link} width={100}/></div>
                                                    <div
                                                        className={`${styles.textBanners} ${!banner.is_successful ? styles.redBox : ''}`}>
                                                        {banner.is_successful ? 'да' : 'нет'}
                                                    </div>
                                                    <div className={styles.textBanners}>{banner.user}</div>
                                                    <div className={styles.textBanners}>{banner.updated_at}</div>
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