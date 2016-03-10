import { BasicModel } from './BasicModel';
export declare class LevantamentoEntity {
    Id: number;
    UserId: string;
    TarefaId: number;
    AtividadeId: number;
    AtividadeTarefaId: number;
    FuncaoId: number;
    ObraId: number;
    EmpresaId: number;
    QuantidadeColaboradores: number;
    Colaboradores: string;
    ExperienciaFuncao: number;
    Comentario: string;
    Inicio: string;
    Fim: string;
    DataCriacao: string;
    DataAtualizacao: string;
    constructor(obj: any);
    setConfig(obj: any): void;
    setTrabalhador(obj: any): void;
    finish(atividade: any, time: any): boolean;
}
export declare class LevantamentoModel extends BasicModel {
    protected $httpParamSerializer: any;
    constructor(...args: any[]);
    cancel(levantamento: any): BasicModel;
    create(item: any): any;
    post(items: any, time: any): any;
}
