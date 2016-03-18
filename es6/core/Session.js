import { Aguardando } from '../models/AtividadeModel';
import { mapify } from '../utils/transformLists';
import { sortByProp } from '../utils/sorts';
const _sortByNome = sortByProp('Nome');
export default class Session {
    constructor($window, $injector) {
        this.$window = $window;
        this.$injector = $injector;
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
        this.AtributosProducao = [];
    }
    setUser(user) {
        this.user = user;
    }
    setConfig(selecteds) {
        this.empresa = selecteds.empresa;
        this.obra = selecteds.obra;
        this.contratada = selecteds.contratada;
        this.tarefa = selecteds.tarefa;
        const CenarioModel = this.$injector.get('CenarioModel');
        const CenarioValorModel = this.$injector.get('CenarioValorModel');
        const getValores = CenarioValorModel.get(this.tarefa.AtributosProducao);
        let valores;
        getValores.then(resp => {
            valores = resp;
            const atributosId = valores.map(valor => valor.CenarioId).filter((valor, idx, arr) => {
                return arr.indexOf(valor) === idx;
            }).sort();
            return CenarioModel.get(atributosId);
        }).then(atributos => {
            const map = mapify(atributos);
            valores.forEach(valor => {
                map[valor.CenarioId].Valores.push(valor);
            });
            this.AtributosProducao = atributos.map(atributo => {
                atributo.Valores.sort(_sortByNome);
                return atributo;
            }).sort(_sortByNome);
        });
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
        this.$window.location.reload(true);
    }
}
