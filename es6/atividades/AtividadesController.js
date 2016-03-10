import assign from '../utils/object.assign';
export default class AtividadesController {
    constructor($state, Session, AtividadeModel, LevantamentoModel) {
        this.$state = $state;
        this.Session = Session;
        this.equipe = Session.equipe;
        this.atividades = Session.atividades;
        this.AtividadeModel = AtividadeModel;
        this.LevantamentoModel = LevantamentoModel;
        this.atividadeSelected = null;
    }
    reset() {
        this.equipe.forEach(membro => membro.deselect());
        this.atividadeSelected = null;
    }
    setLevantamento($event) {
        $event.preventDefault();
        let selecteds = this.equipe
            .filter(membro => membro.isSelected())
            .concat(this.atividadeSelected.Membros)
            .filter((membro, idx, arr) => arr.indexOf(membro) === idx);
        let funcoes = selecteds.reduce((map, membro) => {
            map[membro.Funcao.Id] = map[membro.Funcao.Id] || [];
            map[membro.Funcao.Id].push(membro);
            return map;
        }, {});
        let levantamentos = Object.keys(funcoes).map(id => {
            let membros = funcoes[id];
            if (membros.length === 1 &&
                membros[0].Atividade === this.atividadeSelected) {
                return;
            }
            let base = {
                UserId: this.Session.user.UserId,
                EmpresaId: this.Session.empresa.Id,
                ObraId: this.Session.obra.Id,
                TarefaId: this.Session.tarefa.Id,
                AtividadeId: this.atividadeSelected.Id,
                AtividadeTarefaId: this.Session.atividadesTarefa.filter(item => {
                    return item.AtividadeId === this.atividadeSelected.Id;
                })[0].Id
            };
            membros.forEach(membro => {
                membro.Atividade.removeMember(membro);
                if (!membro.Levantamento) {
                    return;
                }
                if (!membro.Levantamento.finish(membro.Atividade)) {
                    this.LevantamentoModel.cancel(membro.Levantamento);
                }
            });
            let _lev = assign({}, base, {
                FuncaoId: membros[0].Funcao.Id,
                QuantidadeColaboradores: membros.length,
                Colaboradores: membros.map(membro => membro.Nome).join(' '),
                ExperienciaFuncao: membros.reduce((total, membro) => total + membro.Experiencia, 0),
                Comentario: ''
            });
            let levantamento = (this.atividadeSelected.Id === 0) ?
                null : this.LevantamentoModel.create(_lev);
            membros.forEach(membro => {
                membro.Levantamento = levantamento;
                membro.setAtividade(this.atividadeSelected);
                this.atividadeSelected.setToMember(membro);
            });
        });
        this.reset();
        this.$state.go('recursos');
    }
}
