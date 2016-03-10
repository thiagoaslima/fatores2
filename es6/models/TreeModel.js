import { URLs } from '../core/settings';
import assign from '../utils/object.assign';
import { sortById } from '../utils/sorts';
export class TreeEntity {
    constructor(obj) {
        Object.keys(obj).forEach(key => {
            this[key] = obj[key];
        });
        this._children = [];
    }
    get children() {
        return this._children;
    }
    registerChild(id) {
        if (this._children.indexOf(id) === -1) {
            this._children.push(id);
        }
        return this;
    }
}
export class TreeModel {
    constructor(type, url = '', parentProp, _model_, $http, $q, Storage) {
        this.$http = $http;
        this.$q = $q;
        this.url = url;
        this._model = _model_;
        // this._selected = null;
        this._list = [];
        this._map = {};
        this._roots = [];
        this.type = type;
        this.Storage = Storage;
        this.parentProp = parentProp;
        this.init();
    }
    init() {
        let items = this.Storage.get(this.type);
        if (items && items.length) {
            this.queue(items).list;
        }
    }
    get list() {
        return this._list;
    }
    get roots() {
        return this._roots;
    }
    queue(items) {
        items = Array.isArray(items) ? items : [items];
        let news = [];
        let roots = [];
        items.forEach(item => {
            let isNew = false;
            let _item = this._map[item.Id];
            if (_item) {
                this._map[item.Id] = assign(_item, item);
            }
            else {
                this._map[item.Id] = new this._model(item);
                isNew = true;
                news.push(this._map[item.Id]);
            }
            let parentId = item[this.parentProp];
            let parent = this._map[parentId];
            if (isNew && parentId === null) {
                roots.push(this._map[item.Id]);
            }
            if (parentId && !parent) {
                this._map[parentId] = new this._model({ Id: parentId });
                roots.push(this._map[parentId]);
            }
            if (parentId) {
                this._map[parentId].registerChild(item.Id);
            }
        });
        this._list.push(...items);
        this._roots.push(...roots);
        return this;
    }
    fetch() {
        let DataAtualizacao = this.Storage.get(`${this.type}.DataAtualizacao`);
        return this.$http.get(URLs.services + this.url, { params: {
                identify: true,
                data: DataAtualizacao || "1970-01-01T00:00:00.000Z"
            } }).then(resp => {
            if (resp.status === 200) {
                if (resp.data && resp.data.length) {
                    let items = this.queue(resp.data).list;
                    this.Storage.save(this.type, items);
                    this.Storage.save(`${this.type}.DataAtualizacao`, new Date().toISOString());
                }
                return this;
            }
            throw resp;
        });
    }
    getLevel(items, parent = null) {
        return items.filter(item => item[this.parentProp] === parent);
    }
    get(items) {
        if (items === null) {
            return this.$q(resolve => resolve([]));
        }
        let arr = Array.isArray(items) ? items : [items];
        let promises = [];
        let locals = [];
        arr.forEach(item => {
            let id = (item && item.Id) ? item.Id : item;
            if (this._map[id]) {
                locals.push(this._map[id]);
            }
            else {
                promises.push(id);
            }
        });
        if (promises.length === 0) {
            return this.$q((resolve, reject) => {
                resolve(locals.sort(sortById));
            });
        }
        return this.$q((resolve, reject) => {
            this.fetch().then(resp => {
                let objs = promises.map(id => this._map[id]);
                locals.push(...objs);
                return resolve(locals.sort(sortById));
            }).catch(err => reject(err));
        });
    }
}
