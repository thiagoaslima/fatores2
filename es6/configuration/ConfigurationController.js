export default class ConfigurationController {
    constructor($scope, $ionicHistory, $state, Session, UserModel, EmpresaModel, ObraModel, TarefaModel, AtividadeModel, AtividadeTarefaModel) {
        this.$scope = $scope;
        this.Session = Session;
        this.UserModel = UserModel;
        this.EmpresaModel = EmpresaModel;
        this.ObraModel = ObraModel;
        this.TarefaModel = TarefaModel;
        this.AtividadeModel = AtividadeModel;
        this.AtividadeTarefaModel = AtividadeTarefaModel;
        this.$state = $state;
        $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
        });
        this.selectables = {
            empresas: [],
            obras: [],
            contratadas: [],
            tarefas: []
        };
        this.selected = {};
        const _selected = {
            empresa: Session.empresa || null,
            obra: Session.obra || null,
            contratada: Session.contratada || null,
            tarefa: Session.tarefa || null
        };
        const controller = this;
        Object.defineProperties(this.selected, {
            "empresa": {
                get: function () {
                    return _selected.empresa;
                },
                set: function (value) {
                    _selected.empresa = value || null;
                    _selected.obra = null;
                    _selected.contratada = null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(() => {
                        if (value === null) {
                            controller.selectables.obras = [];
                        }
                        controller.selectables.contratadas = [];
                        controller.selectables.tarefas = [];
                    });
                }
            },
            "obra": {
                get: function () {
                    return _selected.obra;
                },
                set: function (value) {
                    _selected.obra = value || null;
                    _selected.contratada = null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(() => {
                        if (value === null) {
                            controller.selectables.contratadas = [];
                        }
                        controller.selectables.tarefas = [];
                    });
                }
            },
            "contratada": {
                get: function () {
                    return _selected.contratada;
                },
                set: function (value) {
                    _selected.contratada = value || null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(() => {
                        if (value === null) {
                            controller.selectables.tarefas = [];
                        }
                    });
                }
            },
            "tarefa": {
                get: function () {
                    return _selected.tarefa;
                },
                set: function (value) {
                    _selected.tarefa = value;
                }
            }
        });
        this.init();
    }
    init() {
        let Obras;
        const listaObras = this.ObraModel.get(this.UserModel.user.Obras);
        listaObras.then(lista => {
            this.selectables.obras = this.ObraModel.getLevel(lista);
            return this.selectables.obras;
        }).then(lista => {
            return lista.map(obra => obra.EmpresaId).sort().filter((id, idx, arr) => {
                return arr.indexOf(id) === idx;
            });
        }).then(lista => this.EmpresaModel.get(lista).then(empresas => {
            this.selectables.empresas = empresas;
        }));
    }
    save($event) {
        $event.preventDefault();
        if (this.selected.tarefa) {
            this.Session.setConfig({
                empresa: this.selected.empresa,
                obra: this.selected.obra,
                contratada: this.selected.contratada,
                tarefa: this.selected.tarefa
            });
            this.AtividadeModel.setTarefa(this.selected.tarefa);
            this.AtividadeModel.get(this.selected.tarefa.Atividades).then(atividades => {
                this.Session.setAtividades(this.AtividadeModel.getLevel(atividades));
                this.Session.setAtividadesTarefa(this.AtividadeTarefaModel.list.filter(item => item.TarefaId === this.Session.tarefa.Id));
                this.$state.go('equipe');
            });
        }
    }
    ;
}
