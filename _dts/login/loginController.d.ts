/// <reference path="../../typings/fatores/fatores.d.ts" />
export default class LoginController {
    protected Storage: fatores.utils.Storage;
    protected Session: any;
    protected UserModel: fatores.models.UserModel;
    protected $state: any;
    UserName: string;
    Password: string;
    constructor($state: any, UserModel: any, Storage: any, Session: any);
    login(evt: any, username: string, password: string): void;
}
