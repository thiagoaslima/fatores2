import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';

class AtividadeTarefaEntity extends BasicEntity {
    public Id: number;
	public AtividadeId: number;
	public Atividade: null;
	public TarefaId: number;
	public Tarefa: null;
	public UserId: string;
	public Usuario: null;
	public ParticipaQS: boolean;
	public PercentualQS: number;
	public PercentualQS2: number;
	public PercentualQS3: number;
	public DataCriacao: string;
	public DataAtualizacao: string;
	public Status: boolean;
    public Levantamentos: any[];
        
     constructor(obj) {
         super(obj);
     }
}

export default function AtividadeTarefaModel(...args) {
    return new BasicModel('atividadestarefa', URLs.endpoints.atividadesTarefa, AtividadeTarefaEntity, ...args);
}