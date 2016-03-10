import { BasicEntity, BasicModel } from './BasicModel';
export declare class TarefaEntity extends BasicEntity {
    Nome: string;
    Id: number;
    UnidadeMedida: string;
    UnidadeMedida2: string;
    UnidadeMedida3: string;
    DataAtualizacao: string;
    Funcoes: any[];
    CenariosValor: any[];
    AtributosProducao: any[];
    Atividades: any[];
    constructor(obj: any);
}
export declare function TarefaModel(...args: any[]): BasicModel;
