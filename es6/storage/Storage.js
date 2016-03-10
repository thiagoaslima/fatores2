/// <reference path="../../typings/lz-string/lz-string.d.ts" />
import { app } from '../core/settings';
let _keys = {};
export default class Storage {
    constructor($window) {
        this.LZString = $window.LZString;
        this.local = $window.localStorage;
        this.prefix = `fatores.${app.version}`;
        this._cache = {};
    }
    compact(value) {
        return this.LZString.compressToUTF16(JSON.stringify(value));
    }
    descompact(value) {
        return JSON.parse(this.LZString.decompressFromUTF16(value));
    }
    save(type, values) {
        this._cache[type] = values;
        this.local.setItem(`${this.prefix}.${type}`, this.compact(values));
    }
    get(type) {
        if (!this._cache[type] || this._cache[type].length <= 0) {
            let data = this.local.getItem(`${this.prefix}.${type}`);
            data = (data) ? this.descompact(data) : null;
            if (data) {
                this._cache[type] = data;
            }
        }
        return this._cache[type] || null;
    }
}
