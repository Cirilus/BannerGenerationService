import api from "../http";

export default class AuthService {
    static async login(username, password) {
        return api.post('/auth/token', {
            username,
            password
        }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    }

    static async registration(username, password){
        return api.post('/auth/register', {email:username, password}, {headers: {'Content-Type': 'application/json'}});
    }
}