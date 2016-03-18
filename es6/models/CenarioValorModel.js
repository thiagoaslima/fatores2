import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';
class CenarioValorEntity extends BasicEntity {
    constructor(obj) {
        super(obj);
        this.Nome = obj.Nome.split(' ').map(str => {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        }).join(' ');
    }
}
export function CenarioValorModel(...args) {
    return new BasicModel('cenariovalor', URLs.endpoints.cenariosValor, CenarioValorEntity, ...args);
}
