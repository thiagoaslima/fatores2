/// <reference path="../../typings/lz-string/lz-string.d.ts" />
export default class Storage {
    prefix: string;
    LZString: any;
    local: any;
    private _cache;
    constructor($window: any);
    compact(value: any[] | Object): any[];
    descompact(value: any[]): any[];
    save(type: string, values: any[]): void;
    get(type: string): any[];
}
