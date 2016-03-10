(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _routes = require('./core/routes');

var _routes2 = _interopRequireDefault(_routes);

var _UserModel = require('./models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _EmpresaModel = require('./models/EmpresaModel');

var _ObraModel = require('./models/ObraModel');

var _TarefaModel = require('./models/TarefaModel');

var _FuncaoModel = require('./models/FuncaoModel');

var _AtividadeModel = require('./models/AtividadeModel');

var _AtividadeTarefaModel = require('./models/AtividadeTarefaModel');

var _AtividadeTarefaModel2 = _interopRequireDefault(_AtividadeTarefaModel);

var _LevantamentoModel = require('./models/LevantamentoModel');

var _CenarioModel = require('./models/CenarioModel');

var _CenarioValorModel = require('./models/CenarioValorModel');

var _CenarioDiaModel = require('./models/CenarioDiaModel');

var _Session = require('./core/Session');

var _Session2 = _interopRequireDefault(_Session);

var _loginController = require('./login/loginController');

var _loginController2 = _interopRequireDefault(_loginController);

var _ConfigurationController = require('./configuration/ConfigurationController');

var _ConfigurationController2 = _interopRequireDefault(_ConfigurationController);

var _EquipeController = require('./equipe/EquipeController');

var _EquipeController2 = _interopRequireDefault(_EquipeController);

var _RecursosController = require('./recursos/RecursosController');

var _RecursosController2 = _interopRequireDefault(_RecursosController);

var _AtividadesController = require('./atividades/AtividadesController');

var _AtividadesController2 = _interopRequireDefault(_AtividadesController);

var _CenariosController = require('./cenarios/CenariosController');

var _CenariosController2 = _interopRequireDefault(_CenariosController);

var _basiclist = require('./directives/selectors/basiclist');

var _treelist = require('./directives/selectors/treelist');

var _storage = require('./storage/storage');

var _storage2 = _interopRequireDefault(_storage);

var _login = require('./login/login.interceptors');

var _login2 = _interopRequireDefault(_login);

var _loading = require('./core/loading.interceptor');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var angular = window.angular;

angular.module('app', ['ionic', 'ngCordova', 'angulartics', 'angulartics.google.analytics.cordova']).directive('basicList', _basiclist.BasicListDirective).directive('treeList', _treelist.TreeListDirective).service('UserModel', ['$window', '$q', '$http', 'Storage', _UserModel2.default]).controller('LoginController', ['$state', 'UserModel', 'Storage', 'Session', _loginController2.default]).service('Session', _Session2.default).service('Storage', ['$window', _storage2.default]).service('EmpresaModel', ['$http', '$q', 'Storage', _EmpresaModel.EmpresaModel]).service('ObraModel', ['$http', '$q', 'Storage', _ObraModel.ObraModel]).service('TarefaModel', ['$http', '$q', 'Storage', _TarefaModel.TarefaModel]).service('FuncaoModel', ['$http', '$q', 'Storage', _FuncaoModel.FuncaoModel]).service('AtividadeModel', ['$http', '$q', 'Storage', _AtividadeModel.AtividadeModel]).service('AtividadeTarefaModel', ['$http', '$q', 'Storage', _AtividadeTarefaModel2.default]).service('CenarioModel', ['$http', '$q', 'Storage', _CenarioModel.CenarioModel]).service('CenarioValorModel', ['$http', '$q', 'Storage', _CenarioValorModel.CenarioValorModel]).service('LevantamentoModel', ['$http', '$q', 'Storage', '$httpParamSerializer', _LevantamentoModel.LevantamentoModel]).service('CenarioDiaModel', ['$http', '$q', 'Storage', '$httpParamSerializer', _CenarioDiaModel.CenarioDiaModel]).controller('ConfigurationController', ['$scope', '$ionicHistory', '$state', 'Session', 'UserModel', 'EmpresaModel', 'ObraModel', 'TarefaModel', 'AtividadeModel', 'AtividadeTarefaModel', _ConfigurationController2.default]).controller('EquipeController', ['Session', 'FuncaoModel', _EquipeController2.default]).controller('RecursosController', ['$q', '$state', 'Session', 'AtividadeModel', 'LevantamentoModel', 'CenarioDiaModel', _RecursosController2.default]).controller('AtividadesController', ['$state', 'Session', 'AtividadeModel', 'LevantamentoModel', _AtividadesController2.default]).controller('CenariosController', ['$scope', '$state', 'Session', 'CenarioModel', 'CenarioValorModel', 'CenarioDiaModel', _CenariosController2.default]).config(['$stateProvider', '$urlRouterProvider', _routes2.default]).service('httpInterceptor', ['Session', _login2.default]).service('loadingStatus', ['$injector', _loading2.default]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.timeout = 2000;
    $httpProvider.interceptors.push('httpInterceptor');
    $httpProvider.interceptors.push('loadingStatus');
}]).run(['$ionicPlatform', '$rootScope', function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        var cordova = window.cordova,
            plugins = window.plugins,
            gaPlugin = plugins ? plugins.gaPlugin : null,
            statusBar = window.StatusBar;
        if (gaPlugin) {
            gaPlugin.init(function () {
                $rootScope.gaConnected = true;
            }, function () {
                $rootScope.gaConnected = false;
            }, 'UA-71620104-1', 10);
        } else {
            console.log('no plugin');
        }
        if (cordova && cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (statusBar) {
            // org.apache.cordova.statusbar required
            statusBar.styleDefault();
        }
    });
}]).run(['$rootScope', '$state', 'Session', function ($rootScope, $state, Session) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //console.log('start', arguments);
        if (toState.restrict && !Session.started) {
            event.preventDefault(), $state.go('login');
        }
    });
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        /*console.log('not found');
        console.log(unfoundState.to); // "lazy.state"
        console.log(unfoundState.toParams); // {a:1, b:2}
        console.log(unfoundState.options); // {inherit:false} + default options
        */
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //console.log('success', arguments);
    });
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        // console.log('error', arguments);
    });
    $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
        // Access to all the view config properties.
        // and one special property 'targetView'
        // viewConfig.targetView
        // console.log('loading', arguments);
    });
    $rootScope.$on('$viewContentLoaded', function (event) {
        // console.log('loaded', arguments);
    });
}]);
try {
    angular.module('app').config(['googleAnalyticsCordovaProvider', function (googleAnalyticsCordovaProvider) {
        googleAnalyticsCordovaProvider.trackingId = 'UA-71620104-1';
        googleAnalyticsCordovaProvider.period = 20; // default: 10 (in seconds)
        googleAnalyticsCordovaProvider.debug = true; // default: false
    }]);
} catch (err) {}

},{"./atividades/AtividadesController":2,"./cenarios/CenariosController":4,"./configuration/ConfigurationController":6,"./core/Session":8,"./core/loading.interceptor":9,"./core/routes":10,"./directives/selectors/basiclist":12,"./directives/selectors/treelist":13,"./equipe/EquipeController":14,"./login/login.interceptors":16,"./login/loginController":18,"./models/AtividadeModel":19,"./models/AtividadeTarefaModel":20,"./models/CenarioDiaModel":22,"./models/CenarioModel":23,"./models/CenarioValorModel":24,"./models/EmpresaModel":25,"./models/FuncaoModel":26,"./models/LevantamentoModel":27,"./models/ObraModel":28,"./models/TarefaModel":29,"./models/UserModel":31,"./recursos/RecursosController":32,"./storage/storage":35}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _object = require('../utils/object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AtividadesController = function () {
    function AtividadesController($state, Session, AtividadeModel, LevantamentoModel) {
        _classCallCheck(this, AtividadesController);

        this.$state = $state;
        this.Session = Session;
        this.equipe = Session.equipe;
        this.atividades = Session.atividades;
        this.AtividadeModel = AtividadeModel;
        this.LevantamentoModel = LevantamentoModel;
        this.atividadeSelected = null;
    }

    _createClass(AtividadesController, [{
        key: 'reset',
        value: function reset() {
            this.equipe.forEach(function (membro) {
                return membro.deselect();
            });
            this.atividadeSelected = null;
        }
    }, {
        key: 'setLevantamento',
        value: function setLevantamento($event) {
            var _this = this;

            $event.preventDefault();
            var selecteds = this.equipe.filter(function (membro) {
                return membro.isSelected();
            }).concat(this.atividadeSelected.Membros).filter(function (membro, idx, arr) {
                return arr.indexOf(membro) === idx;
            });
            var funcoes = selecteds.reduce(function (map, membro) {
                map[membro.Funcao.Id] = map[membro.Funcao.Id] || [];
                map[membro.Funcao.Id].push(membro);
                return map;
            }, {});
            var levantamentos = Object.keys(funcoes).map(function (id) {
                var membros = funcoes[id];
                if (membros.length === 1 && membros[0].Atividade === _this.atividadeSelected) {
                    return;
                }
                var base = {
                    UserId: _this.Session.user.UserId,
                    EmpresaId: _this.Session.empresa.Id,
                    ObraId: _this.Session.obra.Id,
                    TarefaId: _this.Session.tarefa.Id,
                    AtividadeId: _this.atividadeSelected.Id,
                    AtividadeTarefaId: _this.Session.atividadesTarefa.filter(function (item) {
                        return item.AtividadeId === _this.atividadeSelected.Id;
                    })[0].Id
                };
                membros.forEach(function (membro) {
                    membro.Atividade.removeMember(membro);
                    if (!membro.Levantamento) {
                        return;
                    }
                    if (!membro.Levantamento.finish(membro.Atividade)) {
                        _this.LevantamentoModel.cancel(membro.Levantamento);
                    }
                });
                var _lev = (0, _object2.default)({}, base, {
                    FuncaoId: membros[0].Funcao.Id,
                    QuantidadeColaboradores: membros.length,
                    Colaboradores: membros.map(function (membro) {
                        return membro.Nome;
                    }).join(' '),
                    ExperienciaFuncao: membros.reduce(function (total, membro) {
                        return total + membro.Experiencia;
                    }, 0),
                    Comentario: ''
                });
                var levantamento = _this.atividadeSelected.Id === 0 ? null : _this.LevantamentoModel.create(_lev);
                membros.forEach(function (membro) {
                    membro.Levantamento = levantamento;
                    membro.setAtividade(_this.atividadeSelected);
                    _this.atividadeSelected.setToMember(membro);
                });
            });
            this.reset();
            this.$state.go('recursos');
        }
    }]);

    return AtividadesController;
}();

exports.default = AtividadesController;

},{"../utils/object.assign":36}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "<ion-view title=\"Atividades\">\n    <ion-nav-buttons side=\"right\">\n        <a ui-sref=\"recursos\" class=\"icon button button-balanced ion-checkmark\" \n            ng-click=\"AtividadesCtrl.setLevantamento($event)\"\n            ng-show=\"AtividadesCtrl.atividadeSelected\"></a>\n    </ion-nav-buttons>\n\n    <ion-content overflow-scroll=\"true\" padding=\"'true'\" class=\"has-header\">\n        \n       <div class=\"list card\">\n            <ion-list>\n                <ion-item ng-repeat=\"atividade in AtividadesCtrl.atividades\">\n                    <div class=\"item item-divider\">\n                    {{::atividade.Nome}}\n                    {{::atividade.AtividadesFilhas}}\n                    </div>\n                </ion-item>\n            </ion-list>    \n       \n            <tree-list \n                service=\"AtividadesCtrl.AtividadeModel\"\n                filter=\"AtividadesCtrl.Session.tarefa.Atividades\"\n                model=\"AtividadesCtrl.atividadeSelected\"\n                items=\"AtividadesCtrl.atividades\"\n                title=\"Atividades\"\n                prop=\"Nome\"\n                children-prop=\"AtividadesFilhas\" />\n       \n        </div>\n        \n        <ion-list>\n        <ion-item class=\"item item-divider\">Equipe</ion-item>\n            <ion-item class=\"item\" ng-repeat=\"membro in AtividadesCtrl.equipe\">\n                <ion-checkbox ng-model=\"membro._selected\">{{::membro.Nome}}</ion-checkbox>\n            </ion-item>\n        <ion-list>\n    </ion-content>\n    \n    <!--\n    <ion-footer-bar >\n        <div class=\"row\">\n            <div class=\"col\">\n                <a ui-sref=\"recursos\" \n                        class=\"button button-stable button-block\">Cancelar</a>\n            </div>\n            <div class=\"col\">\n                <a ui-sref=\"recursos\" \n                    class=\"button button-stable button-block\"\n                    ng-click=\"AtividadesCtrl.setLevantamento($event)\">Confirmar</a>\n            </div>\n        </div>\n    </ion-footer-bar>\n    -->\n</ion-view>";

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _object = require('../utils/object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var base = {
    UserId: '',
    ObraId: 0,
    EmpresaId: 0,
    TarefaId: 0
};

var CenariosController = function () {
    function CenariosController($scope, $state, Session, CenarioModel, CenarioValorModel, CenarioDiaModel) {
        var _this = this;

        _classCallCheck(this, CenariosController);

        this.$scope = $scope;
        this.$state = $state;
        this.cenarios = [];
        this.visibles = {};
        this.modified = {};
        this.Session = Session;
        this.CenarioDiaModel = CenarioDiaModel;
        base = {
            UserId: Session.user.UserId,
            ObraId: Session.obra.Id,
            EmpresaId: Session.empresa.Id,
            TarefaId: Session.tarefa.Id
        };
        this.init(Session, CenarioModel, CenarioValorModel);
        this.$scope.$on('$ionicView.beforeLeave', function () {
            _this.cenarios.forEach(function (cenario) {
                _this.modified[cenario.Id] = cenario.selected;
            });
        });
    }

    _createClass(CenariosController, [{
        key: 'init',
        value: function init(Session, CenarioModel, CenarioValorModel) {
            var _this2 = this;

            debugger;
            var _cenariosValor = CenarioValorModel.list.filter(function (item) {
                return Session.tarefa.CenariosValor.indexOf(item.Id) >= 0;
            });
            var _map = {};
            var _cenariosId = _cenariosValor.map(function (item) {
                _map[item.CenarioId] = _map[item.CenarioId] || [];
                _map[item.CenarioId].push(item);
                return item.CenarioId;
            }).filter(function (id, idx, arr) {
                return arr.indexOf(id) === idx;
            }).sort(function (a, b) {
                return a - b;
            });
            CenarioModel.get(_cenariosId).then(function (cenarios) {
                cenarios.forEach(function (cenario) {
                    if (!cenario.Valores.length) {
                        var _cenario$Valores;

                        var valores = _map[cenario.Id];
                        (_cenario$Valores = cenario.Valores).push.apply(_cenario$Valores, _toConsumableArray(valores));
                        cenario.Valores.filter(function (valor, idx, arr) {
                            return arr.indexOf(valor) === idx;
                        });
                    }
                });
                _this2.cenarios = cenarios;
            });
        }
    }, {
        key: 'toggle',
        value: function toggle(id) {
            this.visibles[id] = !this.visibles[id];
        }
    }, {
        key: 'isVisible',
        value: function isVisible(id) {
            return this.visibles[id];
        }
    }, {
        key: 'isModified',
        value: function isModified(cenario) {
            return cenario.selected !== this.modified[cenario.Id];
        }
    }, {
        key: 'select',
        value: function select(cenario, valor) {
            this.createRegistro(cenario, valor);
            cenario.select(valor);
            this.toggle(cenario.Id);
        }
    }, {
        key: 'createRegistro',
        value: function createRegistro(cenario, valor) {
            var _registro = (0, _object2.default)({}, base, {
                CenarioValorId: valor.Id,
                Inicio: cenario.selected ? new Date().toISOString() : this.Session.startTime
            });
            this.CenarioDiaModel.create(_registro);
        }
    }]);

    return CenariosController;
}();

exports.default = CenariosController;

},{"../utils/object.assign":36}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "<ion-view title=\"Cenários\">\n    \n    <div class=\"tabs tabs-striped tabs-top tabs-balanced\">\n        <a ui-sref=\"cenarios\" ui-sref-active=\"active\" class=\"tab-item\">\n            Cenários\n        </a>\n        <a ui-sref=\"recursos\" ui-sref-active=\"active\" class=\"tab-item\">\n            Recursos\n        </a>\n        <a ui-sref=\"producao\" ui-sref-active=\"active\" class=\"tab-item\">\n            Produção\n        </a>\n    </div>\n        \n    <ion-content overflow-scroll=\"true\" padding=\"'true'\" class=\"has-header has-tabs-top\"> \n     \n       <ion-list>\n        <ion-item ng-style=\"CenariosCtrl.isModified(cenario) ? {'background-color': 'light-yellow'} : {}\" ng-repeat=\"cenario in CenariosCtrl.cenarios\">\n                <h2 ng-click=\"CenariosCtrl.toggle(cenario.Id)\" class=\"item item-divider\">\n                    {{::cenario.Nome}}\n                </h2>\n                <div ng-hide=\"CenariosCtrl.isVisible(cenario.Id)\">\n                    <ion-item ng-click=\"CenariosCtrl.toggle(cenario.Id)\" ng-if=\"cenario.selected\">{{cenario.selected.Nome}}</ion-item>\n                    <ion-item ng-click=\"CenariosCtrl.toggle(cenario.Id)\" ng-if=\"!cenario.selected\">Selecione uma das opções</ion-item>\n                </div>\n                <ion-list ng-show=\"CenariosCtrl.isVisible(cenario.Id)\">\n                    <ion-checkbox ng-repeat=\"valor in cenario.Valores\"\n                        ng-value=\"valor\"\n                        ng-selected=\"cenario.selected === valor\" \n                        ng-click=\"CenariosCtrl.select(cenario, valor)\">\n                        {{::valor.Nome}}\n                    </ion-item>\n                </ion-list>\n        \n        </ion-item>\n       </ion-list>\n\n    </ion-content>\n\n    <ion-footer-bar ng-show=\"ConfigCtrl.selected.tarefa\">\n        <div class=\"col\">\n        <a ui-sref=\"login\" class=\"button button-stable button-outline button-block\">Cancelar</a>\n        </div>\n        <div class=\"col\">\n        <a ui-sref=\"equipe\" ng-click=\"ConfigCtrl.save($event)\" class=\"button button-balanced button-outline button-block\">Confirmar</a>\n        </div>\n    </ion-footer-bar>\n    \n</ion-view>";

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigurationController = function () {
    function ConfigurationController($scope, $ionicHistory, $state, Session, UserModel, EmpresaModel, ObraModel, TarefaModel, AtividadeModel, AtividadeTarefaModel) {
        _classCallCheck(this, ConfigurationController);

        this.$scope = $scope;
        this.Session = Session;
        this.UserModel = UserModel;
        this.EmpresaModel = EmpresaModel;
        this.ObraModel = ObraModel;
        this.TarefaModel = TarefaModel;
        this.AtividadeModel = AtividadeModel;
        this.AtividadeTarefaModel = AtividadeTarefaModel;
        this.$state = $state;
        $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
        });
        this.selectables = {
            empresas: [],
            obras: [],
            contratadas: [],
            tarefas: []
        };
        this.selected = {};
        var _selected = {
            empresa: Session.empresa || null,
            obra: Session.obra || null,
            contratada: Session.contratada || null,
            tarefa: Session.tarefa || null
        };
        var controller = this;
        Object.defineProperties(this.selected, {
            "empresa": {
                get: function get() {
                    return _selected.empresa;
                },
                set: function set(value) {
                    _selected.empresa = value || null;
                    _selected.obra = null;
                    _selected.contratada = null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(function () {
                        if (value === null) {
                            controller.selectables.obras = [];
                        }
                        controller.selectables.contratadas = [];
                        controller.selectables.tarefas = [];
                    });
                }
            },
            "obra": {
                get: function get() {
                    return _selected.obra;
                },
                set: function set(value) {
                    _selected.obra = value || null;
                    _selected.contratada = null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(function () {
                        if (value === null) {
                            controller.selectables.contratadas = [];
                        }
                        controller.selectables.tarefas = [];
                    });
                }
            },
            "contratada": {
                get: function get() {
                    return _selected.contratada;
                },
                set: function set(value) {
                    _selected.contratada = value || null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(function () {
                        if (value === null) {
                            controller.selectables.tarefas = [];
                        }
                    });
                }
            },
            "tarefa": {
                get: function get() {
                    return _selected.tarefa;
                },
                set: function set(value) {
                    _selected.tarefa = value;
                }
            }
        });
        this.init();
    }

    _createClass(ConfigurationController, [{
        key: "init",
        value: function init() {
            var _this = this;

            var Obras = undefined;
            var listaObras = this.ObraModel.get(this.UserModel.user.Obras);
            listaObras.then(function (lista) {
                _this.selectables.obras = _this.ObraModel.getLevel(lista);
                return _this.selectables.obras;
            }).then(function (lista) {
                return lista.map(function (obra) {
                    return obra.EmpresaId;
                }).sort().filter(function (id, idx, arr) {
                    return arr.indexOf(id) === idx;
                });
            }).then(function (lista) {
                return _this.EmpresaModel.get(lista).then(function (empresas) {
                    _this.selectables.empresas = empresas;
                });
            });
        }
    }, {
        key: "save",
        value: function save($event) {
            var _this2 = this;

            $event.preventDefault();
            if (this.selected.tarefa) {
                this.Session.setConfig({
                    empresa: this.selected.empresa,
                    obra: this.selected.obra,
                    contratada: this.selected.contratada,
                    tarefa: this.selected.tarefa
                });
                this.AtividadeModel.setTarefa(this.selected.tarefa);
                this.AtividadeModel.get(this.selected.tarefa.Atividades).then(function (atividades) {
                    _this2.Session.setAtividades(_this2.AtividadeModel.getLevel(atividades));
                    _this2.Session.setAtividadesTarefa(_this2.AtividadeTarefaModel.list.filter(function (item) {
                        return item.TarefaId === _this2.Session.tarefa.Id;
                    }));
                    _this2.$state.go('equipe');
                });
            }
        }
    }]);

    return ConfigurationController;
}();

exports.default = ConfigurationController;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "<ion-view title=\"Configuração\">\n    <ion-nav-buttons side=\"right\">\n        <button class=\"icon button button-balanced ion-checkmark\" \n            ng-show=\"ConfigCtrl.selected.tarefa\"\n            ng-click=\"ConfigCtrl.save($event)\"></button>\n    </ion-nav-buttons>\n\n    <ion-content overflow-scroll=\"true\" padding=\"'true'\" class=\"has-header\"> \n     \n        <div class=\"list card\">\n            <basic-list \n                model=\"ConfigCtrl.selected.empresa\"\n                items=\"ConfigCtrl.selectables.empresas\"\n                title=\"Empresa\"\n                prop=\"RazaoSocial\" />\n        </div>\n        \n        <div class=\"list card\">\n            <tree-list \n                service=\"ConfigCtrl.ObraModel\"\n                model=\"ConfigCtrl.selected.obra\"\n                items-ids=\"ConfigCtrl.selected.empresa.Obras\"\n                title=\"Obras\"\n                prop=\"Nome\" />\n        </div>\n\n        <div class=\"list card\">\n            <basic-list \n                service=\"ConfigCtrl.EmpresaModel\"\n                model=\"ConfigCtrl.selected.contratada\"\n                items-ids=\"ConfigCtrl.selected.obra.Contratadas\"\n                title=\"Contratada\"\n                prop=\"RazaoSocial\" />\n        </div>\n                \n       <div class=\"list card\">\n            <basic-list \n                service=\"ConfigCtrl.TarefaModel\"\n                model=\"ConfigCtrl.selected.tarefa\"\n                items-ids=\"ConfigCtrl.selected.contratada.Tarefas\"\n                title=\"Tarefa\"\n                prop=\"Nome\" />\n        </div>\n\n    </ion-content>\n\n    <!--\n    <ion-footer-bar ng-show=\"ConfigCtrl.selected.tarefa\">\n        <div class=\"col\">\n        <a ui-sref=\"login\" class=\"button button-stable button-outline button-block\">Cancelar</a>\n        </div>\n        <div class=\"col\">\n        <a ui-sref=\"equipe\" ng-click=\"ConfigCtrl.save($event)\" class=\"button button-balanced button-outline button-block\">Confirmar</a>\n        </div>\n    </ion-footer-bar>\n    -->\n</ion-view>";

},{}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AtividadeModel = require('../models/AtividadeModel');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = function () {
    function Session() {
        _classCallCheck(this, Session);

        this.DataAtualizacao = '';
        this.started = false;
        this.user = null;
        this.empresa = null;
        this.obra = null;
        this.contratada = null;
        this.tarefa = null;
        this.equipe = [];
        this.atividades = [_AtividadeModel.Aguardando];
        this.atividadesTarefa = [];
    }

    _createClass(Session, [{
        key: 'setUser',
        value: function setUser(user) {
            this.user = user;
        }
    }, {
        key: 'setConfig',
        value: function setConfig(selecteds) {
            this.empresa = selecteds.empresa;
            this.obra = selecteds.obra;
            this.contratada = selecteds.contratada;
            this.tarefa = selecteds.tarefa;
        }
    }, {
        key: 'setAtividades',
        value: function setAtividades(atividades) {
            var _atividades;

            (_atividades = this.atividades).push.apply(_atividades, _toConsumableArray(atividades));
        }
    }, {
        key: 'setAtividadesTarefa',
        value: function setAtividadesTarefa(atvTar) {
            var _atividadesTarefa;

            (_atividadesTarefa = this.atividadesTarefa).push.apply(_atividadesTarefa, _toConsumableArray(atvTar));
        }
    }, {
        key: 'getToken',
        value: function getToken() {
            return this.user ? this.user.Token : '';
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.DataAtualizacao = '';
            this.started = false;
            this.user = null;
            this.empresa = null;
            this.obra = null;
            this.contratada = null;
            this.tarefa = null;
            this.equipe = [];
            this.atividades = [_AtividadeModel.Aguardando];
            this.atividadesTarefa = [];
        }
    }, {
        key: 'start',
        value: function start() {
            this.started = true;
            this.DataAtualizacao = new Date().toISOString();
        }
    }, {
        key: 'end',
        value: function end() {
            this.started = false;
        }
    }]);

    return Session;
}();

exports.default = Session;

},{"../models/AtividadeModel":19}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadingStatus;

var _settings = require('./settings');

function loadingStatus($injector) {
    var numLoadings = 0;
    return {
        request: function request(config) {
            var $ionicLoading = $injector.get('$ionicLoading');
            if (config.url.indexOf(_settings.URLs.services) === 0) {
                numLoadings++;
                config.timeout = 2500;
            }
            if (numLoadings > 0) {
                $ionicLoading.show();
            }
            return config;
        },
        response: function response(_response) {
            var $ionicLoading = $injector.get('$ionicLoading');
            if (_response.config.url.indexOf(_settings.URLs.services) === 0) {
                numLoadings--;
            }
            if (numLoadings <= 0) {
                numLoadings = 0;
                $ionicLoading.hide();
            }
            return _response;
        },
        responseError: function responseError(response) {
            var $ionicLoading = $injector.get('$ionicLoading');
            if (response.config.url.indexOf(_settings.URLs.services) === 0) {
                numLoadings--;
            }
            if (numLoadings <= 0) {
                numLoadings = 0;
                $ionicLoading.hide();
            }
            return response;
        }
    };
}

},{"./settings":11}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = router;

var _login = require('../login/login.template');

var _login2 = _interopRequireDefault(_login);

var _sidebar = require('../sidebar/sidebar.template');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _configuration = require('../configuration/configuration.template');

var _configuration2 = _interopRequireDefault(_configuration);

var _equipe = require('../equipe/equipe.template');

var _equipe2 = _interopRequireDefault(_equipe);

var _recursos = require('../recursos/recursos.template');

var _recursos2 = _interopRequireDefault(_recursos);

var _atividades = require('../atividades/atividades.template');

var _atividades2 = _interopRequireDefault(_atividades);

var _cenarios = require('../cenarios/cenarios.template');

var _cenarios2 = _interopRequireDefault(_cenarios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function router($stateProvider, $urlRouterProvider) {
    var orig = $stateProvider.state;
    $stateProvider.state = function (name, obj) {
        if (obj.restrict === undefined) {
            obj.restrict = true;
        }
        return orig(name, obj);
    };
    var fetch = function fetch(model) {
        var attempt = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        return model.fetch().finally(function (resp) {
            console.log(model.type, attempt);
            if (model.list.length) {
                return model;
            }
            if (attempt > 5) {
                throw new Error('Não foi possui recuperar dados de ' + model.type);
            }
            return fetch(model, ++attempt);
        });
    };
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    $stateProvider.state('menu', {
        url: '/app',
        abstract: true,
        template: _sidebar2.default
    }).state('login', {
        url: '/login',
        template: _login2.default,
        controller: 'LoginController',
        controllerAs: 'LoginCtrl',
        restrict: false
    }).state('configuration', {
        parent: "menu",
        url: '/configuration',
        views: {
            'side-menu': {
                template: _configuration2.default,
                controller: 'ConfigurationController',
                controllerAs: 'ConfigCtrl',
                resolve: {
                    empresas: ['EmpresaModel', function (model) {
                        return fetch(model);
                    }],
                    obras: ['ObraModel', function (model) {
                        return fetch(model);
                    }],
                    tarefas: ['TarefaModel', function (model) {
                        return fetch(model);
                    }],
                    funcoes: ['FuncaoModel', function (model) {
                        return fetch(model);
                    }],
                    atividades: ['AtividadeModel', function (model) {
                        return fetch(model);
                    }],
                    atividadesTarefa: ['AtividadeTarefaModel', function (model) {
                        return fetch(model);
                    }],
                    cenarios: ['CenarioModel', function (model) {
                        return fetch(model);
                    }],
                    cenariosValor: ['CenarioValorModel', function (model) {
                        return fetch(model);
                    }]
                }
            }
        }
    }).state('equipe', {
        parent: "menu",
        url: '/equipe',
        views: {
            'side-menu': {
                template: _equipe2.default,
                controller: 'EquipeController',
                controllerAs: 'EquipeCtrl'
            }
        }
    }).state('recursos', {
        parent: "menu",
        url: '/recursos',
        views: {
            'side-menu': {
                template: _recursos2.default,
                controller: 'RecursosController',
                controllerAs: 'RecursosCtrl'
            }
        }
    }).state('atividades', {
        parent: "menu",
        url: '/atividades',
        views: {
            'side-menu': {
                template: _atividades2.default,
                controller: 'AtividadesController',
                controllerAs: 'AtividadesCtrl'
            }
        }
    }).state('cenarios', {
        parent: "menu",
        url: '/cenarios',
        views: {
            'side-menu': {
                template: _cenarios2.default,
                controller: 'CenariosController',
                controllerAs: 'CenariosCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
}

},{"../atividades/atividades.template":3,"../cenarios/cenarios.template":5,"../configuration/configuration.template":7,"../equipe/equipe.template":15,"../login/login.template":17,"../recursos/recursos.template":33,"../sidebar/sidebar.template":34}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var URLs = exports.URLs = {
    // services: 'http://localhost:4720',
    services: 'https://fatoresweb.azurewebsites.net/api/v1',
    endpoints: {
        token: '/token',
        empresas: '/empresa',
        obras: '/obra',
        tarefas: '/tarefa',
        funcoes: '/funcao',
        atividades: '/atividade',
        atividadesTarefa: '/atividadetarefa',
        levantamentos: '/levantamento',
        cenarios: '/cenario',
        cenariosValor: '/cenariovalor',
        cenariosDia: '/cenariodia'
    }
};
var app = exports.app = {
    version: '0.2.0'
};

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicListDirective = BasicListDirective;
exports.BasicListController = BasicListController;

var _sorts = require('../../utils/sorts');

function BasicListDirective() {
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
        compile: function compile(element, attrs) {
            var num = Math.floor(Math.random() * 100) + 1;
            var name = attrs.title;
            var radio = element.find('ion-radio');
            radio.attr('name', name + '_' + num);
            return {
                pre: function pre() {},
                post: function post() {}
            };
        },
        link: function link(scope, element, attrs) {
            var name = attrs.title;
            angular.element(element).attr('name', name);
        },
        controller: ['$scope', BasicListController],
        controllerAs: 'BasicList',
        template: '<ion-list>\n\t\t\t<ion-item class="item item-divider">{{::BasicList.title}}</ion-item>\n\t\t\t<ion-item \n                ng-if="BasicList.items[0]"\n                class="item"\n\t\t\t\tng-repeat="item in BasicList.items">\n\t\t\t\t<ion-radio \n\t\t\t\t\tng-model="BasicList.model" \n\t\t\t\t\tng-value="item">\n\t\t\t\t\t\t{{::item[BasicList.prop]}}\n\t\t\t\t</ion-radio>\n\t\t\t</ion-item>\n\t\t</ion-list>'
    };
}
function BasicListController($scope) {
    var _sortByName = (0, _sorts.sortByProp)(this.prop);
    var _list = [],
        _ids = [];
    this.items = [];
    this.name = this.title;
    Object.defineProperties(this, {
        'fullList': {
            set: function set(value) {
                var list = value ? value.sort(_sortByName) : [];
                this.items = list;
            }
        },
        'idsList': {
            get: function get() {
                return _ids;
            },
            set: function set(ids) {
                var _this = this;

                _ids = ids;
                if (this.service) {
                    this.service.get(ids).then(function (lista) {
                        _this.fullList = lista;
                    });
                }
            }
        }
    });
    return this;
}

},{"../../utils/sorts":37}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeListDirective = TreeListDirective;
exports.TreeListController = TreeListController;

var _sorts = require('../../utils/sorts');

function TreeListDirective() {
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
        compile: function compile(element, attrs) {
            var num = Math.floor(Math.random() * 100) + 1;
            var name = attrs.title;
            var names = {
                lvl0: name + '_parent_' + num,
                lvl1: name + '_lvl1_' + num,
                lvl2: name + '_lvl2_' + num,
                lvl3: name + '_lvl3_' + num
            };
            var radios = element.find('ion-radio');
            Array.prototype.forEach.call(radios, function (el, idx) {
                return angular.element(el).attr('name', names['lvl' + idx]);
            });
            return {
                pre: function pre() {},
                post: function post() {}
            };
        },
        controller: ['$scope', '$element', TreeListController],
        controllerAs: 'TreeList',
        template: '<ion-list>\n                <ion-item\n                    class="item item-divider"\n                    ng-if=\'TreeList.title\'>{{::TreeList.title}}</ion-item>\n                <ion-item \n                    ng-if="TreeList.items[0]"\n                    class="item"\n                    ng-repeat="item in TreeList.items">\n                    <ion-radio \n                        ng-click="TreeList.select(item, 0)" \n                        ng-value="item">\n                            {{::item[TreeList.prop]}}\n                    </ion-radio>\n                    \n                    \n                    <!-- level 2 -->\n                    <ion-list ng-if="TreeList.selecteds[0] === item">\n                        <ion-item\n                            class="item"\n                            ng-repeat="item in TreeList.children[0]">\n                            <ion-radio \n                                ng-click="TreeList.select(item, 1)" \n                                ng-value="item">\n                                    {{::item[TreeList.prop]}}\n                            </ion-radio>\n                            \n                            \n                            \n                            <!-- level 3 -->\n                            <ion-list ng-if="TreeList.selecteds[1] === item">\n                                <ion-item\n                                    class="item"\n                                    ng-repeat="item in TreeList.children[1]">\n                                    <ion-radio \n                                       \n                                        ng-click="TreeList.select(item, 2)" \n                                        ng-value="item">\n                                            {{::item[TreeList.prop]}}\n                                    </ion-radio>\n                                    \n                                    \n                                    \n                                    \n                                    <!-- level 4 -->\n                                    <ion-list ng-if="TreeList.selecteds[2] === item">\n                                        <ion-item\n                                            class="item"\n                                            ng-repeat="item in TreeList.children[2]">\n                                            <ion-radio \n                                                ng-click="TreeList.select(item, 3)" \n                                                ng-value="item">\n                                                    {{::item[TreeList.prop]}}\n                                            </ion-radio>\n                                        </ion-item>\n                                    </ion-list>\n                                    <!-- /level 4 -->\n                                    \n                                    \n                                    \n                                    \n                                </ion-item><!-- /level 3 -->\n                            </ion-list>\n                            \n                            \n                            \n                            \n                            \n                        </ion-item><!-- /level 2 -->\n                    </ion-list>\n                    \n                    \n                    \n                </ion-item>\n            </ion-list>'
    };
} /* globals angular: true */

function TreeListController($scope, $elem) {
    var _sortByNome = (0, _sorts.sortByProp)(this.prop);
    var _list = [],
        _ids = [],
        _full = this.fullList || [],
        _elem = undefined;
    Object.defineProperties(this, {
        'fullList': {
            set: function set(value) {
                var list = value ? value.sort(_sortByNome) : [];
                this.items = list;
            }
        },
        'idsList': {
            get: function get() {
                return _ids;
            },
            set: function set(ids) {
                var _this = this;

                _ids = ids;
                if (this.service) {
                    this.service.get(ids).then(function (lista) {
                        _this.fullList = _this.service.getLevel(lista);
                    });
                }
            }
        }
    });
    this.fullList = _full;
    var childrenProp = this.childrenProp || 'children';
    this.selecteds = [];
    this.items = this.items || [];
    this.children = [];
    this.select = function (item, lvl) {
        var _this2 = this;

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
            item.children = item.children.filter(function (id) {
                return _this2.filter.indexOf(id) >= 0;
            });
        }
        this.service.get(item.children).then(function (arr) {
            arr.sort(_sortByNome);
            _this2.children.push(arr);
        });
    };
    return this;
}

},{"../../utils/sorts":37}],14:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AtividadeModel = require("../models/AtividadeModel");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Membro = function () {
    function Membro(_ref) {
        var Nome = _ref.Nome;
        var Experiencia = _ref.Experiencia;
        var Funcao = _ref.Funcao;

        _classCallCheck(this, Membro);

        this.Nome = Nome;
        this.Experiencia = Experiencia || 0;
        this.Funcao = Funcao;
        this.Atividade = _AtividadeModel.Aguardando;
        this.Levantamento = null;
        this._selected = false;
    }

    _createClass(Membro, [{
        key: "setAtividade",
        value: function setAtividade(atividade) {
            this.Atividade = atividade;
        }
    }, {
        key: "select",
        value: function select() {
            this._selected = true;
        }
    }, {
        key: "deselect",
        value: function deselect() {
            this._selected = false;
        }
    }, {
        key: "isSelected",
        value: function isSelected() {
            return this._selected;
        }
    }, {
        key: "toggleSelection",
        value: function toggleSelection() {
            this._selected = !this._selected;
        }
    }]);

    return Membro;
}();

var EquipeController = function () {
    function EquipeController(Session, FuncaoModel) {
        _classCallCheck(this, EquipeController);

        this.Session = Session;
        this.FuncaoModel = FuncaoModel;
        this.funcoes = [];
        this.equipe = this.Session.equipe;
        this.showForm = false;
        this.membro = {};
        this.init();
    }

    _createClass(EquipeController, [{
        key: "init",
        value: function init() {
            var _this = this;

            this.FuncaoModel.get(this.Session.tarefa.Funcoes).then(function (funcoes) {
                var _funcoes;

                funcoes = funcoes.map(function (funcao) {
                    funcao._qty = 0;
                    return funcao;
                });
                (_funcoes = _this.funcoes).push.apply(_funcoes, _toConsumableArray(funcoes));
            });
        }
    }, {
        key: "openForm",
        value: function openForm(funcao) {
            this.membro = {
                Nome: funcao.Nome + " " + (funcao._qty + 1),
                Funcao: funcao
            };
            this.showForm = true;
        }
    }, {
        key: "closeForm",
        value: function closeForm() {
            this.membro = {};
            this.showForm = false;
        }
    }, {
        key: "addMembro",
        value: function addMembro() {
            var _membro = new Membro(this.membro);
            this.equipe.push(_membro);
            this.membro.Funcao._qty += 1;
            this.closeForm();
            _AtividadeModel.Aguardando.setToMember(_membro);
        }
    }, {
        key: "removeMembro",
        value: function removeMembro(membro) {
            membro.Funcao._qty -= 1;
            this.equipe.splice(this.equipe.indexOf(membro), 1);
            _AtividadeModel.Aguardando.removeMember(membro);
        }
    }]);

    return EquipeController;
}();

exports.default = EquipeController;

},{"../models/AtividadeModel":19}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "<ion-view title=\"Equipe\">\n    <ion-nav-buttons side=\"right\">\n        <a ui-sref=\"recursos\" class=\"icon button button-balanced ion-checkmark\" \n            ng-show=\"EquipeCtrl.equipe.length\"></a>\n    </ion-nav-buttons>\n    \n    <ion-content overflow-scroll=\"true\" padding=\"'true'\" class=\"has-header\">\n       <div class=\"\"> \n        <div class=\"\">\n        <ul class=\"list\">\n            <li class=\"item\" \n                ng-repeat=\"funcao in EquipeCtrl.funcoes\" \n                ng-click=\"EquipeCtrl.openForm(funcao)\">\n                <h3><i class=\"icon ion-plus\"></i> {{::funcao.Nome}}</h3>\n                <span>{{funcao._qty}} {{funcao._qty !== 1 ? 'Membros' : 'Membro'}}</span>\n            </li>\n        </ul>\n        </div>\n        \n        <div class=\"\">\n            <form class=\"list\" ng-show=\"EquipeCtrl.showForm\">\n                <label class=\"item item-input item-stacked-label\" name=\"nomeMembro\">\n                    <span class=\"input-label\">Nome</span>\n                    <input type=\"text\" placeholder=\"\" ng-model=\"EquipeCtrl.membro.Nome\">\n                </label>\n                <label class=\"item item-input item-stacked-label\" name=\"experiencia\">\n                    <span class=\"input-label\">Experiência</span>\n                    <input type=\"number\" placeholder=\"\" ng-model=\"EquipeCtrl.membro.Experiencia\">\n                </label>\n                <label class=\"item item-select item-stacked-label\" name=\"unExperiencia\">\n                    <span class=\"input-label\">Unidade exp.</span>\n                    <select>\n                        <option>anos</option>\n                        <option>meses</option>\n                    </select>\n                </label>\n                <div class=\"button-bar\">\n                    <button \n                        class=\"button button-assertive button-block\"\n                        ng-click=\"EquipeCtrl.closeForm()\">Cancelar</button>\n                    <button \n                        class=\"button button-balanced button-block\" \n                        ng-click=\"EquipeCtrl.addMembro()\">Confirmar</button>\n                </div>\n            </form>\n            \n            <ion-list>\n                <ion-item class=\"item-icon-right\" ng-repeat=\"membro in EquipeCtrl.equipe\">\n                    <h2>{{::membro.Nome}}</h2>\n                    <small>{{::membro.Funcao.Nome}}</small>\n                    <i class=\"icon ion-trash-b\" ng-click=\"EquipeCtrl.removeMembro(membro)\"></i>\n                </ion-item>\n            </ion-list>\n        </div>\n        </div>\n    </ion-content>\n    \n    <!--\n    <ion-footer-bar>\n        <div class=\"col\">\n        <a ui-sref=\"configuration\" class=\"button button-stable button-outline button-block\">Cancelar</a>\n        </div>\n        <div class=\"col\">\n        <a ui-sref=\"recursos\" class=\"button button-balanced button-outline button-block\">Confirmar</a>\n        </div>\n    </ion-footer-bar>\n    -->\n</ion-view>";

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = interceptHttp;
function interceptHttp(Session) {
    return {
        request: function request(config) {
            if (config.params && config.params.identify) {
                var params = config.params;
                var token = Session.getToken();
                if (!token) {
                    config.timeout = 1;
                } else {
                    params.token = token;
                }
                delete params.identify;
            }
            return config;
        }
    };
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n<ion-view title=\"Login\">\n    <ion-content overflow-scroll=\"true\" padding=\"'true'\" class=\"has-header\">\n\n        <div>\n            <i class=\"icon ion-image\"></i>\n        </div>\n\n        <form class=\"list\">\n            <ion-list>\n                <label class=\"item item-input\">\n                    <span class=\"input-label\">Nome de usuário</span>\n                    <input ng-model=\"LoginCtrl.UserName\" type=\"text\" placeholder=\"\">\n                </label>\n                <label class=\"item item-input\">\n                    <span class=\"input-label\">Senha</span>\n                    <input ng-model=\"LoginCtrl.Password\" type=\"password\" placeholder=\"\">\n                </label>\n            </ion-list>\n            <div class=\"spacer\" style=\"height: 40px;\"></div>\n            <button type=\"submit\" class=\"button button-balanced button-block\"\n            ng-click=\"LoginCtrl.login($event, LoginCtrl.UserName, LoginCtrl.Password)\">Entrar</button>\n        </form>\n\t\t\n    </ion-content>\n</ion-view>\n";

},{}],18:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _object = require('../utils/object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginController = function () {
    function LoginController($state, UserModel, Storage, Session) {
        _classCallCheck(this, LoginController);

        this.$state = $state;
        this.Storage = Storage;
        this.Session = Session;
        this.UserModel = UserModel;
        this.UserName = '';
        this.Password = '';
    }

    _createClass(LoginController, [{
        key: 'login',
        value: function login(evt, username, password) {
            var _this = this;

            var loginOnline = _loginOnline.bind(this),
                loginOffline = _loginOffline.bind(this);
            loginOnline(username, password).then(function (resp) {
                return enterOnApp.bind(_this)(resp);
            }).catch(function (err) {
                var users = [];
                return loginOffline(username, password).then(function (resp) {
                    enterOnApp.bind(_this)(resp);
                }).catch(function (err) {
                    console.log('Não reconhecido');
                });
            });
        }
    }]);

    return LoginController;
}();

exports.default = LoginController;

function _loginOnline(username, password) {
    return this.UserModel.checkOnline(username, password);
}
function _loginOffline(username, password) {
    var users = this.Storage.get('users') || [];
    return this.UserModel.checkCredentials(users, username, password);
}
function enterOnApp(user) {
    var users = this.Storage.get('users') || [];
    var update = users.filter(function (obj) {
        return obj.UserId === user.UserId;
    });
    if (update.length) {
        (0, _object2.default)(update[0], user);
    } else {
        users.push(user);
    }
    this.Storage.save('users', users);
    this.Session.setUser(user);
    this.Session.start();
    return this.$state.go('configuration');
}

},{"../utils/object.assign":36}],19:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Aguardando = exports.AtividadeModel = exports.AtividadeEntity = undefined;

var _settings = require('../core/settings');

var _TreeModel2 = require('./TreeModel');

var _sorts = require('../utils/sorts');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _sortByNome = (0, _sorts.sortByProp)('Nome');

var AtividadeEntity = exports.AtividadeEntity = function (_TreeEntity) {
    _inherits(AtividadeEntity, _TreeEntity);

    function AtividadeEntity(obj) {
        _classCallCheck(this, AtividadeEntity);

        var _nome = undefined;

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AtividadeEntity).call(this, obj));

        Object.defineProperty(_this, 'Nome', {
            get: function get() {
                return _nome;
            },
            set: function set(value) {
                if (!value) {
                    _nome = '';
                } else {
                    _nome = value.split('.').map(function (str) {
                        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
                    }).join('.');
                }
            }
        });
        _this.Nome = obj.Nome;
        _this.Membros = [];
        return _this;
    }

    _createClass(AtividadeEntity, [{
        key: 'setToMember',
        value: function setToMember(membro) {
            this.Membros.push(membro);
        }
    }, {
        key: 'removeMember',
        value: function removeMember(membro) {
            this.Membros.splice(this.Membros.indexOf(membro), 1);
        }
    }]);

    return AtividadeEntity;
}(_TreeModel2.TreeEntity);

var AtividadeModel = exports.AtividadeModel = function (_TreeModel) {
    _inherits(AtividadeModel, _TreeModel);

    function AtividadeModel() {
        var _Object$getPrototypeO;

        _classCallCheck(this, AtividadeModel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AtividadeModel)).call.apply(_Object$getPrototypeO, [this, 'atividades', _settings.URLs.endpoints.atividades, 'AtividadePaiId', AtividadeEntity].concat(args)));

        _this2.tarefa = null;
        return _this2;
    }

    _createClass(AtividadeModel, [{
        key: 'setTarefa',
        value: function setTarefa(tarefa) {
            this.tarefa = tarefa;
        }
    }, {
        key: 'getLevel',
        value: function getLevel(items) {
            var _this3 = this;

            var _cache = {};
            var map = items.reduce(function (map, item) {
                while (item.AtividadePaiId) {
                    if (_cache[item.AtividadePaiId]) {
                        return map;
                    }
                    _cache[item.AtividadePaiId] = true;
                    item = _this3._map[item.AtividadePaiId];
                }
                if (map[item.Id] === undefined) {
                    map[item.Id] = _this3._map[item.Id];
                }
                return map;
            }, {});
            return Object.keys(map).map(function (id) {
                return map[id];
            }).sort(_sortByNome);
        }
    }, {
        key: 'get',
        value: function get(items) {
            var _this4 = this;

            if (items === null) {
                return this.$q(function (resolve) {
                    return resolve([]);
                });
            }
            var arr = Array.isArray(items) ? items : [items];
            if (this.tarefa) {
                arr = arr.sort(function (a, b) {
                    return a - b;
                }).filter(function (id) {
                    return _this4.tarefa.Atividades.indexOf(id) >= 0;
                }).reduce(function (arr, item, idx) {
                    if (!arr.length) {
                        arr.push(item);
                    }
                    if (arr.length && arr[arr.length - 1] !== item) {
                        arr.push(item);
                    }
                    return arr;
                }, []);
            }
            var promises = [];
            var locals = [];
            arr.forEach(function (item) {
                var id = item && item.Id ? item.Id : item;
                if (_this4._map[id]) {
                    locals.push(_this4._map[id]);
                } else {
                    promises.push(id);
                }
            });
            if (promises.length === 0) {
                return this.$q(function (resolve, reject) {
                    resolve(locals.sort(_sorts.sortById));
                });
            }
            return this.$q(function (resolve, reject) {
                _this4.fetch().then(function (resp) {
                    var objs = promises.map(function (id) {
                        return _this4._map[id];
                    });
                    locals.push.apply(locals, _toConsumableArray(objs));
                    return resolve(locals.sort(_sorts.sortById));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }]);

    return AtividadeModel;
}(_TreeModel2.TreeModel);
// export function AtividadeModel(...args):TreeModel {
// 	return new TreeModel('atividades', URLs.endpoints.atividades, 'AtividadePaiId', AtividadeEntity, ...args);
// }

var Aguardando = exports.Aguardando = new AtividadeEntity({
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

},{"../core/settings":11,"../utils/sorts":37,"./TreeModel":30}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = AtividadeTarefaModel;

var _settings = require('../core/settings');

var _BasicModel = require('./BasicModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AtividadeTarefaEntity = function (_BasicEntity) {
    _inherits(AtividadeTarefaEntity, _BasicEntity);

    function AtividadeTarefaEntity(obj) {
        _classCallCheck(this, AtividadeTarefaEntity);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AtividadeTarefaEntity).call(this, obj));

        _this.Atividade = null;
        _this.Tarefa = null;
        _this.Usuario = null;
        return _this;
    }

    return AtividadeTarefaEntity;
}(_BasicModel.BasicEntity);

function AtividadeTarefaModel() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(_BasicModel.BasicModel, [null].concat(['atividadestarefa', _settings.URLs.endpoints.atividadesTarefa, AtividadeTarefaEntity], args)))();
}

},{"../core/settings":11,"./BasicModel":21}],21:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicModel = exports.BasicEntity = undefined;

var _settings = require('../core/settings');

var _object = require('../utils/object.assign');

var _object2 = _interopRequireDefault(_object);

var _sorts = require('../utils/sorts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var capitalize = function capitalize(value) {
    if (!value) {
        return '';
    }
    return value.split(' ').map(function (str) {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }).join(' ');
};

var BasicEntity = exports.BasicEntity = function BasicEntity(obj) {
    var _this = this;

    _classCallCheck(this, BasicEntity);

    Object.keys(obj).forEach(function (key) {
        _this[key] = obj[key];
        if (key === 'Nome' || key === 'RazaoSocial') {
            _this[key] === capitalize(obj[key]);
        }
    });
};

var BasicModel = exports.BasicModel = function () {
    function BasicModel(type) {
        var url = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
        var __model__ = arguments[2];
        var $http = arguments[3];
        var $q = arguments[4];
        var Storage = arguments[5];

        _classCallCheck(this, BasicModel);

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

    _createClass(BasicModel, [{
        key: 'init',
        value: function init() {
            var items = this.Storage.get(this.type);
            if (items && items.length) {
                this.queue(items).list;
            }
        }
    }, {
        key: 'queue',
        value: function queue(itens) {
            var _this2 = this,
                _list;

            itens = Array.isArray(itens) ? itens : [itens];
            itens = itens.filter(function (item) {
                var _item = _this2._map[item.Id];
                if (_item) {
                    (0, _object2.default)(_item, item);
                    return false;
                }
                _this2._map[item.Id] = new _this2._model(item);
                return true;
            }).map(function (item) {
                return _this2._map[item.Id];
            });
            (_list = this._list).push.apply(_list, _toConsumableArray(itens));
            return this;
        }
    }, {
        key: 'unqueue',
        value: function unqueue(itens) {
            var _this3 = this;

            itens = Array.isArray(itens) ? itens : [itens];
            itens.forEach(function (item) {
                var _item = _this3._map[item.Id];
                if (_item) {
                    _item._delete = true;
                }
                return item;
            });
            this._list.map(function (item, idx) {
                return item._delete === true ? idx : null;
            }).filter(function (item) {
                return item !== null;
            }).reverse().forEach(function (num) {
                return _this3._list.splice(num, 1);
            });
            return this;
        }
    }, {
        key: 'select',
        value: function select(item) {
            var _item = this._map[item.Id];
            if (_item) {
                _item._selected = true;
                if (this._selected) {
                    this.deselect(this._selected);
                }
                this._selected = _item;
            }
            return this;
        }
    }, {
        key: 'deselect',
        value: function deselect(item) {
            if (this._selected && this._selected.Id === item.Id) {
                this._selected._selected = false;
                this._selected = null;
            }
            return this;
        }
    }, {
        key: 'fetch',
        value: function fetch() {
            var _this4 = this;

            var DataAtualizacao = this.Storage.get(this.type + '.DataAtualizacao');
            return this.$http.get(_settings.URLs.services + this.url, { params: {
                    identify: true,
                    data: DataAtualizacao || "1970-01-01T00:00:00.000Z"
                } }).then(function (resp) {
                if (resp.status === 200) {
                    if (resp.data && resp.data.length) {
                        var items = _this4.queue(resp.data).list;
                        _this4.Storage.save(_this4.type, items);
                        _this4.Storage.save(_this4.type + '.DataAtualizacao', new Date().toISOString());
                    }
                    return _this4;
                }
                throw resp;
            });
        }
    }, {
        key: 'get',
        value: function get(items) {
            var _this5 = this;

            if (items === null) {
                return this.$q(function (resolve) {
                    return resolve([]);
                });
            }
            var arr = Array.isArray(items) ? items : [items];
            var promises = [];
            var locals = [];
            arr.forEach(function (item) {
                var id = item && item.Id ? item.Id : item;
                if (_this5._map[id]) {
                    locals.push(_this5._map[id]);
                } else {
                    promises.push(id);
                }
            });
            return this.$q(function (resolve, reject) {
                if (promises.length === 0) {
                    return resolve(locals.sort(_sorts.sortById));
                }
                _this5.fetch().then(function (resp) {
                    var objs = promises.map(function (id) {
                        return _this5._map[id];
                    });
                    locals.push.apply(locals, _toConsumableArray(objs));
                    return resolve(locals.sort(_sorts.sortById));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'list',
        get: function get() {
            return this._list;
        }
    }, {
        key: 'selected',
        get: function get() {
            return this._selected;
        }
    }]);

    return BasicModel;
}();

},{"../core/settings":11,"../utils/object.assign":36,"../utils/sorts":37}],22:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CenarioDiaModel = exports.CenarioDiaEntity = undefined;

var _settings = require('../core/settings');

var _BasicModel2 = require('./BasicModel');

var _object = require('../utils/object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth(),
    day = now.getDate();
month = month < 10 ? '0' + month : month;
day = day < 10 ? '0' + day : day;
var _id = parseInt('' + year + month + day + '00000001', 10);

var CenarioDiaEntity = exports.CenarioDiaEntity = function () {
    function CenarioDiaEntity(obj) {
        _classCallCheck(this, CenarioDiaEntity);

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

    _createClass(CenarioDiaEntity, [{
        key: 'finish',
        value: function finish(time) {
            this.Fim = time || new Date().toISOString();
            this.DataAtualizacao = new Date().toISOString();
            return true;
        }
    }]);

    return CenarioDiaEntity;
}();

var alreadyCreateds = {};

var CenarioDiaModel = exports.CenarioDiaModel = function (_BasicModel) {
    _inherits(CenarioDiaModel, _BasicModel);

    function CenarioDiaModel() {
        var _Object$getPrototypeO;

        _classCallCheck(this, CenarioDiaModel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CenarioDiaModel)).call.apply(_Object$getPrototypeO, [this, 'cenariosDia', _settings.URLs.endpoints.cenariosDia, CenarioDiaEntity].concat(args)));

        _this.$httpParamSerializer = args[args.length - 1];
        return _this;
    }

    _createClass(CenarioDiaModel, [{
        key: 'cancel',
        value: function cancel(cenarioDia) {
            return this.unqueue(cenarioDia);
        }
    }, {
        key: 'create',
        value: function create(item) {
            var cenarioDia = new this._model(item);
            if (this._map[cenarioDia.Id] === undefined) {
                this._map[cenarioDia.Id] = cenarioDia;
                this._list.push(cenarioDia);
            } else {
                this._map[cenarioDia.Id] = (0, _object2.default)(this._map[cenarioDia.Id], cenarioDia);
            }
            this.Storage.save(this.type, this.list);
            return cenarioDia;
        }
    }, {
        key: 'post',
        value: function post(items, time) {
            var _this2 = this;

            items = Array.isArray(items) ? items : [items];
            return items.forEach(function (item) {
                if (!item.Fim) {
                    var fim = item.finish(time || new Date().toISOString());
                    if (!fim) {
                        return;
                    }
                }
                var _item = (0, _object2.default)({}, item);
                delete _item.Id;
                return _this2.$http({
                    url: '' + _settings.URLs.services + _this2.url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: _this2.$httpParamSerializer(_item),
                    params: { identify: true }
                }).then(function (resp) {
                    _this2.unqueue(item);
                    _this2.Storage.save(_this2.type, _this2.list);
                }).catch(function (err) {
                    // let storage = this.Storage.get(this.type);
                    // storage[item.Id] = item;
                    // this.Storage.save(this.type, storage);
                });
            });
        }
    }]);

    return CenarioDiaModel;
}(_BasicModel2.BasicModel);

},{"../core/settings":11,"../utils/object.assign":36,"./BasicModel":21}],23:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CenarioModel = CenarioModel;

var _settings = require('../core/settings');

var _BasicModel = require('./BasicModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CenarioEntity = function (_BasicEntity) {
    _inherits(CenarioEntity, _BasicEntity);

    function CenarioEntity(obj) {
        _classCallCheck(this, CenarioEntity);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CenarioEntity).call(this, obj));

        _this.Nome = obj.Nome.split(' ').map(function (str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        }).join(' ');
        _this.selected = null;
        return _this;
    }

    _createClass(CenarioEntity, [{
        key: 'select',
        value: function select(item) {
            this.selected = item;
        }
    }]);

    return CenarioEntity;
}(_BasicModel.BasicEntity);

function CenarioModel() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(_BasicModel.BasicModel, [null].concat(['cenario', _settings.URLs.endpoints.cenarios, CenarioEntity], args)))();
}

},{"../core/settings":11,"./BasicModel":21}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CenarioValorModel = CenarioValorModel;

var _settings = require('../core/settings');

var _BasicModel = require('./BasicModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CenarioValorEntity = function (_BasicEntity) {
    _inherits(CenarioValorEntity, _BasicEntity);

    function CenarioValorEntity(obj) {
        _classCallCheck(this, CenarioValorEntity);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CenarioValorEntity).call(this, obj));

        _this.Nome = obj.Nome.split(' ').map(function (str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        }).join(' ');
        return _this;
    }

    return CenarioValorEntity;
}(_BasicModel.BasicEntity);

function CenarioValorModel() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(_BasicModel.BasicModel, [null].concat(['cenariovalor', _settings.URLs.endpoints.cenariosValor, CenarioValorEntity], args)))();
}

},{"../core/settings":11,"./BasicModel":21}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmpresaModel = EmpresaModel;

var _settings = require('../core/settings');

var _BasicModel = require('./BasicModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmpresaEntity = function (_BasicEntity) {
    _inherits(EmpresaEntity, _BasicEntity);

    function EmpresaEntity(obj) {
        _classCallCheck(this, EmpresaEntity);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EmpresaEntity).call(this, obj));

        _this.RazaoSocial = obj.RazaoSocial.split(' ').map(function (str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        }).join(' ');
        return _this;
    }

    return EmpresaEntity;
}(_BasicModel.BasicEntity);

function EmpresaModel() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(_BasicModel.BasicModel, [null].concat(['empresas', _settings.URLs.endpoints.empresas, EmpresaEntity], args)))();
}

},{"../core/settings":11,"./BasicModel":21}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FuncaoModel = FuncaoModel;

var _settings = require('../core/settings');

var _BasicModel = require('./BasicModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FuncaoEntity = function (_BasicEntity) {
    _inherits(FuncaoEntity, _BasicEntity);

    function FuncaoEntity(obj) {
        _classCallCheck(this, FuncaoEntity);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FuncaoEntity).call(this, obj));
    }

    return FuncaoEntity;
}(_BasicModel.BasicEntity);

function FuncaoModel() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(_BasicModel.BasicModel, [null].concat(['funcoes', _settings.URLs.endpoints.funcoes, FuncaoEntity], args)))();
}

},{"../core/settings":11,"./BasicModel":21}],27:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LevantamentoModel = exports.LevantamentoEntity = undefined;

var _settings = require('../core/settings');

var _BasicModel2 = require('./BasicModel');

var _object = require('../utils/object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth(),
    day = now.getDate();
month = month < 10 ? '0' + month : month;
day = day < 10 ? '0' + day : day;
var _id = parseInt('' + year + month + day + '00000001', 10);

var LevantamentoEntity = exports.LevantamentoEntity = function () {
    function LevantamentoEntity(obj) {
        _classCallCheck(this, LevantamentoEntity);

        this.Id = _id++;
        this.UserId = obj.UserId;
        this.TarefaId = obj.TarefaId;
        this.AtividadeId = obj.AtividadeId;
        this.AtividadeTarefaId = obj.AtividadeTarefaId;
        this.ObraId = obj.ObraId;
        this.EmpresaId = obj.EmpresaId;
        this.FuncaoId = obj.FuncaoId;
        this.QuantidadeColaboradores = obj.QuantidadeColaboradores || 1;
        this.Colaboradores = obj.Colaboradores || '';
        this.ExperienciaFuncao = obj.ExperienciaFuncao || 0;
        this.Comentario = obj.Comentario || '';
        this.Inicio = new Date().toISOString();
        this.Fim = '';
        this.DataCriacao = new Date().toISOString();
        this.DataAtualizacao = new Date().toISOString();
    }

    _createClass(LevantamentoEntity, [{
        key: 'setConfig',
        value: function setConfig(obj) {
            this.UserId = obj.Usuario.Id;
            this.TarefaId = obj.Tarefa.Id;
            this.AtividadeId = obj.Atividade.Id;
            this.AtividadeTarefaId = obj.AtividadeTarefa.Id;
            this.ObraId = obj.Obra.Id;
            this.EmpresaId = obj.Empresa.Id;
            this.DataAtualizacao = new Date().toISOString();
        }
    }, {
        key: 'setTrabalhador',
        value: function setTrabalhador(obj) {
            this.FuncaoId = obj.Funcao.Id;
            this.QuantidadeColaboradores = obj.QuantidadeColaboradores || 1;
            this.Colaboradores = obj.Colaboradores || '';
            this.ExperienciaFuncao = obj.ExperienciaFuncao || 0;
            this.DataAtualizacao = new Date().toISOString();
        }
    }, {
        key: 'finish',
        value: function finish(atividade, time) {
            var min = parseInt(atividade.DuracaoMinima, 10) > 30 ? atividade.DuracaoMinima : 30;
            var max = parseInt(atividade.DuracaoMaxima, 10) ? atividade.DuracaoMaxima : 24 * 60 * 60 * 1000;
            this.Fim = time || new Date().toISOString();
            this.DataAtualizacao = new Date().toISOString();
            var diff = new Date() - new Date(this.Inicio);
            return diff > min && diff < max;
        }
    }]);

    return LevantamentoEntity;
}();

var LevantamentoModel = exports.LevantamentoModel = function (_BasicModel) {
    _inherits(LevantamentoModel, _BasicModel);

    function LevantamentoModel() {
        var _Object$getPrototypeO;

        _classCallCheck(this, LevantamentoModel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(LevantamentoModel)).call.apply(_Object$getPrototypeO, [this, 'levantamentos', _settings.URLs.endpoints.levantamentos, LevantamentoEntity].concat(args)));

        _this.$httpParamSerializer = args[args.length - 1];
        return _this;
    }

    _createClass(LevantamentoModel, [{
        key: 'cancel',
        value: function cancel(levantamento) {
            return this.unqueue(levantamento);
        }
    }, {
        key: 'create',
        value: function create(item) {
            var levantamento = new this._model(item);
            if (this._map[levantamento.Id] === undefined) {
                this._map[levantamento.Id] = levantamento;
                this._list.push(levantamento);
            } else {
                this._map[levantamento.Id] = (0, _object2.default)(this._map[levantamento.Id], levantamento);
            }
            this.Storage.save(this.type, this.list);
            return levantamento;
        }
    }, {
        key: 'post',
        value: function post(items, time) {
            var _this2 = this;

            items = Array.isArray(items) ? items : [items];
            return items.forEach(function (item) {
                if (!item.Fim) {
                    var fim = item.finish({
                        DuracaoMinima: 30,
                        DuracaoMaxima: Infinity
                    }, time || new Date().toISOString());
                    if (!fim) {
                        return;
                    }
                }
                var _item = (0, _object2.default)({}, item);
                delete _item.Id;
                return _this2.$http({
                    url: '' + _settings.URLs.services + _this2.url,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: _this2.$httpParamSerializer(_item),
                    params: { identify: true }
                }).then(function (resp) {
                    _this2.unqueue(item);
                    _this2.Storage.save(_this2.type, _this2.list);
                }).catch(function (err) {
                    // let storage = this.Storage.get(this.type);
                    // storage[item.Id] = item;
                    // this.Storage.save(this.type, storage);
                });
            });
        }
    }]);

    return LevantamentoModel;
}(_BasicModel2.BasicModel);

},{"../core/settings":11,"../utils/object.assign":36,"./BasicModel":21}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ObraModel = ObraModel;

var _settings = require('../core/settings');

var _TreeModel = require('./TreeModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObraEntity = function (_TreeEntity) {
    _inherits(ObraEntity, _TreeEntity);

    function ObraEntity(obj) {
        _classCallCheck(this, ObraEntity);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ObraEntity).call(this, obj));
    }

    return ObraEntity;
}(_TreeModel.TreeEntity);

function ObraModel() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(_TreeModel.TreeModel, [null].concat(['obras', _settings.URLs.endpoints.obras, 'ObraId', ObraEntity], args)))();
}

},{"../core/settings":11,"./TreeModel":30}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TarefaEntity = undefined;
exports.TarefaModel = TarefaModel;

var _settings = require('../core/settings');

var _BasicModel = require('./BasicModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TarefaEntity = exports.TarefaEntity = function (_BasicEntity) {
    _inherits(TarefaEntity, _BasicEntity);

    function TarefaEntity(obj) {
        _classCallCheck(this, TarefaEntity);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TarefaEntity).call(this, obj));
    }

    return TarefaEntity;
}(_BasicModel.BasicEntity);

function TarefaModel() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(_BasicModel.BasicModel, [null].concat(['tarefas', _settings.URLs.endpoints.tarefas, TarefaEntity], args)))();
}

},{"../core/settings":11,"./BasicModel":21}],30:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeModel = exports.TreeEntity = undefined;

var _settings = require('../core/settings');

var _object = require('../utils/object.assign');

var _object2 = _interopRequireDefault(_object);

var _sorts = require('../utils/sorts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TreeEntity = exports.TreeEntity = function () {
    function TreeEntity(obj) {
        var _this = this;

        _classCallCheck(this, TreeEntity);

        Object.keys(obj).forEach(function (key) {
            _this[key] = obj[key];
        });
        this._children = [];
    }

    _createClass(TreeEntity, [{
        key: 'registerChild',
        value: function registerChild(id) {
            if (this._children.indexOf(id) === -1) {
                this._children.push(id);
            }
            return this;
        }
    }, {
        key: 'children',
        get: function get() {
            return this._children;
        }
    }]);

    return TreeEntity;
}();

var TreeModel = exports.TreeModel = function () {
    function TreeModel(type) {
        var url = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
        var parentProp = arguments[2];
        var _model_ = arguments[3];
        var $http = arguments[4];
        var $q = arguments[5];
        var Storage = arguments[6];

        _classCallCheck(this, TreeModel);

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

    _createClass(TreeModel, [{
        key: 'init',
        value: function init() {
            var items = this.Storage.get(this.type);
            if (items && items.length) {
                this.queue(items).list;
            }
        }
    }, {
        key: 'queue',
        value: function queue(items) {
            var _this2 = this,
                _list,
                _roots;

            items = Array.isArray(items) ? items : [items];
            var news = [];
            var roots = [];
            items.forEach(function (item) {
                var isNew = false;
                var _item = _this2._map[item.Id];
                if (_item) {
                    _this2._map[item.Id] = (0, _object2.default)(_item, item);
                } else {
                    _this2._map[item.Id] = new _this2._model(item);
                    isNew = true;
                    news.push(_this2._map[item.Id]);
                }
                var parentId = item[_this2.parentProp];
                var parent = _this2._map[parentId];
                if (isNew && parentId === null) {
                    roots.push(_this2._map[item.Id]);
                }
                if (parentId && !parent) {
                    _this2._map[parentId] = new _this2._model({ Id: parentId });
                    roots.push(_this2._map[parentId]);
                }
                if (parentId) {
                    _this2._map[parentId].registerChild(item.Id);
                }
            });
            (_list = this._list).push.apply(_list, _toConsumableArray(items));
            (_roots = this._roots).push.apply(_roots, roots);
            return this;
        }
    }, {
        key: 'fetch',
        value: function fetch() {
            var _this3 = this;

            var DataAtualizacao = this.Storage.get(this.type + '.DataAtualizacao');
            return this.$http.get(_settings.URLs.services + this.url, { params: {
                    identify: true,
                    data: DataAtualizacao || "1970-01-01T00:00:00.000Z"
                } }).then(function (resp) {
                if (resp.status === 200) {
                    if (resp.data && resp.data.length) {
                        var items = _this3.queue(resp.data).list;
                        _this3.Storage.save(_this3.type, items);
                        _this3.Storage.save(_this3.type + '.DataAtualizacao', new Date().toISOString());
                    }
                    return _this3;
                }
                throw resp;
            });
        }
    }, {
        key: 'getLevel',
        value: function getLevel(items) {
            var _this4 = this;

            var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            return items.filter(function (item) {
                return item[_this4.parentProp] === parent;
            });
        }
    }, {
        key: 'get',
        value: function get(items) {
            var _this5 = this;

            if (items === null) {
                return this.$q(function (resolve) {
                    return resolve([]);
                });
            }
            var arr = Array.isArray(items) ? items : [items];
            var promises = [];
            var locals = [];
            arr.forEach(function (item) {
                var id = item && item.Id ? item.Id : item;
                if (_this5._map[id]) {
                    locals.push(_this5._map[id]);
                } else {
                    promises.push(id);
                }
            });
            if (promises.length === 0) {
                return this.$q(function (resolve, reject) {
                    resolve(locals.sort(_sorts.sortById));
                });
            }
            return this.$q(function (resolve, reject) {
                _this5.fetch().then(function (resp) {
                    var objs = promises.map(function (id) {
                        return _this5._map[id];
                    });
                    locals.push.apply(locals, _toConsumableArray(objs));
                    return resolve(locals.sort(_sorts.sortById));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }, {
        key: 'list',
        get: function get() {
            return this._list;
        }
    }, {
        key: 'roots',
        get: function get() {
            return this._roots;
        }
    }]);

    return TreeModel;
}();

},{"../core/settings":11,"../utils/object.assign":36,"../utils/sorts":37}],31:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultUser = undefined;

var _settings = require('../core/settings');

var _object = require('../utils/object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _password = {};
var defaultUser = exports.defaultUser = {
    Token: "",
    UserId: "",
    UserName: "",
    Empresas: [],
    Obras: [],
    Tarefas: [],
    Expiracao: "2015-01-01T00:00:00.0000000Z",
    Password: ""
};

var UserModel = function () {
    function UserModel($window, $q, $http) {
        _classCallCheck(this, UserModel);

        this.$http = $http;
        this.$q = $q;
        this.encrypt = function encrypt(str) {
            return $window.Crypto.SHA256(str).toString();
        };
        this.user = null;
    }

    _createClass(UserModel, [{
        key: 'setUser',
        value: function setUser(userObj, password) {
            this.user = (0, _object2.default)({}, defaultUser, userObj);
            this.user.Password = this.encrypt(password);
            _password[this.user.UserId] = password;
            return this.user;
        }
    }, {
        key: 'getToken',
        value: function getToken() {
            return this.user ? this.user.Token : '';
        }
    }, {
        key: 'checkOnline',
        value: function checkOnline(username, password) {
            var _this = this;

            return this.$http.get(_settings.URLs.services + _settings.URLs.endpoints.token, {
                params: {
                    UserName: username,
                    Password: password
                }
            }).then(function (resp) {
                if (resp.status !== 200) {
                    var data = resp && resp.data ? resp.data.Message + ' > ' + resp.data.MessageDetail : 'No connection';
                    throw new Error(data);
                }
                return _this.setUser(resp.data, password);
            });
        }
    }, {
        key: 'checkCredentials',
        value: function checkCredentials(users, username, password) {
            var _this2 = this;

            return this.$q(function (resolve, reject) {
                var pwd = _this2.encrypt(password);
                var user = users.filter(function (user) {
                    return user.UserName === username && user.Password === pwd;
                });
                if (user.length) {
                    resolve(_this2.setUser(user[0], password));
                } else {
                    reject(new Error('Invalid arguments'));
                }
            });
        }
    }]);

    return UserModel;
}();

exports.default = UserModel;

},{"../core/settings":11,"../utils/object.assign":36}],32:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AtividadeModel = require('../models/AtividadeModel');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecursosController = function () {
    function RecursosController($q, $state, Session, AtividadeModel, LevantamentoModel, CenarioDiaModel) {
        var _this = this;

        _classCallCheck(this, RecursosController);

        this.Session = Session;
        this.$state = $state;
        this.$q = $q;
        this.atividades = [_AtividadeModel.Aguardando];
        this.LevantamentoModel = LevantamentoModel;
        this.levantamentos = LevantamentoModel.list;
        this.CenarioDiaModel = CenarioDiaModel;
        AtividadeModel.get(this.Session.tarefa.Atividades).then(function (resp) {
            var _atividades;

            var parents = resp.map(function (item) {
                return item.AtividadePaiId;
            }).filter(function (id, idx, arr) {
                return arr.indexOf(id) === idx;
            });
            (_atividades = _this.atividades).push.apply(_atividades, _toConsumableArray(resp.filter(function (item) {
                return parents.indexOf(item.Id) < 0;
            })));
        });
        this.equipe = Session.equipe;
    }

    _createClass(RecursosController, [{
        key: 'mudarAtividade',
        value: function mudarAtividade(membros) {
            membros.forEach(function (membro) {
                return membro.select();
            });
            this.$state.go('atividades');
        }
    }, {
        key: 'send',
        value: function send() {
            var time = new Date().toISOString();
            var levantamentos = this.LevantamentoModel.post(this.LevantamentoModel.list, time);
            var cenarios = this.CenarioDiaModel.post(this.CenarioDiaModel.list, time);
            var obj = { levantamentos: levantamentos, cenarios: cenarios };
            return obj;
        }
    }, {
        key: 'endSession',
        value: function endSession($event) {
            var _this2 = this;

            var promises = this.send();
            this.$q.all(promises).then(function (resp) {
                _this2.Session.end();
                return _this2.$state.go('login');
            });
        }
    }]);

    return RecursosController;
}();

exports.default = RecursosController;

},{"../models/AtividadeModel":19}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "<ion-view title=\"Recursos\">\n    <ion-nav-buttons side=\"right\">\n        <button class=\"icon button button-balanced ion-android-send\" \n            ng-click=\"RecursosCtrl.endSession($event)\"></button>\n    </ion-nav-buttons>\n    \n    <div class=\"tabs tabs-striped tabs-top tabs-balanced\">\n        <a ui-sref=\"cenarios\" ui-sref-active=\"active\" class=\"tab-item\">\n            Cenários\n        </a>\n        <a ui-sref=\"recursos\" ui-sref-active=\"active\" class=\"tab-item\">\n            Recursos\n        </a>\n        <a ui-sref=\"producao\" ui-sref-active=\"active\" class=\"tab-item\">\n            Produção\n        </a>\n    </div>\n\n    <ion-content overflow-scroll=\"true\" padding=\"'true'\" class=\"has-header has-tabs-top\">\n        \n        <ion-list>\n            <ion-item class=\"item-thumbnail-left\" \n                ng-if=\"atividade.Membros.length\" \n                ng-repeat=\"atividade in RecursosCtrl.atividades\">\n                <div class=\"item item-divider\" ng-click=\"RecursosCtrl.mudarAtividade(atividade.Membros)\">\n                    {{::atividade.Nome}}\n                </div>\n                <img>\n                <ion-list type=\"list-inset\" ng-repeat=\"membro in atividade.Membros\">\n                    <div ng-click=\"RecursosCtrl.mudarAtividade([membro])\">\n                        <h2>{{::membro.Nome}}</h2>\n                        <small>{{::membro.Funcao.Nome}}</small>\n                    </div>\n                    <i class=\"icon ion-android-textsms\"></ion>\n                </div>\n            </ion-item>\n        </ion-list>\n    </ion-content>\n    \n    <!--\n    <ion-footer-bar class=\"row\" ng-show=\"RecursosCtrl.levantamentos\">\n        <div class=\"col\"></div>\n        <div class=\"col\">\n            <button  class=\"button button-balanced button-outline button-block\">Confirmar</a>\n        </div>\n    </ion-footer-bar>\n    -->\n</ion-view>";

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "<ion-side-menus enable-menu-with-back-views=\"false\">\n    <ion-side-menu-content>\n        <ion-nav-bar class=\"bar-balanced\">\n            <ion-nav-back-button></ion-nav-back-button>\n            <ion-nav-buttons side=\"left\">\n                <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"\"></button>\n            </ion-nav-buttons>\n        </ion-nav-bar>\n        <ion-nav-view name=\"side-menu\"></ion-nav-view>\n    </ion-side-menu-content>\n    <ion-side-menu side=\"left\">\n        <ion-header-bar class=\"bar-stable\">\n            <div class=\"title\">Menu</div>\n        </ion-header-bar>\n        <ion-content padding=\"false\" class=\"side-menu-left has-header\" ion-content=\"\">\n            <ion-list>\n                <ion-item ui-sref=\"configuration\" menu-close=\"\">Configuração</ion-item>\n                <ion-item>Item 2</ion-item>\n                <ion-item>Item 3</ion-item>\n            </ion-list>\n            <div class=\"spacer\" style=\"width: 268px; height: 291px;\"></div>\n            <ion-list>\n                <ion-item ui-sref=\"login\" menu-close=\"\">Logout</ion-item>\n            </ion-list>\n        </ion-content>\n    </ion-side-menu>\n</ion-side-menus>";

},{}],35:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /// <reference path="../../typings/lz-string/lz-string.d.ts" />

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _settings = require('../core/settings');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _keys = {};

var Storage = function () {
    function Storage($window) {
        _classCallCheck(this, Storage);

        this.LZString = $window.LZString;
        this.local = $window.localStorage;
        this.prefix = 'fatores.' + _settings.app.version;
        this._cache = {};
    }

    _createClass(Storage, [{
        key: 'compact',
        value: function compact(value) {
            return this.LZString.compressToUTF16(JSON.stringify(value));
        }
    }, {
        key: 'descompact',
        value: function descompact(value) {
            return JSON.parse(this.LZString.decompressFromUTF16(value));
        }
    }, {
        key: 'save',
        value: function save(type, values) {
            this._cache[type] = values;
            this.local.setItem(this.prefix + '.' + type, this.compact(values));
        }
    }, {
        key: 'get',
        value: function get(type) {
            if (!this._cache[type] || this._cache[type].length <= 0) {
                var data = this.local.getItem(this.prefix + '.' + type);
                data = data ? this.descompact(data) : null;
                if (data) {
                    this._cache[type] = data;
                }
            }
            return this._cache[type] || null;
        }
    }]);

    return Storage;
}();

exports.default = Storage;

},{"../core/settings":11}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var assign = Object.assign || function (target) {
    'use strict';

    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
    }
    var to = Object(target);
    for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
            continue;
        }
        nextSource = Object(nextSource);
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
                to[nextKey] = nextSource[nextKey];
            }
        }
    }
    return to;
};
exports.default = assign;

},{}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sortById = sortById;
exports.sortByProp = sortByProp;
function sortById(a, b) {
    return a.Id - b.Id;
}
function sortByProp(prop) {
    return function sortByPropBinded(a, b) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    };
}

},{}]},{},[1])


//# sourceMappingURL=all.js.map
