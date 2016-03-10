import { Aguardando } from '../models/AtividadeModel';
export default class Session {
    constructor() {
        this.DataAtualizacao = '';
        this.started = false;
        this.user = null;
        this.empresa = null;
        this.obra = null;
        this.contratada = null;
        this.tarefa = null;
        this.equipe = [];
        this.atividades = [Aguardando];
        this.atividadesTarefa = [];
    }
    setUser(user) {
        this.user = user;
    }
    setConfig(selecteds) {
        this.empresa = selecteds.empresa;
        this.obra = selecteds.obra;
        this.contratada = selecteds.contratada;
        this.tarefa = selecteds.tarefa;
    }
    setAtividades(atividades) {
        this.atividades.push(...atividades);
    }
    setAtividadesTarefa(atvTar) {
        this.atividadesTarefa.push(...atvTar);
    }
    getToken() {
        return this.user ? this.user.Token : '';
    }
    reset() {
        this.DataAtualizacao = '';
        this.started = false;
        this.user = null;
        this.empresa = null;
        this.obra = null;
        this.contratada = null;
        this.tarefa = null;
        this.equipe = [];
        this.atividades = [Aguardando];
        this.atividadesTarefa = [];
    }
    start() {
        this.started = true;
        this.DataAtualizacao = new Date().toISOString();
    }
    end() {
        this.started = false;
    }
}
