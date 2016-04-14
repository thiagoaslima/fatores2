import { Aguardando } from '../models/AtividadeModel';

class Popup {
    constructor(private $ionicPopup, public $scope) {
            
    }
    
    show() {
        return this.$ionicPopup.show({
            template: `
            <div class="row">
                <label class="col">
                    Hora:
                    <input type="number" min="0" max="23" ng-model="horario.hora">
                </label>
                <label class="col">
                    Minutos:
                    <input type="number" min="0" max="59" ng-model="horario.minutos">
                </label>
            </div>
            `,
            title: 'Encerrar levantamento?',
            subTitle: 'Defina o horário que deseja encerrar os registros',
            scope: this.$scope,
            buttons: [
            { text: 'Cancelar' },
            {
                text: '<b>Enviar</b>',
                type: 'button-positive',
                onTap: function(e) {
                if (!this.scope.horario.hora && !this.scope.horario.minutos) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();
                } else {
                    return this.scope.horario;
                }
                }
            }
            ]
        });
        
    }
    
}

export default class RecursosController {
    private Session;
    private $state;
    private $scope;
    private $q;
    public atividades;
    public equipe;
    private LevantamentoModel;
    private CenarioDiaModel;
    private ProducaoModel;
    public levantamentos;
    public popup;

    constructor($q, $state, $scope, $ionicPopup, Session, AtividadeModel, LevantamentoModel, CenarioDiaModel, ProducaoModel) {
        this.Session = Session;
        this.$state = $state;
        this.$scope = $scope;
        this.$q = $q;
        this.atividades = [Aguardando];
        this.LevantamentoModel = LevantamentoModel;
        this.levantamentos = LevantamentoModel.list;
        this.CenarioDiaModel = CenarioDiaModel;
        this.ProducaoModel = ProducaoModel;
        
        this.popup = new Popup($ionicPopup, $scope);

        AtividadeModel.get(this.Session.tarefa.Atividades).then(resp => {
            let parents = resp.map(item => item.AtividadePaiId).filter((id, idx, arr) => arr.indexOf(id) === idx);
            this.atividades.push(...(resp.filter(item => parents.indexOf(item.Id) < 0)));
        });
        this.equipe = Session.equipe;
    }
    
    go(membro) {
        return this.$state.go('comentario', {id: membro.Id});
    }

    mudarAtividade(membros) {
        membros.forEach(membro => membro.select());
        this.$state.go('atividades');
    }

    send(time) {
        time = time.toISOString() || new Date().toISOString();
        const levantamentos = this.LevantamentoModel.post(this.LevantamentoModel.list, time);
        const cenarios = this.CenarioDiaModel.post(this.CenarioDiaModel.list, time);
        const producao = this.ProducaoModel.post(this.ProducaoModel.list.concat(this.ProducaoModel.old()), time);
        const obj = { levantamentos, cenarios, producao }
        return obj;
    }

    endSession($event) {
        const data = new Date();
        
        this.$scope.horario = {
            hora: data.getHours(),
            minutos: data.getMinutes()
        };
        
        this.popup.show().then( resp => {
            let date = new Date();
            date.setHours(resp.hora);
            date.setMinutes(resp.minutos);
            let promises = this.send(date);
            this.$q.all(promises).then(resp => {
                this.Session.end();
                return this.$state.go('login');
            })
        });
    }
}