import login from '../login/login.template';
import sidebar from '../sidebar/sidebar.template';
import configuration from '../configuration/configuration.template';
import equipe from '../equipe/equipe.template';
import recursos from '../recursos/recursos.template';
import atividades from '../atividades/atividades.template';
import cenarios from '../cenarios/cenarios.template';

export default function router($stateProvider, $urlRouterProvider) {
    const orig = $stateProvider.state;

    $stateProvider.state = function(name, obj) {
        if (obj.restrict === undefined) {
            obj.restrict = true;
        }
        return orig(name, obj);
    }

    const fetch = function(model, attempt = 0) {
        return model.fetch().finally(resp => {
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
    $stateProvider


        .state('menu', {
            url: '/app',
            abstract: true,
            template: sidebar
        })



        .state('login', {
            url: '/login',
            template: login,
            controller: 'LoginController',
            controllerAs: 'LoginCtrl',
            restrict: false
        })


        .state('configuration', {
            parent: "menu",
            url: '/configuration',
            views: {
                'side-menu': {
                    template: configuration,
                    controller: 'ConfigurationController',
                    controllerAs: 'ConfigCtrl',
                    resolve: {
                        empresas: ['EmpresaModel', function(model) {
                            return fetch(model);
                        }],

                        obras: ['ObraModel', function(model) {
                            return fetch(model);
                        }],

                        tarefas: ['TarefaModel', function(model) {
                            return fetch(model);
                        }],

                        funcoes: ['FuncaoModel', function(model) {
                            return fetch(model);
                        }],

                        atividades: ['AtividadeModel', function(model) {
                            return fetch(model);
                        }],

                        atividadesTarefa: ['AtividadeTarefaModel', function(model) {
                            return fetch(model);
                        }],

                        cenarios: ['CenarioModel', function(model) {
                            return fetch(model);
                        }],

                        cenariosValor: ['CenarioValorModel', function(model) {
                            return fetch(model);
                        }]
                    }
                }
            }
        })



        .state('equipe', {
            parent: "menu",
            url: '/equipe',
            views: {
                'side-menu': {
                    template: equipe,
                    controller: 'EquipeController',
                    controllerAs: 'EquipeCtrl'
                }
            }
        })





        .state('recursos', {
            parent: "menu",
            url: '/recursos',
            views: {
                'side-menu': {
                    template: recursos,
                    controller: 'RecursosController',
                    controllerAs: 'RecursosCtrl'
                }
            }
        })



        .state('atividades', {
            parent: "menu",
            url: '/atividades',
            views: {
                'side-menu': {
                    template: atividades,
                    controller: 'AtividadesController',
                    controllerAs: 'AtividadesCtrl'
                }
            }
        })



        .state('cenarios', {
            parent: "menu",
            url: '/cenarios',
            views: {
                'side-menu': {
                    template: cenarios,
                    controller: 'CenariosController',
                    controllerAs: 'CenariosCtrl'
                }
            }
        })


        ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

}