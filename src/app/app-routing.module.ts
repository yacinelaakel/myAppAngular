import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules }  from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent, data: {description: 'Homepage - quick overview.'}},
	// { path: 'external', loadChildren: '@angular-universal-serverless/external-module/release#ExternalModule', data: {title: 'External module', description: 'External module example.'}}, not works because of https://github.com/angular/angular-cli/issues/8284
	{ 
		path: '', 
		loadChildren: './auth/auth.module#AuthModule', 
		data: {title: 'Authentification', description: 'Authentification utilisateur'}
	},
	{	
		path: '',
		loadChildren: './payment/payment.module#PaymentModule',
		data: {title: 'Paiement', description: 'Abonnements et paiements en ligne'}
	},
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		// Preload all module with lazy loading (loadChildren). Does not preload if canLoad
		RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
