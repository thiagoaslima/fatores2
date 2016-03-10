export default `
<ion-view title="Login">
    <ion-content overflow-scroll="true" padding="'true'" class="has-header">

        <div>
            <i class="icon ion-image"></i>
        </div>

        <form class="list">
            <ion-list>
                <label class="item item-input">
                    <span class="input-label">Nome de usuário</span>
                    <input ng-model="LoginCtrl.UserName" type="text" placeholder="">
                </label>
                <label class="item item-input">
                    <span class="input-label">Senha</span>
                    <input ng-model="LoginCtrl.Password" type="password" placeholder="">
                </label>
            </ion-list>
            <div class="spacer" style="height: 40px;"></div>
            <button type="submit" class="button button-balanced button-block"
            ng-click="LoginCtrl.login($event, LoginCtrl.UserName, LoginCtrl.Password)">Entrar</button>
        </form>
		
    </ion-content>
</ion-view>
`;
