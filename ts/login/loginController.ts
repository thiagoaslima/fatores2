/// <reference path="../../typings/fatores/fatores.d.ts" />
import assign from '../utils/object.assign';

export default class LoginController {
    protected Storage: fatores.utils.Storage;
    protected Session;
    protected UserModel: fatores.models.UserModel;
    protected $state: any;
    public UserName: string;
    public Password: string;

    constructor($state, UserModel, Storage, Session) {
        this.$state = $state;
        this.Storage = Storage;
        this.Session = Session;
        this.UserModel = UserModel;
        this.UserName = '';
        this.Password = '';
    }

    public login(evt: any, username: string, password: string): void {
        let loginOnline = _loginOnline.bind(this),
            loginOffline = _loginOffline.bind(this);

        loginOnline(username, password)

            .then(resp => {
                return enterOnApp.bind(this)(resp);
            })

            .catch(err => {
                let users = [];
                return loginOffline(username, password)
                    .then(resp => {
                        enterOnApp.bind(this)(resp);
                    }).catch(err => {
                        console.log('Não reconhecido');
                    });
            });
    }
}

function _loginOnline(username: string, password: string): fatores.entidades.User {
    return this.UserModel.checkOnline(username, password);
}

function _loginOffline(username: string, password: string): fatores.entidades.User {
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
    } else {
        users.push(user);
    }

    this.Storage.save('users', users);
    this.Session.setUser(user);
    this.Session.start();
    return this.$state.go('configuration');
}