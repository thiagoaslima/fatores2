export default `<ion-view title="Produção">
    <ion-nav-buttons side="right">
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
            <ion-item ng-click="ProducaoCtrl.go()" class="item-icon-left">
                <i class="icon ion-plus-circled"></i>
                Novo produto
            </ion-item>
            
            <ion-item class="item-divider">
            Produtos
            </ion-item>
            
            <ion-item class="item-thumbnail-left" 
                ng-click="ProducaoCtrl.go(produto)"
                ng-repeat="produto in ProducaoCtrl.produtos">
                <div class="item item-divider">
                    {{::produto.Identificadores}}
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
