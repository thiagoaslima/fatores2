import { TreeEntity, TreeModel } from './TreeModel';
export declare class AtividadeEntity extends TreeEntity {
    Id: number;
    AtividadePaiId: number;
    Nome: string;
    Cor: string;
    DuracaoMinima: number;
    DuracaoMaxima: number;
    Status: boolean;
    AtividadesFilhas: number[];
    AtividadesTarefa: number[];
    DataAtualizacao: string;
    Membros: any[];
    constructor(obj: any);
    setToMember(membro: any): void;
    removeMember(membro: any): void;
}
export declare class AtividadeModel extends TreeModel {
    private tarefa;
    constructor(...args: any[]);
    setTarefa(tarefa: any): void;
    getLevel(items: any): any[];
    get(items: any): Promise<fatores.entidades.ProtoEntity[]>;
}
export declare const Aguardando: AtividadeEntity;
