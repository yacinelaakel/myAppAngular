import { NgModule }         from '@angular/core';
import { RouterModule }     from '@angular/router';
import { CommonModule }     from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule }  from '@ngx-translate/core';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { getAuthServiceConfigs } 			    from './auth/social-config';

import { MyMaterialModule } 	  from './material.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { AppComponent } 	from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } 	from './home/home.component';
import { TransferStateComponent } from './transfer-state/transfer-state.component';
import { SnackBar }  from './services/snack-bar.service';
import { WindowRef } from './window-ref.service';

import { MenuComponent } from './menu/menu.component';
import { Notifications } from './services/notifications.service';
import { WithTransferStateComponent } from './transfer-state/with-transfer-state.component';
import { WithoutTransferStateComponent } from './transfer-state/without-transfer-state.component';
import { HitWithTransferStateResolver } from './services/resolvers/hitWithTransferState.resolver';
import { HitWithoutTransferStateResolver } from './services/resolvers/hitWithoutTransferState.resolver';
import { ExampleApi } from './services/exampleApi.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TransferStateComponent,
        MenuComponent,
        WithTransferStateComponent,
        WithoutTransferStateComponent,
        PageNotFoundComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        SocialLoginModule,
        MyMaterialModule,
        LoadingBarRouterModule,
        TranslateModule.forChild(),
        AppRoutingModule,
      ],
      providers: [SnackBar, WindowRef, Notifications, HitWithTransferStateResolver, HitWithoutTransferStateResolver, ExampleApi, { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }],
      bootstrap: [AppComponent]
})
export class AppModule { }
