import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';
class AtividadeTarefaEntity extends BasicEntity {
    constructor(obj) {
        super(obj);
        this.Atividade = null;
        this.Tarefa = null;
        this.Usuario = null;
    }
}
export default function AtividadeTarefaModel(...args) {
    return new BasicModel('atividadestarefa', URLs.endpoints.atividadesTarefa, AtividadeTarefaEntity, ...args);
}
