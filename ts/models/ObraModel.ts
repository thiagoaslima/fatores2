import { URLs } from '../core/settings';
import { TreeEntity, TreeModel } from './TreeModel';

class ObraEntity extends TreeEntity {
	public Id: number;
	public Nome: string;
    public EmpresaId: number;
    public ObraId: number;
	public Contratadas: number[];
	public DataAtualizacao: string;
	
	constructor(obj) {
		super(obj);
	}
}

export function ObraModel(...args):TreeModel {
	return new TreeModel('obras', URLs.endpoints.obras, 'ObraId', ObraEntity, ...args);
}