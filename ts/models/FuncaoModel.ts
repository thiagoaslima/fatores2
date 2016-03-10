import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';

class FuncaoEntity extends BasicEntity {
	public Id: number;
	public Nome: string;
	public Descricao: string;
	public Peso: number;
    public Status: boolean;
	public DataCriacao: string;
	public DataAtualizacao: string;
    public UserId: string;
	public Usuario: string;
	public Tarefas: any[];
	public TarefasInativas: any[];
	public Levantamentos: any[];
	
	constructor(obj) {
		super(obj);
	}
}

export function FuncaoModel(...args):BasicModel {
	return new BasicModel('funcoes', URLs.endpoints.funcoes, FuncaoEntity, ...args);
}