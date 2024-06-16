import AuthService from "../service/AuthService.js";
import ImageCreateService from "../service/ImageCreateService.js";
import BannerListService from "../service/ImageCreateService.js";

export default class Store {
    isAuth = false;
    isLoading = false;
    isBanner = [];
    setAuth(bool){
        this.isAuth = bool;
    }
    setLoading(bool){
        this.isLoading = bool;
    }
    setRequestStatus(status){
        this.isRequestStatus = status;
    }
    setBanner(Banner){
        this.isBanner = Banner;
    }

    async login(username,password){
        this.setLoading(true);
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('token', response.data.access_token);
            this.setAuth(true);
            this.setRequestStatus({ success: true});
            return { success: true };
        } catch(e) {
            console.log('Error login', e);
            this.setRequestStatus({ success: false});
        } finally {
            this.setLoading(false);
        }
    }
    async registration(username,password){
        try {
            const response = await AuthService.registration(username, password);
            localStorage.setItem('token', response.data.access_token);
            this.setAuth(true);
        } catch(e) {
            console.log('Error registration', e);
        }
    }
    async logout(){
        try {
            localStorage.removeItem('token');
            this.setAuth(false);
        } catch(e) {
            console.log('Error logout', e);
        }
    }
    async createBanner(content, extra_content, law_text, width, height, photo_style){
        try {
            const response = await ImageCreateService.createBanner(content, extra_content,law_text,width, height,photo_style);
            this.setBanner(response);
            return response.data;
        } catch(e) {
            console.log('Error createBanner', e);
        }
    }
    async bannerList(){
        try {
            const response = await ImageCreateService.bannerList();
            return response.data;
        } catch (error) {
            console.log('Error bannerList', error);
        }
    }

}
