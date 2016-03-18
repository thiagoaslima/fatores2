import assign from '../utils/object.assign';
export default class LoginController {
    constructor($state, UserModel, Storage, Session) {
        this.$state = $state;
        this.Storage = Storage;
        this.Session = Session;
        this.UserModel = UserModel;
        this.UserName = '';
        this.Password = '';
    }
    login(evt, username, password) {
        let loginOnline = _loginOnline.bind(this), loginOffline = _loginOffline.bind(this);
        loginOnline(username, password)
            .then(resp => {
            return enterOnApp.bind(this)(resp);
        })
            .catch(err => {
            let users = [];
            const user = loginOffline(username, password);
            if (user) {
                enterOnApp.bind(this)(user);
            }
        });
    }
}
function _loginOnline(username, password) {
    return this.UserModel.checkOnline(username, password);
}
function _loginOffline(username, password) {
    let users = this.Storage.get('users') || [];
    return this.UserModel.checkCredentials(users, username, password);
}
function enterOnApp(user) {
    let users = this.Storage.get('users') || [];
    let update = users.filter(obj => {
        return obj.UserId === user.UserId;
    });
    if (update.length) {
        assign(update[0], user);
    }
    else {
        users.push(user);
    }
    this.Storage.save('users', users);
    this.Session.setUser(user);
    this.Session.start();
    return this.$state.go('configuration');
}
