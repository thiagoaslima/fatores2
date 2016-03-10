import { URLs } from '../core/settings';
import { TreeEntity, TreeModel } from './TreeModel';
class ObraEntity extends TreeEntity {
    constructor(obj) {
        super(obj);
    }
}
export function ObraModel(...args) {
    return new TreeModel('obras', URLs.endpoints.obras, 'ObraId', ObraEntity, ...args);
}
