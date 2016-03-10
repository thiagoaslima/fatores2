import { BasicModel } from './BasicModel';
export declare class CenarioDiaEntity {
    Id: number;
    UserId: string;
    ObraId: number;
    EmpresaId: number;
    TarefaId: number;
    CenarioValorId: number;
    Inicio: string;
    Fim: string;
    DataCriacao: string;
    DataAtualizacao: string;
    constructor(obj: any);
    finish(time: any): boolean;
}
export declare class CenarioDiaModel extends BasicModel {
    protected $httpParamSerializer: any;
    constructor(...args: any[]);
    cancel(cenarioDia: any): BasicModel;
    create(item: any): any;
    post(items: any, time: any): any;
}
