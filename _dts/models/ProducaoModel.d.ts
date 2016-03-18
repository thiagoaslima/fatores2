import { BasicModel } from './BasicModel';
export declare class ProdutoEntity {
    Id: number;
    QS1: number;
    QS2: number;
    QS3: number;
    Identificadores: string;
    Inicio: string;
    Fim: string;
    ObraId: number;
    TarefaId: number;
    EmpresaId: number;
    UserId: string;
    Comentario: string;
    Atributos: any[];
    selecteds: any;
    constructor({Id, QS1, QS2, QS3, Identificadores, Inicio, Fim, ObraId, TarefaId, EmpresaId, UserId, Comentario, Atributos}?: {
        Id: any;
        QS1?: number;
        QS2?: number;
        QS3?: number;
        Identificadores?: string;
        Inicio?: string;
        Fim?: string;
        ObraId?: number;
        TarefaId?: number;
        EmpresaId?: number;
        UserId?: string;
        Comentario?: string;
        Atributos?: any[];
    });
}
export declare class ProducaoModel extends BasicModel {
    protected $httpParamSerializer: any;
    constructor(...args: any[]);
    init(): void;
    cancel(produto: any): BasicModel;
    fetch(): any;
    queue(itens: Array<fatores.entidades.ProtoEntity>): BasicModel;
    create(item: any): any;
    old(): any;
    post(items: any, time: any): any;
}
