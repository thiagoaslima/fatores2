export default `<ion-side-menus enable-menu-with-back-views="false">
    <ion-side-menu-content>
        <ion-nav-bar class="bar-balanced">
            <ion-nav-back-button></ion-nav-back-button>
            <ion-nav-buttons side="left">
                <button class="button button-icon button-clear ion-navicon" menu-toggle=""></button>
            </ion-nav-buttons>
        </ion-nav-bar>
        <ion-nav-view name="side-menu"></ion-nav-view>
    </ion-side-menu-content>
    <ion-side-menu side="left">
        <ion-header-bar class="bar-stable">
            <div class="title">Menu</div>
        </ion-header-bar>
        <ion-content padding="false" class="side-menu-left has-header" ion-content="">
            
            <ion-list>
                <ion-item ui-sref="equipe" menu-close="">Equipe</ion-item>
                <!--
                <ion-item>Item 2</ion-item>
                <ion-item>Item 3</ion-item>
                -->
            </ion-list>
            
            <div class="spacer" style="width: 268px; height: 291px;"></div>
            <ion-list>
                <ion-item ui-sref="login" menu-close="">Logout</ion-item>
            </ion-list>
        </ion-content>
    </ion-side-menu>
</ion-side-menus>`;