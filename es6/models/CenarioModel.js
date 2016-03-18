import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';
class CenarioEntity extends BasicEntity {
    constructor(obj) {
        super(obj);
        this.Nome = obj.Nome.split(' ').map(str => {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        }).join(' ');
        this.selected = null;
    }
    select(item) {
        this.selected = item;
    }
}
export function CenarioModel(...args) {
    return new BasicModel('cenario', URLs.endpoints.cenarios, CenarioEntity, ...args);
}
