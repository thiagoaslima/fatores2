/* globals angular: true */

import router from './core/routes';

// models
import UserModel from './models/UserModel';
import { EmpresaModel } from './models/EmpresaModel';
import { ObraModel } from './models/ObraModel';
import { TarefaModel } from './models/TarefaModel';
import { FuncaoModel } from './models/FuncaoModel';
import { AtividadeModel } from './models/AtividadeModel';
import AtividadeTarefaModel from './models/AtividadeTarefaModel';
import { LevantamentoModel } from './models/LevantamentoModel';
import { CenarioModel } from './models/CenarioModel';
import { CenarioValorModel } from './models/CenarioValorModel';
import { CenarioDiaModel } from './models/CenarioDiaModel';
import { ProducaoModel } from './models/ProducaoModel';
import Session from './core/Session';

// controllers
import LoginController from './login/loginController';
import ConfigurationController from './configuration/ConfigurationController';
import EquipeController from './equipe/EquipeController';
import RecursosController from './recursos/RecursosController';
import AtividadesController from './atividades/AtividadesController';
import CenariosController from './cenarios/CenariosController';
import ProducaoController from './producao/ProducaoController';
import ProdutoController from './producao/ProdutoController';

// directives
import { BasicListDirective } from './directives/selectors/basiclist';
import { TreeListDirective } from './directives/selectors/treelist';

// utils
import Storage from './storage/storage';
import httpInterceptor from './login/login.interceptors';
import loadingStatus from './core/loading.interceptor';

angular
	.module('app', [
		'ionic',
        'ngCordova',
		'angulartics',
		'angulartics.google.analytics.cordova'
	])
	
	.directive('basicList', BasicListDirective)
    .directive('treeList', TreeListDirective)
	
	.service('UserModel', ['$window', '$q', '$http', 'Storage', UserModel])
	.controller('LoginController', ['$state', 'UserModel', 'Storage', 'Session', LoginController])
	
	.service('Session', Session)
	.service('Storage', ['$window', Storage])
	
	.service('EmpresaModel', ['$http', '$q', 'Storage', EmpresaModel])
    .service('ObraModel', ['$http', '$q', 'Storage', ObraModel])
    .service('TarefaModel', ['$http', '$q', 'Storage', TarefaModel])
    .service('FuncaoModel', ['$http', '$q', 'Storage', FuncaoModel])
    .service('AtividadeModel', ['$http', '$q', 'Storage', AtividadeModel])
    .service('AtividadeTarefaModel', ['$http', '$q', 'Storage', AtividadeTarefaModel])
    .service('CenarioModel', ['$http', '$q', 'Storage', CenarioModel])
    .service('CenarioValorModel', ['$http', '$q', 'Storage', CenarioValorModel])
    .service('LevantamentoModel', ['$http', '$q', 'Storage', '$httpParamSerializer', LevantamentoModel])
    .service('CenarioDiaModel', ['$http', '$q', 'Storage', '$httpParamSerializer', CenarioDiaModel])
    .service('ProducaoModel', ['$http', '$q', 'Storage', '$httpParamSerializer', ProducaoModel])
    
	.controller('ConfigurationController', [
        '$scope', 
        '$ionicHistory',
        '$state',
        'Session',
        'UserModel', 
        'EmpresaModel',
        'ObraModel',
        'TarefaModel',
        'AtividadeModel',
        'AtividadeTarefaModel',
        ConfigurationController])
	
    .controller('EquipeController', ['Session', 'FuncaoModel', EquipeController])
    .controller('RecursosController', ['$q', '$state', '$scope', '$ionicPopup', 'Session', 'AtividadeModel', 'LevantamentoModel', 'CenarioDiaModel', 'ProducaoModel', RecursosController])
    .controller('AtividadesController', ['$state', 'Session', 'AtividadeModel', 'LevantamentoModel', AtividadesController])
    .controller('CenariosController', ['$scope', '$state', 'Session', 'CenarioModel', 'CenarioValorModel', 'CenarioDiaModel', CenariosController])
    .controller('ProducaoController', ['$state', 'Session', 'ProducaoModel', ProducaoController])
    .controller('ProdutoController', ['$state', 'Session', 'ProducaoModel', 'Storage', 'produto', ProdutoController])
	
	.config(['$stateProvider', '$urlRouterProvider', router])

    .service('httpInterceptor', ['Session', httpInterceptor])
    .service('loadingStatus', ['$injector', loadingStatus])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.timeout = 2000;
        $httpProvider.interceptors.push('httpInterceptor');
        $httpProvider.interceptors.push('loadingStatus');
    }])

    .run(['$ionicPlatform', '$rootScope', function($ionicPlatform, $rootScope) {

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            let cordova = window.cordova,
                plugins = window.plugins,
                gaPlugin = plugins ? plugins.gaPlugin : null,
                statusBar = window.StatusBar;

            if (gaPlugin) {
                gaPlugin.init(() => {
                    $rootScope.gaConnected = true;
                }, () => {
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
    }])

    .run(['$rootScope', '$state', 'Session', function($rootScope, $state, Session) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                console.log('start', arguments);
                if (toState.restrict && !Session.started) {
                    event.preventDefault(),
                        $state.go('login');
                }
            });

        $rootScope.$on('$stateNotFound',
            function(event, unfoundState, fromState, fromParams) {
                console.log('not found');
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                console.log('success', arguments);
            })

        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                console.log('error', arguments);
            })

        $rootScope.$on('$viewContentLoading',
            function(event, viewConfig) {
                // Access to all the view config properties.
                // and one special property 'targetView'
                // viewConfig.targetView
                console.log('loading', arguments);
            });

        $rootScope.$on('$viewContentLoaded',
            function(event) {
                console.log('loaded', arguments);
            });
    }])

    ;

    try {
        angular.module('app')
            .config(['googleAnalyticsCordovaProvider', function(googleAnalyticsCordovaProvider) {
                console.log('analytics', googleAnalyticsCordovaProvider);
                googleAnalyticsCordovaProvider.trackingId = 'UA-71620104-1';
                googleAnalyticsCordovaProvider.period = 20; // default: 10 (in seconds)
                googleAnalyticsCordovaProvider.debug = true; // default: false
            }]);
    } catch (err) {
        console.warn(err);
    }
