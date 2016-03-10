export declare class TreeEntity {
    Id: number;
    protected _children: number[];
    constructor(obj: any);
    children: number[];
    registerChild(id: any): this;
}
export declare class TreeModel {
    $http: any;
    $q: any;
    _model: any;
    url: string;
    _list: any[];
    _map: Map<number, any> | Object;
    _roots: any;
    type: string;
    private Storage;
    parentProp: string;
    constructor(type: any, url: string, parentProp: any, _model_: any, $http: any, $q: any, Storage: any);
    init(): void;
    list: any[];
    roots: any;
    queue(items: any): this;
    fetch(): Promise<TreeModel | Error>;
    getLevel(items: any, parent?: any): any;
    get(items: any): Promise<fatores.entidades.ProtoEntity[]>;
}
