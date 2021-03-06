import { ProdutoEntity } from '../models/ProducaoModel';
const data = new Date().toISOString();

export default class ProdutoController {
    public produto;
    public tarefa;
    private visibles;
    private memo;
    
    constructor(private $state, private Session, private ProducaoModel, private Storage, produto) {
       this.visibles = {};
       this.tarefa = Session.tarefa;
       this.produto = Object.keys(produto).length ? produto : new ProdutoEntity({
            ObraId: Session.obra.Id,
            TarefaId: Session.tarefa.Id,
            EmpresaId: Session.empresa.Id,
            UserId: Session.user.UserId
        });
    }
    
    toggle(id) {
        this.visibles[id] = !this.visibles[id]
    }
    
    isVisible(id) {
        return this.visibles[id];
    }
    
    hasSelected(atributo) {
        return !!this.produto.selecteds[atributo.Id];
    }
    
    selected(atributo) {
        return this.produto.selecteds[atributo.Id].Nome;
    }
    
    save() {
        this.ProducaoModel.queue(this.produto);
        this.ProducaoModel.saveList(this.ProducaoModel.list);
        this.$state.go('producao');
    }
    
    isSelected(atributo, valor) {
        return this.produto.selecteds[atributo.Id] === valor;
    }
    
    select(valor) {
        this.toggle(valor.CenarioId);
        
        if (this.produto.Atributos.indexOf(valor.Id) >= 0) {
            return;
        }
        if (this.produto.selecteds[valor.CenarioId]) {
            const valorId = this.produto.selecteds[valor.CenarioId];
            const idx = this.produto.Atributos.indexOf(valorId);
            this.produto.Atributos.splice(idx, 1);
        }
        this.produto.selecteds[valor.CenarioId] = valor;
        this.produto.Atributos.push(valor.Id);
        this.produto.Atributos.sort((a,b) => a-b);
    }
}