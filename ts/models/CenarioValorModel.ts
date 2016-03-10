import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';

class CenarioValorEntity extends BasicEntity {
	public Id: number;
	public Nome: string;
    public Descricao: string;
    public CenarioId: number;
    public Cenario;
    public UserId: string;
    public Usuario;
	public DataCriacao: string;
	public DataAtualizacao: string;
    public Status: boolean;
    public Obras: any[];
    public ObrasInativos: any[];
    public TarefasProducao: any[];
    public TarefasProducaoInativos: any[];
    public TarefasCenarioDia: any[];
    public TarefasCenarioDiaInativos: any[];
    public CenariosDia: any[];
    public Producao: any[];
	
	constructor(obj) {
		super(obj);
        this.Nome = obj.Nome.split(' ').map(str => {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        }).join(' ');
	}
}

export function CenarioValorModel(...args):BasicModel {
	return new BasicModel('cenariovalor', URLs.endpoints.cenariosValor, CenarioValorEntity, ...args);
}