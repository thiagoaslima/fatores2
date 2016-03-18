/// <reference path="../../typings/fatores/fatores.d.ts" />
import { URLs } from '../core/settings';
import assign from '../utils/object.assign';

type IUser = fatores.entidades.User;

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
	private user: IUser;
	private encrypt;
	private $http;
	private $q;

	constructor($window, $q, $http) {
		this.$http = $http;
		this.$q = $q;
		this.encrypt = function encrypt(str:string):string {
			return $window.Crypto.SHA256(str).toString();
		};
		this.user = null;
	}

	setUser(userObj: fatores.entidades.User, password: string): fatores.entidades.User {
		this.user = assign({}, defaultUser, userObj);
		this.user.Password = this.encrypt(password);
		_password[this.user.UserId] = password;
		return this.user;
	}

	getToken(): string{
		return this.user ? this.user.Token : '';
	}

	checkOnline(username: string, password: string): Promise<fatores.entidades.User> {
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

	checkCredentials(users: fatores.entidades.User[], username: string, password: string): fatores.entidades.User {
			let pwd = this.encrypt(password);

			let user = users.filter(user => {
				return user.UserName === username && user.Password === pwd;
			});
	
			if (user.length) {
				return this.setUser(user[0], password));
			} else {
				throw new Error('Invalid arguments');
			}
	}
}