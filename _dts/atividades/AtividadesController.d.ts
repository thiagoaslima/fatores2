export default class AtividadesController {
    protected $state: any;
    protected Session: any;
    protected AtividadeModel: any;
    protected LevantamentoModel: any;
    atividadeSelected: any;
    equipe: any;
    atividades: any;
    constructor($state: any, Session: any, AtividadeModel: any, LevantamentoModel: any);
    reset(): void;
    setLevantamento($event: any): void;
}
