/// <reference path="../../typings/lz-string/lz-string.d.ts" />

import { defaultUser } from '../models/UserModel';
import { app } from '../core/settings';
import { mapify, arrify } from '../utils/transformLists';

let _keys = {};

export default class Storage {
	public prefix: string;
	public LZString;
	public local;
	// private _types: string[];
	private _cache: Map<string, any[]>;

	constructor($window) {
		this.LZString = $window.LZString;
		this.local = $window.localStorage;
		this.prefix = `fatores.${app.version}`;
		this._cache = <Map<string, any>>{};
	}

	public compact(value: any[]|Object):any[] {
		return this.LZString.compressToUTF16(JSON.stringify(value));
		// return JSON.stringify(value);
	}
	
	public descompact(value: any[]):any[] {
		return JSON.parse(this.LZString.decompressFromUTF16(value));
		// return JSON.parse(value);
	}
	
	public save(type: string, values: any[]):void {
		this._cache[type] = values;
		this.local.setItem(`${this.prefix}.${type}`, this.compact(values));
	}
	
	public get(type: string): any[] {
		if (!this._cache[type] || this._cache[type].length <= 0) {
			let data = this.local.getItem(`${this.prefix}.${type}`);
			data = (data) ? this.descompact(data) : null;
            if (data) {
                this._cache[type] = data;    
            }
		}
		
		return this._cache[type] || null;
	}
    
    public erase(type: string):void {
        this.local.removeItem(type);
    }
	
}