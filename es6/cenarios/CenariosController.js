import assign from '../utils/object.assign';
let base = {
    UserId: '',
    ObraId: 0,
    EmpresaId: 0,
    TarefaId: 0
};
export default class CenariosController {
    constructor($scope, $state, Session, CenarioModel, CenarioValorModel, CenarioDiaModel) {
        this.$scope = $scope;
        this.$state = $state;
        this.cenarios = [];
        this.visibles = {};
        this.modified = {};
        this.Session = Session;
        this.CenarioDiaModel = CenarioDiaModel;
        base = {
            UserId: Session.user.UserId,
            ObraId: Session.obra.Id,
            EmpresaId: Session.empresa.Id,
            TarefaId: Session.tarefa.Id
        };
        this.init(Session, CenarioModel, CenarioValorModel);
        this.$scope.$on('$ionicView.beforeLeave', () => {
            this.cenarios.forEach(cenario => {
                this.modified[cenario.Id] = cenario.selected;
            });
        });
    }
    init(Session, CenarioModel, CenarioValorModel) {
        let _cenariosValor = CenarioValorModel.list.filter(item => {
            return Session.tarefa.CenariosValor.indexOf(item.Id) >= 0;
        });
        let _map = {};
        let _cenariosId = _cenariosValor.map(item => {
            _map[item.CenarioId] = _map[item.CenarioId] || [];
            _map[item.CenarioId].push(item);
            return item.CenarioId;
        }).filter((id, idx, arr) => {
            return arr.indexOf(id) === idx;
        }).sort((a, b) => a - b);
        CenarioModel.get(_cenariosId).then(cenarios => {
            cenarios.forEach(cenario => {
                if (!cenario.Valores.length) {
                    let valores = _map[cenario.Id];
                    cenario.Valores.push(...valores);
                    cenario.Valores.filter((valor, idx, arr) => {
                        return arr.indexOf(valor) === idx;
                    });
                }
            });
            this.cenarios = cenarios;
        });
    }
    toggle(id) {
        this.visibles[id] = !this.visibles[id];
    }
    isVisible(id) {
        return this.visibles[id];
    }
    isModified(cenario) {
        return cenario.selected !== this.modified[cenario.Id];
    }
    select(cenario, valor) {
        this.createRegistro(cenario, valor);
        cenario.select(valor);
        this.toggle(cenario.Id);
    }
    createRegistro(cenario, valor) {
        let _registro = assign({}, base, {
            CenarioValorId: valor.Id,
            Inicio: cenario.selected ? new Date().toISOString() : this.Session.startTime
        });
        this.CenarioDiaModel.create(_registro);
    }
}
