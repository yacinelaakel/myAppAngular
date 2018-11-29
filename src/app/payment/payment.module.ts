import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MyMaterialModule } from '../material.module';

import { PaymentRouting } from './payment-routing.module';

import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
  	declarations: [
  		SubscriptionComponent
  	],
  	imports: [
    	CommonModule,
    	MyMaterialModule,
    	ReactiveFormsModule,
    	PaymentRouting
  	]	
})
export class PaymentModule { }
