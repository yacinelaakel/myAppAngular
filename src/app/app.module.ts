import { NgModule }         from '@angular/core';
import { RouterModule }     from '@angular/router';
import { CommonModule }     from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule }  from '@ngx-translate/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor }  from './http-interceptors/token-interceptor';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { getAuthServiceConfigs } 			    from './auth/social-config';

import { MyMaterialModule } 	  from './material.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { Notifications } from './services/notifications.service';

import { AppRoutingModule } 	 from './app-routing.module';
import { AppComponent } 		 from './app.component';
import { HomeComponent } 		 from './home/home.component';
import { MenuComponent } 		 from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MenuComponent,
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
    providers: [
      	Notifications, 
      	{ 
      		provide: AuthServiceConfig, 
      		useFactory: getAuthServiceConfigs 
      	},
	    {
	      provide: HTTP_INTERCEPTORS,
	      useClass: TokenInterceptor,
	      multi: true
	    }
	],
    bootstrap: [AppComponent]
})
export class AppModule { }
