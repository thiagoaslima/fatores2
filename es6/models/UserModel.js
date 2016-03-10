import { URLs } from '../core/settings';
import assign from '../utils/object.assign';
let _password = {};
export const defaultUser = {
    Token: "",
    UserId: "",
    UserName: "",
    Empresas: [],
    Obras: [],
    Tarefas: [],
    Expiracao: "2015-01-01T00:00:00.0000000Z",
    Password: ""
};
export default class UserModel {
    constructor($window, $q, $http) {
        this.$http = $http;
        this.$q = $q;
        this.encrypt = function encrypt(str) {
            return $window.Crypto.SHA256(str).toString();
        };
        this.user = null;
    }
    setUser(userObj, password) {
        this.user = assign({}, defaultUser, userObj);
        this.user.Password = this.encrypt(password);
        _password[this.user.UserId] = password;
        return this.user;
    }
    getToken() {
        return this.user ? this.user.Token : '';
    }
    checkOnline(username, password) {
        return this.$http.get(URLs.services + URLs.endpoints.token, {
            params: {
                UserName: username,
                Password: password
            }
        }).then(resp => {
            if (resp.status !== 200) {
                let data = resp && resp.data ? `${resp.data.Message} > ${resp.data.MessageDetail}` : 'No connection';
                throw new Error(data);
            }
            return this.setUser(resp.data, password);
        });
    }
    checkCredentials(users, username, password) {
        return this.$q((resolve, reject) => {
            let pwd = this.encrypt(password);
            let user = users.filter(user => {
                return user.UserName === username && user.Password === pwd;
            });
            if (user.length) {
                resolve(this.setUser(user[0], password));
            }
            else {
                reject(new Error('Invalid arguments'));
            }
        });
    }
}
