import { NgModule } 		    from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { SubscriptionComponent } from './subscription/subscription.component';

const paymentRoutes: Routes = [
	{ path: 'subscription', canActivate: [AuthGuard], component: SubscriptionComponent },
];

@NgModule({
	imports: [
		RouterModule.forChild(paymentRoutes)
	],
	exports: [
		RouterModule
	]
})
export class PaymentRouting {}