import { Aguardando } from "../models/AtividadeModel";
class Membro {
    constructor({ Nome, Experiencia, Funcao }) {
        this.Nome = Nome;
        this.Experiencia = Experiencia || 0;
        this.Funcao = Funcao;
        this.Atividade = Aguardando;
        this.Levantamento = null;
        this._selected = false;
    }
    setAtividade(atividade) {
        this.Atividade = atividade;
    }
    select() {
        this._selected = true;
    }
    deselect() {
        this._selected = false;
    }
    isSelected() {
        return this._selected;
    }
    toggleSelection() {
        this._selected = !this._selected;
    }
}
class EquipeController {
    constructor($ionicHistory, Session, FuncaoModel) {
        this.Session = Session;
        this.FuncaoModel = FuncaoModel;
        this.funcoes = [];
        this.equipe = this.Session.equipe;
        this.showForm = false;
        this.membro = {};
        $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
        });
        this.init();
    }
    init() {
        this.FuncaoModel.get(this.Session.tarefa.Funcoes).then(funcoes => {
            funcoes = funcoes.map(funcao => {
                funcao._qty = 0;
                return funcao;
            });
            this.funcoes.push(...funcoes);
        });
    }
    openForm(funcao) {
        this.membro = {
            Nome: `${funcao.Nome} ${funcao._qty + 1}`,
            Funcao: funcao
        };
        this.showForm = true;
    }
    closeForm() {
        this.membro = {};
        this.showForm = false;
    }
    addMembro() {
        let _membro = new Membro(this.membro);
        this.equipe.push(_membro);
        this.membro.Funcao._qty += 1;
        this.closeForm();
        Aguardando.setToMember(_membro);
    }
    removeMembro(membro) {
        membro.Funcao._qty -= 1;
        this.equipe.splice(this.equipe.indexOf(membro), 1);
        Aguardando.removeMember(membro);
    }
}
export default EquipeController;
