import { URLs } from '../core/settings';
import { BasicEntity, BasicModel } from './BasicModel';
import assign from '../utils/object.assign';

let now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth(),
    day = now.getDate();

month = month < 10 ? `0${month}` : month;
day = day < 10 ? `0${day}` : day;

let _id = parseInt(`${year}${month}${day}00000001`, 10);

export class CenarioDiaEntity {
    public Id: number;
    
    public UserId: string;
    public ObraId: number;
    public EmpresaId: number;
    public TarefaId: number;
    public CenarioValorId: number;

    public Inicio: string;
    public Fim: string;
    public DataCriacao: string;
    public DataAtualizacao: string;
    

    constructor(obj) {
        this.Id = _id++;
        
        this.UserId = obj.UserId;
        this.ObraId = obj.ObraId;
        this.EmpresaId = obj.EmpresaId;
        this.TarefaId = obj.TarefaId;
        this.CenarioValorId = obj.CenarioValorId;        

        this.Inicio = obj.Inicio || new Date().toISOString();
        this.Fim = '';
        this.DataCriacao = new Date().toISOString();
        this.DataAtualizacao = new Date().toISOString();
    }

  
    finish(time) {
        this.Fim = time || new Date().toISOString();
        this.DataAtualizacao = new Date().toISOString();
        
        return true;
    }
}

let alreadyCreateds = {};

export class CenarioDiaModel extends BasicModel {
    protected $httpParamSerializer;

    constructor(...args) {
        super('cenariosDia', URLs.endpoints.cenariosDia, CenarioDiaEntity, ...args);
        this.$httpParamSerializer = args[args.length - 1];
    }
    
    cancel(cenarioDia) {
        return this.unqueue(cenarioDia);
    }

    create(item) {
        let cenarioDia = new this._model(item);

        if (this._map[cenarioDia.Id] === undefined) {
            this._map[cenarioDia.Id] = cenarioDia;
            this._list.push(cenarioDia);
        } else {
            this._map[cenarioDia.Id] = assign(this._map[cenarioDia.Id], cenarioDia);
        }

        this.Storage.save(this.type, this.list);
        return cenarioDia;
    }

    post(items, time) {
        items = Array.isArray(items) ? items : [items];
        let cen = new CenarioDiaEntity({});
        
        return items.forEach(item => {
            
            if (!item.Fim) {
                let fim = cen.finish.call(item, time || new Date().toISOString());
                
                if (!fim) {
                    return;
                }
            }
            
            let _item = assign({}, item);
            delete(_item.Id);
            
            return this.$http({
                    url: `${URLs.services}${this.url}`,
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: this.$httpParamSerializer(_item),
                    params: {identify: true } 
                })
                .then(resp => {
                    if (resp.status === 201 || (resp.status === 500 && resp.data.InnerException.InnerException.ExceptionMessage.indexOf('Cannot insert duplicate key row') )) {
                        this.unqueue(item);
                        this.Storage.save(this.type, this.list);   
                    }
                })
                .catch(err => {
                    // let storage = this.Storage.get(this.type);
                    // storage[item.Id] = item;
                    // this.Storage.save(this.type, storage);
                });
        });
    }
    
}

