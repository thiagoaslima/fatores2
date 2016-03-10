export default class ConfigurationController {
    private UserModel;
    private EmpresaModel;
    private ObraModel;
    private TarefaModel;
    private AtividadeModel;
    private AtividadeTarefaModel;
    private Session;
    private selectables;
    private selected;
    private $scope;
    private $state;
    constructor($scope: any, $ionicHistory: any, $state: any, Session: any, UserModel: any, EmpresaModel: any, ObraModel: any, TarefaModel: any, AtividadeModel: any, AtividadeTarefaModel: any);
    init(): void;
    save($event: any): void;
}
