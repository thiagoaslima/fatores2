export declare class BasicEntity {
    Id: number;
    constructor(obj: any);
}
export declare class BasicModel {
    $http: any;
    $q: any;
    _model: any;
    url: string;
    _selected: fatores.entidades.ProtoEntity;
    _list: any[];
    _map: Map<number, any> | Object;
    type: string;
    Storage: any;
    constructor(type: any, url: string, __model__: any, $http: any, $q: any, Storage: any);
    init(): void;
    list: any[];
    selected: fatores.entidades.ProtoEntity;
    queue(itens: Array<fatores.entidades.ProtoEntity>): BasicModel;
    unqueue(itens: Array<fatores.entidades.ProtoEntity>): BasicModel;
    select(item: any): BasicModel;
    deselect(item: any): BasicModel;
    fetch(): Promise<BasicModel | Error>;
    get(items: any): Promise<fatores.entidades.ProtoEntity[]>;
}
