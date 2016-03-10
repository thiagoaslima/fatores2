import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';

export class TarefaEntity extends BasicEntity {
    public Nome: string;
    public Id: number;
    public UnidadeMedida: string;
    public UnidadeMedida2: string;
    public UnidadeMedida3: string;
    public DataAtualizacao: string;
    public Funcoes: any[];
    public CenariosValor: any[];
    public AtributosProducao: any[];
    public Atividades: any[];
    
    constructor(obj) {
		super(obj);
	}
}

export function TarefaModel(...args): BasicModel {
	return new BasicModel('tarefas', URLs.endpoints.tarefas, TarefaEntity, ...args);
}