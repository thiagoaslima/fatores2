export default class ProducaoController {
    constructor($state, Session, ProducaoModel) {
        this.$state = $state;
        this.tarefa = Session.tarefa;
        this.produtos = ProducaoModel.list;
    }
    go(produto) {
        if (produto === undefined) {
            return this.$state.go('produto-novo');
        }
        return this.$state.go('produto', { id: produto.Id });
    }
}
