export default `
<ion-view title="Equipe">
    <ion-nav-buttons side="right" hide-back-button="true">
        <a ui-sref="recursos" class="icon button button-balanced ion-checkmark" ng-show="EquipeCtrl.equipe.length"></a>
    </ion-nav-buttons>

    <ion-content overflow-scroll="true" padding="'true'" class="has-header">
        <div class="">
            <div class="">
                <ul class="list">
                    <li class="item" ng-repeat="funcao in EquipeCtrl.funcoes" ng-click="EquipeCtrl.openForm(funcao)">
                        <h3><i class="icon ion-plus"></i> {{::funcao.Nome}}</h3>
                        <span>{{funcao._qty}} {{funcao._qty !== 1 ? 'Membros' : 'Membro'}}</span>
                    </li>
                </ul>
            </div>

            <div class="">
                <form class="list" ng-show="EquipeCtrl.showForm">
                    <label class="item item-input item-stacked-label" name="nomeMembro">
                        <span class="input-label">Nome</span>
                        <input type="text" placeholder="" ng-model="EquipeCtrl.membro.Nome">
                    </label>
                    <label class="item item-input item-stacked-label" name="experiencia">
                        <span class="input-label">Experiência</span>
                        <input type="number" placeholder="" ng-model="EquipeCtrl.membro.Experiencia">
                    </label>
                    <label class="item item-select item-stacked-label" name="unExperiencia">
                        <span class="input-label">Unidade exp.</span>
                        <select>
                            <option>anos</option>
                            <option>meses</option>
                        </select>
                    </label>
                    <div class="button-bar">
                        <button class="button button-assertive button-block" ng-click="EquipeCtrl.closeForm()">Cancelar</button>
                        <button class="button button-balanced button-block" ng-click="EquipeCtrl.addMembro()">Confirmar</button>
                    </div>
                </form>

                <ion-list>
                    <ion-item class="item-icon-right" ng-repeat="membro in EquipeCtrl.equipe">
                        <h2>{{::membro.Nome}}</h2>
                        <small>{{::membro.Funcao.Nome}}</small>
                        <i class="icon ion-trash-b" ng-click="EquipeCtrl.removeMembro(membro)"></i>
                    </ion-item>
                </ion-list>
            </div>
        </div>
    </ion-content>

    <!--
    <ion-footer-bar>
        <div class="col">
        <a ui-sref="configuration" class="button button-stable button-outline button-block">Cancelar</a>
        </div>
        <div class="col">
        <a ui-sref="recursos" class="button button-balanced button-outline button-block">Confirmar</a>
        </div>
    </ion-footer-bar>
    -->
</ion-view>`;