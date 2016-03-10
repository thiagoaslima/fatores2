export default `<ion-view title="Cenários">
    
    <div class="tabs tabs-striped tabs-top tabs-balanced">
        <a ui-sref="cenarios" ui-sref-active="active" class="tab-item">
            Cenários
        </a>
        <a ui-sref="recursos" ui-sref-active="active" class="tab-item">
            Recursos
        </a>
        <a ui-sref="producao" ui-sref-active="active" class="tab-item">
            Produção
        </a>
    </div>
        
    <ion-content overflow-scroll="true" padding="'true'" class="has-header has-tabs-top"> 
     
       <ion-list>
        <ion-item ng-style="CenariosCtrl.isModified(cenario) ? {'background-color': 'light-yellow'} : {}" ng-repeat="cenario in CenariosCtrl.cenarios">
                <h2 ng-click="CenariosCtrl.toggle(cenario.Id)" class="item item-divider">
                    {{::cenario.Nome}}
                </h2>
                <div ng-hide="CenariosCtrl.isVisible(cenario.Id)">
                    <ion-item ng-click="CenariosCtrl.toggle(cenario.Id)" ng-if="cenario.selected">{{cenario.selected.Nome}}</ion-item>
                    <ion-item ng-click="CenariosCtrl.toggle(cenario.Id)" ng-if="!cenario.selected">Selecione uma das opções</ion-item>
                </div>
                <ion-list ng-show="CenariosCtrl.isVisible(cenario.Id)">
                    <ion-checkbox ng-repeat="valor in cenario.Valores"
                        ng-value="valor"
                        ng-selected="cenario.selected === valor" 
                        ng-click="CenariosCtrl.select(cenario, valor)">
                        {{::valor.Nome}}
                    </ion-item>
                </ion-list>
        
        </ion-item>
       </ion-list>

    </ion-content>

    <ion-footer-bar ng-show="ConfigCtrl.selected.tarefa">
        <div class="col">
        <a ui-sref="login" class="button button-stable button-outline button-block">Cancelar</a>
        </div>
        <div class="col">
        <a ui-sref="equipe" ng-click="ConfigCtrl.save($event)" class="button button-balanced button-outline button-block">Confirmar</a>
        </div>
    </ion-footer-bar>
    
</ion-view>`;
