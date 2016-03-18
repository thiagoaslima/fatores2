export default class ProdutoController {
    private $state;
    private Session;
    private ProducaoModel;
    private Storage;
    produto: any;
    tarefa: any;
    private visibles;
    private memo;
    constructor($state: any, Session: any, ProducaoModel: any, Storage: any, produto: any);
    toggle(id: any): void;
    isVisible(id: any): any;
    hasSelected(atributo: any): boolean;
    selected(atributo: any): any;
    save(): void;
    isSelected(atributo: any, valor: any): boolean;
    select(valor: any): void;
}
