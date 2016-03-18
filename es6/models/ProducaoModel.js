import { URLs } from '../core/settings';
import { BasicModel } from './BasicModel';
import assign from '../utils/object.assign';
let _id = 0;
export class ProdutoEntity {
    constructor({ Id, QS1 = 0.00, QS2 = 0.00, QS3 = 0.00, Identificadores = '', Inicio = new Date().toISOString(), Fim = '', ObraId = 0, TarefaId = 0, EmpresaId = 0, UserId = '', Comentario = '', Atributos = [] } = {}) {
        const date = new Date();
        this.Id = parseInt(`{date.getFullYear()}{date.getMonths()}{date.getDate()}{date.getHours()}{date.getMinutes()}{++_id}`, 10);
        this.QS1 = QS1;
        this.QS2 = QS2;
        this.QS3 = QS3;
        this.Identificadores = Identificadores;
        this.Inicio = Inicio;
        this.Fim = Fim;
        this.ObraId = ObraId;
        this.TarefaId = TarefaId;
        this.EmpresaId = EmpresaId;
        this.UserId = UserId;
        this.Comentario = Comentario;
        this.Atributos = Atributos;
        this.selecteds = {};
    }
}
export class ProducaoModel extends BasicModel {
    constructor(...args) {
        super('producao', URLs.endpoints.producao, ProdutoEntity, ...args);
        this.$httpParamSerializer = args[args.length - 1];
    }
    init() {
        this._list = [];
        this._map = {};
    }
    cancel(produto) {
        return this.unqueue(produto);
    }
    fetch() {
        return this.$q(resolve => resolve(this.list));
    }
    queue(itens) {
        itens = Array.isArray(itens) ? itens : [itens];
        itens = itens.filter(item => {
            let _item = this._map[item.Id];
            if (_item) {
                assign(_item, item);
                return false;
            }
            this._map[item.Id] = item;
            return true;
        }).map(item => this._map[item.Id]);
        this._list.push(...itens);
        return this;
    }
    create(item) {
        let produto = new this._model(item);
        if (this._map[produto.Id] === undefined) {
            this._map[produto.Id] = produto;
            this._list.push(produto);
        }
        else {
            this._map[produto.Id] = assign(this._map[produto.Id], produto);
        }
        this.Storage.save(this.type, this.list);
        return this._map[produto.Id];
    }
    old() {
        return this.Storage.get(this.type) || [];
    }
    post(items, time) {
        items = Array.isArray(items) ? items : [items];
        return items.forEach(item => {
            if (!item.Fim) {
                item.Fim = time || new Date().toISOString();
            }
            let _item = assign({}, item);
            delete (_item.Id);
            delete (_item.selecteds);
            delete (_item.sessionKey);
            return this.$http({
                url: `${URLs.services}${this.url}`,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: this.$httpParamSerializer(_item),
                params: { identify: true }
            })
                .then(resp => {
                const storage = this.Storage.get(this.type);
                if (resp.status === 201 || (resp.status === 500 && resp.data.InnerException.InnerException.ExceptionMessage.indexOf('Cannot insert duplicate key row'))) {
                    this.Storage.save(this.type, storage.filter(stor => stor.Id !== item.Id));
                }
            })
                .catch(err => {
                let storage = this.Storage.get(this.type);
                console.warn(storage);
                // storage[item.Id] = item;
                // this.Storage.save(this.type, storage);
            });
        });
    }
}
