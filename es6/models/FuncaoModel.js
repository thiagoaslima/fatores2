import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';
class FuncaoEntity extends BasicEntity {
    constructor(obj) {
        super(obj);
    }
}
export function FuncaoModel(...args) {
    return new BasicModel('funcoes', URLs.endpoints.funcoes, FuncaoEntity, ...args);
}
