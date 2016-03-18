import { URLs } from '../core/settings';
import { BasicModel } from './BasicModel';
import assign from '../utils/object.assign';
let now = new Date(), year = now.getFullYear(), month = now.getMonth(), day = now.getDate();
month = month < 10 ? `0${month}` : month;
day = day < 10 ? `0${day}` : day;
let _id = parseInt(`${year}${month}${day}00000001`, 10);
export class LevantamentoEntity {
    constructor(obj) {
        this.Id = _id++;
        this.UserId = obj.UserId;
        this.TarefaId = obj.TarefaId;
        this.AtividadeId = obj.AtividadeId;
        this.AtividadeTarefaId = obj.AtividadeTarefaId;
        this.ObraId = obj.ObraId;
        this.EmpresaId = obj.EmpresaId;
        this.FuncaoId = obj.FuncaoId;
        this.QuantidadeColaboradores = obj.QuantidadeColaboradores || 1;
        this.Colaboradores = obj.Colaboradores || '';
        this.ExperienciaFuncao = obj.ExperienciaFuncao || 0;
        this.Comentario = obj.Comentario || '';
        this.Inicio = new Date().toISOString();
        this.Fim = '';
        this.DataCriacao = new Date().toISOString();
        this.DataAtualizacao = new Date().toISOString();
    }
    setConfig(obj) {
        this.UserId = obj.Usuario.Id;
        this.TarefaId = obj.Tarefa.Id;
        this.AtividadeId = obj.Atividade.Id;
        this.AtividadeTarefaId = obj.AtividadeTarefa.Id;
        this.ObraId = obj.Obra.Id;
        this.EmpresaId = obj.Empresa.Id;
        this.DataAtualizacao = new Date().toISOString();
    }
    setTrabalhador(obj) {
        this.FuncaoId = obj.Funcao.Id;
        this.QuantidadeColaboradores = obj.QuantidadeColaboradores || 1;
        this.Colaboradores = obj.Colaboradores || '';
        this.ExperienciaFuncao = obj.ExperienciaFuncao || 0;
        this.DataAtualizacao = new Date().toISOString();
    }
    finish(atividade, time) {
        let min = parseInt(atividade.DuracaoMinima, 10) > 30 ? atividade.DuracaoMinima : 30;
        let max = parseInt(atividade.DuracaoMaxima, 10) ? atividade.DuracaoMaxima : 24 * 60 * 60 * 1000;
        this.Fim = time || new Date().toISOString();
        this.DataAtualizacao = new Date().toISOString();
        let diff = new Date() - new Date(this.Inicio);
        return (diff > min && diff < max);
    }
}
export class LevantamentoModel extends BasicModel {
    constructor(...args) {
        super('levantamentos', URLs.endpoints.levantamentos, LevantamentoEntity, ...args);
        this.$httpParamSerializer = args[args.length - 1];
    }
    cancel(levantamento) {
        return this.unqueue(levantamento);
    }
    create(item) {
        let levantamento = new this._model(item);
        ;
        if (this._map[levantamento.Id] === undefined) {
            this._map[levantamento.Id] = levantamento;
            this._list.push(levantamento);
        }
        else {
            this._map[levantamento.Id] = assign(this._map[levantamento.Id], levantamento);
        }
        this.Storage.save(this.type, this.list);
        return levantamento;
    }
    post(items, time) {
        items = Array.isArray(items) ? items : [items];
        let lev = new LevantamentoEntity({});
        return items.forEach(item => {
            if (!item.Fim) {
                let fim = lev.finish.call(item, {
                    DuracaoMinima: 30,
                    DuracaoMaxima: Infinity
                }, time || new Date().toISOString());
                if (!fim) {
                    return;
                }
            }
            let _item = assign({}, item);
            delete (_item.Id);
            return this.$http({
                url: `${URLs.services}${this.url}`,
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: this.$httpParamSerializer(_item),
                params: { identify: true }
            })
                .then(resp => {
                if (resp.status === 201 || (resp.status === 500 && resp.data.InnerException.InnerException.ExceptionMessage.indexOf('Cannot insert duplicate key row'))) {
                    this.unqueue(item);
                    this.Storage.save(this.type, this.list);
                }
            })
                .catch(err => {
                // let storage = this.Storage.get(this.type);
                // storage[item.Id] = item;
                // this.Storage.save(this.type, storage);
            });
        });
    }
}
