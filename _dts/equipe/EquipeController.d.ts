declare class EquipeController {
    private Session;
    private FuncaoModel;
    funcoes: any;
    protected showForm: any;
    protected membro: any;
    protected equipe: any;
    constructor($ionicHistory: any, Session: any, FuncaoModel: any);
    init(): void;
    openForm(funcao: any): void;
    closeForm(): void;
    addMembro(): void;
    removeMembro(membro: any): void;
}
export default EquipeController;
