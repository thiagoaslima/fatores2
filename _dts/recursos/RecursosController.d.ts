export default class RecursosController {
    private Session;
    private $state;
    private $scope;
    private $q;
    atividades: any;
    equipe: any;
    private LevantamentoModel;
    private CenarioDiaModel;
    private ProducaoModel;
    levantamentos: any;
    popup: any;
    constructor($q: any, $state: any, $scope: any, $ionicPopup: any, Session: any, AtividadeModel: any, LevantamentoModel: any, CenarioDiaModel: any, ProducaoModel: any);
    go(membro: any): any;
    mudarAtividade(membros: any): void;
    send(time: any): {
        levantamentos: any;
        cenarios: any;
        producao: any;
    };
    endSession($event: any): void;
}
