import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules }  from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { TransferStateComponent } from './transfer-state/transfer-state.component';
import { Notifications } from './services/notifications.service';
import { WithTransferStateComponent } from './transfer-state/with-transfer-state.component';
import { WithoutTransferStateComponent } from './transfer-state/without-transfer-state.component';
import { HitWithTransferStateResolver } from './services/resolvers/hitWithTransferState.resolver';
import { HitWithoutTransferStateResolver } from './services/resolvers/hitWithoutTransferState.resolver';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent, data: {description: 'Homepage - quick overview.'}},
	// { path: 'external', loadChildren: '@angular-universal-serverless/external-module/release#ExternalModule', data: {title: 'External module', description: 'External module example.'}}, not works because of https://github.com/angular/angular-cli/issues/8284
	{ path: 'transferState', data: {title: 'Transfer state (API)', description: 'Angular TransferState example.'}, children: [
		{ path: '', component: TransferStateComponent, },
		{ path: 'with', component: WithTransferStateComponent, resolve: {hits: HitWithTransferStateResolver}},
		{ path: 'without', component: WithoutTransferStateComponent, resolve: {hits: HitWithoutTransferStateResolver}}
	]},
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
export class AppRoutingModule { }
