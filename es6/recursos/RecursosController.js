import { Aguardando } from '../models/AtividadeModel';
export default class RecursosController {
    constructor($q, $state, Session, AtividadeModel, LevantamentoModel, CenarioDiaModel) {
        this.Session = Session;
        this.$state = $state;
        this.$q = $q;
        this.atividades = [Aguardando];
        this.LevantamentoModel = LevantamentoModel;
        this.levantamentos = LevantamentoModel.list;
        this.CenarioDiaModel = CenarioDiaModel;
        AtividadeModel.get(this.Session.tarefa.Atividades).then(resp => {
            let parents = resp.map(item => item.AtividadePaiId).filter((id, idx, arr) => arr.indexOf(id) === idx);
            this.atividades.push(...(resp.filter(item => parents.indexOf(item.Id) < 0)));
        });
        this.equipe = Session.equipe;
    }
    mudarAtividade(membros) {
        membros.forEach(membro => membro.select());
        this.$state.go('atividades');
    }
    send() {
        let time = new Date().toISOString();
        let levantamentos = this.LevantamentoModel.post(this.LevantamentoModel.list, time);
        let cenarios = this.CenarioDiaModel.post(this.CenarioDiaModel.list, time);
        let obj = { levantamentos, cenarios };
        return obj;
    }
    endSession($event) {
        let promises = this.send();
        this.$q.all(promises).then(resp => {
            this.Session.end();
            return this.$state.go('login');
        });
    }
}
