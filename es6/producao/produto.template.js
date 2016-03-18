export default `<ion-view title="Produto" cache-view="false">
    <ion-nav-buttons side="right">
        <button class="icon button button-balanced ion-checkmark" 
            ng-click="ProdutoCtrl.save()"></button>
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
        
        <div class="padding-bottom">
            <h4>Nome do produto</h4>
            <label class="item item-input">
                <input type="text" ng-model="ProdutoCtrl.produto.Identificadores">
            </label>
        </div>
        
        <ion-list class="padding-top">
            <h4>Características:</h4>
            
            <ion-item  ng-repeat="atributo in ProdutoCtrl.Session.AtributosProducao">
                <h4 ng-click="ProdutoCtrl.toggle(atributo.Id)" class="item item-divider">
                    {{::atributo.Nome}}
                </h4>
                <div ng-hide="ProdutoCtrl.isVisible(atributo.Id)">
                    <ion-item ng-click="ProdutoCtrl.toggle(atributo.Id)" ng-if="ProdutoCtrl.hasSelected(atributo)">{{ProdutoCtrl.selected(atributo)}}</ion-item>
                    <ion-item ng-click="ProdutoCtrl.toggle(atributo.Id)" ng-if="!ProdutoCtrl.hasSelected(atributo)">Selecione uma das opções</ion-item>
                </div>
                <ion-list ng-show="ProdutoCtrl.isVisible(atributo.Id)">
                    <ion-checkbox ng-repeat="valor in atributo.Valores"
                        ng-value="valor"
                        ng-selected="ProdutoCtrl.isSelected(atributo, valor)" 
                        ng-click="ProdutoCtrl.select(valor)">
                            {{::valor.Nome}}
                    </ion-item>
                </ion-list>
            </ion-item>
       </ion-list>
        
        <ion-list class="padding-top">
            <h4>Quantidades</h4>
            
            <ion-item class="item-thumbnail-left">
                <div class="padding-bottom">
                    <label class="item item-input">
                        <input type="number" ng-model="ProdutoCtrl.produto.QS1">
                        <span class="input-label">{{::ProdutoCtrl.tarefa.UnidadeMedida}}</span>
                    </label>
                </div>
            </ion-item>
            
            <ion-item class="item-thumbnail-left" ng-if="ProdutoCtrl.tarefa.UnidadeMedida2">
                <div class="padding-bottom">
                    <label class="item item-input">
                        <input type="number" ng-model="ProdutoCtrl.produto.QS2">
                        <span class="input-label">{{::ProdutoCtrl.tarefa.UnidadeMedida2}}</span>
                    </label>
                </div>
            </ion-item>
            
            <ion-item class="item-thumbnail-left" ng-if="ProdutoCtrl.tarefa.UnidadeMedida3">
                <div class="padding-bottom">
                    <label class="item item-input">
                        <input type="number" ng-model="ProdutoCtrl.produto.QS3">
                        <span class="input-label">{{::ProdutoCtrl.tarefa.UnidadeMedida3}}</span>
                    </label>
                </div>
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
