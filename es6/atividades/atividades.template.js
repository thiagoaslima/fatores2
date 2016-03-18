export default `<ion-view title="Atividades">
    <ion-nav-buttons side="right">
        <a ui-sref="recursos" class="icon button button-balanced ion-checkmark" 
            ng-click="AtividadesCtrl.setLevantamento($event)"
            ng-show="AtividadesCtrl.atividadeSelected"></a>
    </ion-nav-buttons>

    <ion-content overflow-scroll="true" padding="'true'" class="has-header">
        
       <div class="list card">
            <ion-list>
                <ion-item ng-repeat="atividade in AtividadesCtrl.atividades">
                    <div class="item item-divider">
                    {{::atividade.Nome}}
                    {{::atividade.AtividadesFilhas}}
                    </div>
                </ion-item>
            </ion-list>    
       
            <tree-list 
                service="AtividadesCtrl.AtividadeModel"
                filter="AtividadesCtrl.Session.tarefa.Atividades"
                model="AtividadesCtrl.atividadeSelected"
                items="AtividadesCtrl.atividades"
                title="Atividades"
                prop="Nome"
                children-prop="AtividadesFilhas" />
       
        </div>
        
        <ion-list>
        <ion-item class="item item-divider">Equipe</ion-item>
            <ion-item class="item" ng-repeat="membro in AtividadesCtrl.equipe">
                <ion-checkbox ng-model="membro._selected">{{::membro.Nome}}</ion-checkbox>
            </ion-item>
        <ion-list>
    </ion-content>
    
    <!--
    <ion-footer-bar >
        <div class="row">
            <div class="col">
                <a ui-sref="recursos" 
                        class="button button-stable button-block">Cancelar</a>
            </div>
            <div class="col">
                <a ui-sref="recursos" 
                    class="button button-stable button-block"
                    ng-click="AtividadesCtrl.setLevantamento($event)">Confirmar</a>
            </div>
        </div>
    </ion-footer-bar>
    -->
</ion-view>`;
