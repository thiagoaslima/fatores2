import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';

class EmpresaEntity extends BasicEntity {
	public Id: number;
	public RazaoSocial: string;
	public Tarefas: number[];
	public Obras: number[];
	public DataAtualizacao: string;
	
	constructor(obj) {
		super(obj);
        this.RazaoSocial = obj.RazaoSocial.split(' ').map(str => {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        }).join(' ');
	}
}

export function EmpresaModel(...args):BasicModel {
	return new BasicModel('empresas', URLs.endpoints.empresas, EmpresaEntity, ...args);
}