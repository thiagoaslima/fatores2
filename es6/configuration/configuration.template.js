export default `<ion-view title="Configuração">
    <ion-nav-buttons side="right">
        <button class="icon button button-balanced ion-checkmark" 
            ng-show="ConfigCtrl.selected.tarefa"
            ng-click="ConfigCtrl.save($event)"></button>
    </ion-nav-buttons>

    <ion-content overflow-scroll="true" padding="'true'" class="has-header"> 
     
        <div class="list card">
            <basic-list 
                model="ConfigCtrl.selected.empresa"
                items="ConfigCtrl.selectables.empresas"
                title="Empresa"
                prop="RazaoSocial" />
        </div>
        
        <div class="list card">
            <tree-list 
                service="ConfigCtrl.ObraModel"
                model="ConfigCtrl.selected.obra"
                items-ids="ConfigCtrl.selected.empresa.Obras"
                title="Obras"
                prop="Nome" />
        </div>

        <div class="list card">
            <basic-list 
                service="ConfigCtrl.EmpresaModel"
                model="ConfigCtrl.selected.contratada"
                items-ids="ConfigCtrl.selected.obra.Contratadas"
                title="Contratada"
                prop="RazaoSocial" />
        </div>
                
       <div class="list card">
            <basic-list 
                service="ConfigCtrl.TarefaModel"
                model="ConfigCtrl.selected.tarefa"
                items-ids="ConfigCtrl.selected.contratada.Tarefas"
                title="Tarefa"
                prop="Nome" />
        </div>

    </ion-content>

    <!--
    <ion-footer-bar ng-show="ConfigCtrl.selected.tarefa">
        <div class="col">
        <a ui-sref="login" class="button button-stable button-outline button-block">Cancelar</a>
        </div>
        <div class="col">
        <a ui-sref="equipe" ng-click="ConfigCtrl.save($event)" class="button button-balanced button-outline button-block">Confirmar</a>
        </div>
    </ion-footer-bar>
    -->
</ion-view>`;
