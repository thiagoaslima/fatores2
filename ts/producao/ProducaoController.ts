export default class ProducaoController {
    public tarefa;
    public produtos;
    
    constructor(private $state, Session, ProducaoModel) {
        debugger;
        this.tarefa = Session.tarefa;
        this.produtos = ProducaoModel.list;
    }
    
    go(produto) {
        if (produto === undefined) {
            return this.$state.go('produto-novo');
        }
        
        return this.$state.go('produto', {id: produto.Id});
    }
}