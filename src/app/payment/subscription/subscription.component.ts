import { Component, OnInit, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';

//StripeCheckout object from CDN
declare var StripeCheckout: any;

import { AuthService, UserInterface } from '../../auth/auth.service';
import { PaymentService, SubscriptionInterface } from '../payment.service';

@Component({
  	selector: 'app-subscription',
  	templateUrl: './subscription.component.html',
  	styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

	sub_info: SubscriptionInterface | null;
	user: UserInterface;
	handler: any;
	amount: number;
	success: string;
	error: string;

  	constructor(
  		private authService: AuthService,
  		private paymentService: PaymentService,
  		public snackBar: MatSnackBar
  	) {}

  	ngOnInit() {
  		this.user = this.authService.getUser();
  		// Subscription of the user OR null if no subscription
  		this.paymentService.getSubscribe().subscribe(
  			(sub_info: SubscriptionInterface | null) => {
  				this.sub_info = sub_info;
  			},
  			(err) => {
  				this.error = err.error;
  			}
  		);
  	}

  	onSubscribe(amount) {
	    this.handler = StripeCheckout.configure({
	      	key: environment.stripeKey,
	      	// image: '/your/awesome/logo.jpg',
	      	currency: 'eur',
	      	locale: 'auto',
	      	token: token => {
	      		this.paymentService.processSubscribe(token, this.amount).subscribe(
	      			(sub_info: SubscriptionInterface) => {
			    		this.snackBar.open('Abonnement effectué !', 'OK', {
      						duration: 5000
    					});
    					this.sub_info = sub_info;
	      			},
	      			(err) => {
	      				this.error = err.error;
	      			}
	      		);
	      	}
	    });
  		this.amount = amount;
	    this.handler.open({
	      	name: 'MyAppAngular',
	      	excerpt: 'Dépôt de fonds sur un compte',
	      	amount: amount,
	      	email: this.user.email
	    });
  	}

  	OnUnsubscribe() {
  		this.paymentService.processUnsubscribe().subscribe(
  			(cancel_at_period_end: boolean) => {
	    		this.snackBar.open('Renouvellement automatique désactivé !', 'OK', {
					duration: 5000
				});  		
				this.sub_info.cancel_at_period_end = cancel_at_period_end;		
  			},
  			(err) => {
  				this.error = err.error;
  			}
  		);
  	}

  	OnResubscribe() {
  		this.paymentService.processResubscribe().subscribe(
  			(cancel_at_period_end: boolean) => {
	    		this.snackBar.open('Renouvellement automatique activé !', 'OK', {
					duration: 5000
				});  		
				this.sub_info.cancel_at_period_end = cancel_at_period_end;		
  			},
  			(err) => {
  				this.error = err.error;
  			}
  		);
  	}

  	@HostListener('window:popstate')
    onPopstate() {
      	this.handler.close();
    }
}
