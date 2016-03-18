import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';
export class TarefaEntity extends BasicEntity {
    constructor(obj) {
        super(obj);
    }
}
export function TarefaModel(...args) {
    return new BasicModel('tarefas', URLs.endpoints.tarefas, TarefaEntity, ...args);
}
