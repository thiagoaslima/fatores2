/// <reference path="../../typings/fatores/fatores.d.ts" />
export declare const defaultUser: {
    Token: string;
    UserId: string;
    UserName: string;
    Empresas: any[];
    Obras: any[];
    Tarefas: any[];
    Expiracao: string;
    Password: string;
};
export default class UserModel {
    private user;
    private encrypt;
    private $http;
    private $q;
    constructor($window: any, $q: any, $http: any);
    setUser(userObj: fatores.entidades.User, password: string): fatores.entidades.User;
    getToken(): string;
    checkOnline(username: string, password: string): Promise<fatores.entidades.User>;
    checkCredentials(users: fatores.entidades.User[], username: string, password: string): fatores.entidades.User;
}
