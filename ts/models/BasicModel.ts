import { URLs } from '../core/settings';
import assign from '../utils/object.assign';
import { sortById } from '../utils/sorts';

const capitalize = function(value) {
    if (!value) {
        return '';
    }
    return value.split(' ').map(str => {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
    }).join(' ');
};

export class BasicEntity {
	public Id: number;

	constructor(obj) {
		Object.keys(obj).forEach( key => {
			this[key] = obj[key];
            if (key === 'Nome' || key === 'RazaoSocial') {
                this[key] === capitalize(obj[key]);
            }
		});
	}
}

export class BasicModel {
	public $http;
	public $q;
	public _model;
	public url: string;
	public _selected: fatores.entidades.ProtoEntity;
	public _list: any[];
	public _map: Map<number, any>|Object;
    public type: string;
    public Storage;
	
	constructor(type, url = '', __model__, $http, $q, Storage) {
		this.$http = $http;
		this.$q = $q;
		this.url = url;
		this._model = __model__;
		this._selected = null;
		this._list = [];
		this._map = {};
        this.type = type;
        this.Storage = Storage;
        
        this.init();
	}
    
    init():void {
        let items = this.Storage.get(this.type);
        if (items && items.length) {
            this.queue(items).list
        }
    }
	
	get list() {
		return this._list;
	}
	
	get selected() {
		return this._selected;
	}
	
	public queue(itens: Array<fatores.entidades.ProtoEntity>):BasicModel {
		itens = Array.isArray(itens) ? itens : [itens];
		
		itens = itens.filter( item => {
			let _item = this._map[item.Id]; 
			
			if (_item) {
				assign(_item, item);
				return false;
			}
			
			this._map[item.Id] = new this._model(item);
			return true;
		}).map( item => this._map[item.Id] );
		
		this._list.push(...itens);
		return this;
	}
	
	public unqueue(itens: Array<fatores.entidades.ProtoEntity>):BasicModel {
		itens = Array.isArray(itens) ? itens : [itens];
		
		itens.forEach( item => {
			let _item = this._map[item.Id]; 
			
			if (_item) {
				_item._delete = true; 
			}
			
			return item;
		});
		
		this._list.map( (item, idx) => {
			return item._delete === true ? idx : null;
		}).filter( item => {
			return item !== null
		}).reverse().forEach( num => {
			return this._list.splice(num, 1);
		});
		
		return this;
	}
	
	public select(item): BasicModel {
		let _item = this._map[item.Id];
		
		if (_item) {
			_item._selected = true;
			
			if (this._selected) {
				this.deselect(this._selected);
			}
			
			this._selected = _item;
		}
		
		return this;
	}
	
	public deselect(item): BasicModel {
		if (this._selected && this._selected.Id === item.Id) {
			this._selected._selected = false;
			this._selected = null;
		}
		
		return this;
	}
	
	public fetch(): Promise<BasicModel|Error> {
        let DataAtualizacao = this.Storage.get(`${this.type}.DataAtualizacao`);	
		return this.$http.get( URLs.services + this.url, {params: {
            identify: true,
            data: DataAtualizacao || "1970-01-01T00:00:00.000Z"
        }} ).then( resp => {
			if (resp.status === 200) {
                if (resp.data && resp.data.length) {
                    let items = this.queue(resp.data).list;
                    this.Storage.save(this.type, items);
                    this.Storage.save(`${this.type}.DataAtualizacao`, new Date().toISOString());        
                } 
                
                return this;
			} 
			
			throw resp;
		})
	}
	
	public get(items: any): Promise<fatores.entidades.ProtoEntity[]> {
        if (items === null) {
            return this.$q( resolve => resolve([]) );
        }
        
		let arr: any[] = Array.isArray(items) ? items : [items];
		
		let promises: number[] = [];
		let locals: fatores.entidades.ProtoEntity[] = [];
		
		arr.forEach( item => {
			let id: number = (item && item.Id) ? item.Id : item;
			
			if (this._map[id]) {
				locals.push(this._map[id]);
			} else {
				promises.push(id);
			}
		});
		
		
		return this.$q( (resolve, reject) => {
			if (promises.length === 0) {
				return resolve(locals.sort(sortById));
			}
			
			this.fetch().then(resp => {
                let objs = promises.map( id => this._map[id]);
                locals.push(...objs);
				return resolve(locals.sort(sortById));
			}).catch(err => reject(err) );
			
		});
	}
 }