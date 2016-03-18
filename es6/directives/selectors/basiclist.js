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
			<!--
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
            -->
            
            <!-- level 1 -->
            <ion-item
                ng-if="BasicList.model"
                ng-click="BasicList.optionsOpen = true"
                ng-hide="BasicList.optionsOpen">
                    {{BasicList.model[BasicList.prop]}}
            </ion-item>
            
            <ion-item 
                ng-if="BasicList.items.length"
                ng-click="BasicList.optionsOpen = false"
                ng-show="BasicList.optionsOpen"
                class="item"
                ng-repeat="item in BasicList.items">
				<ion-radio 
					ng-model="BasicList.model" 
					ng-value="item">
						{{::item[BasicList.prop]}}
				</ion-radio>
			</ion-item>
                </ion-item>
		</ion-list>`
    };
}
export function BasicListController($scope) {
    const ctrl = this;
    let _sortByName = sortByProp(this.prop);
    window.ctrls = window.ctrls || {};
    window.ctrls[this.title] = ctrl;
    let _list = [], _ids = [];
    this.items = [];
    this.name = this.title;
    this.optionsOpen = true;
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
    $scope.$watch(() => this.items, (newVal, oldVal) => {
        if (newVal.length && !newVal[0]) {
            ctrl.items.length = 0;
        }
        this.optionsOpen = true;
    });
    if (this.items.length === 1) {
        this.model = this.items[0];
        this.optionsOpen = false;
    }
    return this;
}
