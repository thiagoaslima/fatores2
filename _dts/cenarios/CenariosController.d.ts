export default class CenariosController {
    private $state;
    private $scope;
    cenarios: any;
    protected visibles: any;
    protected modified: any;
    private Session;
    private CenarioDiaModel;
    constructor($scope: any, $state: any, Session: any, CenarioModel: any, CenarioValorModel: any, CenarioDiaModel: any);
    init(Session: any, CenarioModel: any, CenarioValorModel: any): void;
    toggle(id: any): void;
    isVisible(id: any): any;
    isModified(cenario: any): boolean;
    select(cenario: any, valor: any): void;
    createRegistro(cenario: any, valor: any): void;
}
