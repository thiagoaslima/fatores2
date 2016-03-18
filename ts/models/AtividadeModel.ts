import { URLs } from '../core/settings';
import { TreeEntity, TreeModel } from './TreeModel';
import { sortById, sortByProp } from '../utils/sorts';

let _sortByNome = sortByProp('Nome');

export class AtividadeEntity extends TreeEntity {
    public Id: number;
    public AtividadePaiId: number;
	public Nome: string;
    public Cor: string;
    public DuracaoMinima: number;
	public DuracaoMaxima: number;
    public Status: boolean;
    public AtividadesFilhas: number[];
	public AtividadesTarefa: number[];
	public DataAtualizacao: string;
    public Membros: any[];
	
	constructor(obj) {
        let _nome;
        
		super(obj);
        
        Object.defineProperty(this, 'Nome', {
            get: function() {
                return _nome;
            },
            set: function(value) {
                if (!value) {
                    _nome = '';
                } else {
                    _nome = value.split('.').map(str => {
                        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
                    }).join('.');    
                }
            }
        });
        
        this.Nome = obj.Nome;
        this.Membros = [];
	}
    
    setToMember(membro) {
        this.Membros.push(membro);
    }
    
    removeMember(membro) {
        this.Membros.splice(this.Membros.indexOf(membro), 1);
    }
}

export class AtividadeModel extends TreeModel {
    private tarefa;
    
    constructor(...args) {
        super('atividades', URLs.endpoints.atividades, 'AtividadePaiId', AtividadeEntity, ...args);
        this.tarefa = null;
    }
    
    public setTarefa(tarefa) {
        this.tarefa = tarefa;
    }
    
    public getLevel(items) {
        let _cache = {};
        let map = items.reduce( (map, item) => {
            
            while (item.AtividadePaiId) {
                if (_cache[item.AtividadePaiId]) {
                    return map;   
                }
                _cache[item.AtividadePaiId] = true;
                item = this._map[item.AtividadePaiId];
                
            }
            if (map[item.Id] === undefined) {
                map[item.Id] = this._map[item.Id];    
            }
            
            return map;
        }, {});
        
        return Object.keys(map).map(id => map[id]).sort(_sortByNome);
    }
    
    public get(items: any): Promise<fatores.entidades.ProtoEntity[]> {
        if (items === null) {
            return this.$q( resolve => resolve([]) );
        }
        
		let arr: any[] = Array.isArray(items) ? items : [items];
        
        if (this.tarefa) {
            arr = arr.sort( (a, b) => a - b)
                .filter(id => {
                    return this.tarefa.Atividades.indexOf(id) >= 0
                })
                .reduce( (arr, item, idx) => {
                    if (!arr.length) {
                        arr.push(item);
                    }
                    if (arr.length && arr[arr.length - 1]  !== item) {
                        arr.push(item);
                    }
                    return arr;
                }, []);    
        }
        
		
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
		
        if (promises.length === 0) {
            return this.$q( (resolve, reject) => {
                resolve(locals.sort(sortById));
            });
        }
		
		return this.$q( (resolve, reject) => {
            this.fetch().then(resp => {
                let objs = promises.map( id => this._map[id]);
                locals.push(...objs);
                return resolve(locals.sort(sortById));
            }).catch(err => reject(err) );
		});
	}
}
// export function AtividadeModel(...args):TreeModel {
// 	return new TreeModel('atividades', URLs.endpoints.atividades, 'AtividadePaiId', AtividadeEntity, ...args);
// }

export const Aguardando = new AtividadeEntity({
    Id: 0,
    AtividadePaiId: null,
	Nome: 'Aguardando',
    Cor: '#B0B0BB',
    DuracaoMinima: 30,
	DuracaoMaxima: null,
    Status: true,
    AtividadesFilhas: [],
	AtividadesTarefa: [],
	DataAtualizacao: new Date().toISOString()
});
