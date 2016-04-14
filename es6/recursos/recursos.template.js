export default `<ion-view title="Recursos">
    <ion-nav-buttons side="right" hide-back-button="true">
        <button class="icon button button-balanced ion-android-send" 
            ng-click="RecursosCtrl.endSession($event)"></button>
    </ion-nav-buttons>
    
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
            <ion-item ng-if="atividade.Membros.length" ng-repeat="atividade in RecursosCtrl.atividades">
                <div class="item item-divider" ng-click="RecursosCtrl.mudarAtividade(atividade.Membros)">
                    {{::atividade.Nome}}
                </div>
                <img>
                <ion-list type="list-inset" class="item item-icon-right" 
                    ng-repeat="membro in atividade.Membros">
                    <div ng-click="RecursosCtrl.mudarAtividade([membro])">
                        <h2>{{::membro.Nome}}</h2>
                        <small>{{::membro.Funcao.Nome}}</small>
                    </div>
                    <span ng-click="RecursosCtrl.go(membro)" class="icon ion-android-textsms"></a>
                </ion-list>
            </ion-item>
        </ion-list>
    </ion-content>
    
    <!--
    <ion-footer-bar class="row" ng-show="RecursosCtrl.levantamentos">
        <div class="col"></div>
        <div class="col">
            <button  class="button button-balanced button-outline button-block">Confirmar</a>
        </div>
    </ion-footer-bar>
    -->
</ion-view>`;
