import { sortByProp } from '../../utils/sorts';
export function BasicListDirective() {
    return {
        scope: {},
        bindToController: {
            service: '=',
            fullList: '=items',
            idsList: '=itemsIds',
            model: '=',
            title: '@',
            prop: '@'
        },
        compile: function (element, attrs) {
            const num = Math.floor(Math.random() * 100) + 1;
            const name = attrs.title;
            let radio = element.find('ion-radio');
            radio.attr('name', `${name}_${num}`);
            return {
                pre: function () { },
                post: function () { }
            };
        },
        link: function (scope, element, attrs) {
            let name = attrs.title;
            angular.element(element).attr('name', name);
        },
        controller: ['$scope', BasicListController],
        controllerAs: 'BasicList',
        template: `<ion-list>
			<ion-item class="item item-divider">{{::BasicList.title}}</ion-item>
			<ion-item 
                ng-if="BasicList.items[0]"
                class="item"
				ng-repeat="item in BasicList.items">
				<ion-radio 
					ng-model="BasicList.model" 
					ng-value="item">
						{{::item[BasicList.prop]}}
				</ion-radio>
			</ion-item>
		</ion-list>`
    };
}
export function BasicListController($scope) {
    let _sortByName = sortByProp(this.prop);
    let _list = [], _ids = [];
    this.items = [];
    this.name = this.title;
    Object.defineProperties(this, {
        'fullList': {
            set: function (value) {
                let list = value ? value.sort(_sortByName) : [];
                this.items = list;
            }
        },
        'idsList': {
            get: function () {
                return _ids;
            },
            set: function (ids) {
                _ids = ids;
                if (this.service) {
                    this.service.get(ids).then(lista => { this.fullList = lista; });
                }
            }
        }
    });
    return this;
}
