import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';

class CenarioEntity extends BasicEntity {
	public Id: number;
	public Nome: string;
    public Descricao: string;
    public Obrigatorio: boolean;
    public UserId: string;
    public Usuario;
	public DataCriacao: string;
	public DataAtualizacao: string;
    public Status: boolean;
    public Valores: any[];
    private selected;
	
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

export function CenarioModel(...args):BasicModel {
	return new BasicModel('cenario', URLs.endpoints.cenarios, CenarioEntity, ...args);
}