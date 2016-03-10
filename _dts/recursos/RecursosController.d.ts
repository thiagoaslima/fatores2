export default class RecursosController {
    private Session;
    private $state;
    private $q;
    atividades: any;
    equipe: any;
    private LevantamentoModel;
    private CenarioDiaModel;
    levantamentos: any;
    constructor($q: any, $state: any, Session: any, AtividadeModel: any, LevantamentoModel: any, CenarioDiaModel: any);
    mudarAtividade(membros: any): void;
    send(): {
        levantamentos: any;
        cenarios: any;
    };
    endSession($event: any): void;
}
