/* globals angular: true */

import { sortByProp } from '../../utils/sorts';

export function TreeListDirective() {
    return {
        scope: {},
        bindToController: {
            service: '=',
            fullList: '=items',
            idsList: '=itemsIds',
            model: '=',
            title: '@',
            prop: '@',
            childrenProp: '@'
        },
        compile: function(element, attrs) {
            const num = Math.floor(Math.random() * 100) + 1;
            const name = attrs.title;
            const names = {
                lvl0: `${name}_parent_${num}`,
                lvl1: `${name}_lvl1_${num}`,
                lvl2: `${name}_lvl2_${num}`,
                lvl3: `${name}_lvl3_${num}`
            };

            let radios = element.find('ion-radio');

            Array.prototype.forEach.call(radios, (el, idx) => {
                return angular.element(el).attr('name', names[`lvl${idx}`]);
            });

            return {
                pre: function() { },
                post: function() { }
            }
        },
        controller: ['$scope', '$element', TreeListController],
        controllerAs: 'TreeList',
        template: `<ion-list>
                <ion-item
                    class="item item-divider"
                    ng-if='TreeList.title'>{{::TreeList.title}}</ion-item>
                <ion-item 
                    ng-if="TreeList.items[0]"
                    class="item"
                    ng-repeat="item in TreeList.items">
                    <ion-radio 
                        ng-click="TreeList.select(item, 0)" 
                        ng-value="item">
                            {{::item[TreeList.prop]}}
                    </ion-radio>
                    
                    
                    <!-- level 2 -->
                    <ion-list ng-if="TreeList.selecteds[0] === item">
                        <ion-item
                            class="item"
                            ng-repeat="item in TreeList.children[0]">
                            <ion-radio 
                                ng-click="TreeList.select(item, 1)" 
                                ng-value="item">
                                    {{::item[TreeList.prop]}}
                            </ion-radio>
                            
                            
                            
                            <!-- level 3 -->
                            <ion-list ng-if="TreeList.selecteds[1] === item">
                                <ion-item
                                    class="item"
                                    ng-repeat="item in TreeList.children[1]">
                                    <ion-radio 
                                       
                                        ng-click="TreeList.select(item, 2)" 
                                        ng-value="item">
                                            {{::item[TreeList.prop]}}
                                    </ion-radio>
                                    
                                    
                                    
                                    
                                    <!-- level 4 -->
                                    <ion-list ng-if="TreeList.selecteds[2] === item">
                                        <ion-item
                                            class="item"
                                            ng-repeat="item in TreeList.children[2]">
                                            <ion-radio 
                                                ng-click="TreeList.select(item, 3)" 
                                                ng-value="item">
                                                    {{::item[TreeList.prop]}}
                                            </ion-radio>
                                        </ion-item>
                                    </ion-list>
                                    <!-- /level 4 -->
                                    
                                    
                                    
                                    
                                </ion-item><!-- /level 3 -->
                            </ion-list>
                            
                            
                            
                            
                            
                        </ion-item><!-- /level 2 -->
                    </ion-list>
                    
                    
                    
                </ion-item>
            </ion-list>`
    };
}


export function TreeListController($scope, $elem) {
    let _sortByNome = sortByProp(this.prop);

    let _list = [],
        _ids = [],
        _full = this.fullList || [],
        _elem;

    Object.defineProperties(this, {
        'fullList': {
            set: function(value) {
                let list = value ? value.sort(_sortByNome) : [];
                this.items = list;
            }
        },

        'idsList': {
            get: function() {
                return _ids;
            },
            set: function(ids) {
                _ids = ids;
                if (this.service) {
                    this.service.get(ids).then(lista => { this.fullList = this.service.getLevel(lista); });
                }
            }
        }
    });

    this.fullList = _full;

    const childrenProp = this.childrenProp || 'children';
    this.selecteds = [];
    this.items = this.items || [];
    this.children = [];

    this.select = function(item, lvl) {
        if (this.selecteds.length > lvl) {
            this.selecteds.length = lvl;
            this.children.length = lvl;
        }

        if (!item.children.length) {
            this.model = item;
            return item;
        } else {
            this.model = null;
        }

        this.selecteds.push(item);

        if (this.filter) {
            item.children = item.children.filter(id => this.filter.indexOf(id) >= 0);
        }

        this.service.get(item.children).then(arr => {
            arr.sort(_sortByNome);
            this.children.push(arr);
        });
    };

    return this;
}


