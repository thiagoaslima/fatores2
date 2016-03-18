import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';
class EmpresaEntity extends BasicEntity {
    constructor(obj) {
        super(obj);
        this.RazaoSocial = obj.RazaoSocial.split(' ').map(str => {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        }).join(' ');
    }
}
export function EmpresaModel(...args) {
    return new BasicModel('empresas', URLs.endpoints.empresas, EmpresaEntity, ...args);
}
