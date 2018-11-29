import { Injectable } 		  from '@angular/core';
import { HttpClient }  	      from '@angular/common/http';
import { environment } 	      from '../../environments/environment';
import { Observable, Subject, pipe } from 'rxjs';
import { map } 			      from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PaymentService {

	apiUrl: string = environment.apiUrl;

	constructor(private http: HttpClient) {}

	// Return subscription data of the user or null if he never subscribed or has expired sub
	getSubscription(user_id: string): Observable<SubscriptionInterface> | null {
		return this.http.get(`${this.apiUrl}/subscription/subscribe/` + user_id).pipe(
			map((sub_info: SubscriptionInterface) => {
				if(sub_info) {
					return sub_info;
				}
				else {
					return null;
				}
			})
		);
	}

	// Subscribe a user
	processSubscription(token: object, amount: number, user_id: string): Observable<SubscriptionInterface> {
		const data = { token, amount, user_id };
		return this.http.post(`${this.apiUrl}/subscription/subscribe`, data).pipe(
			map((sub_info: SubscriptionInterface) => {
				if(sub_info) {
					return sub_info;
				}
			})
		);
	}

	// Cancel automatic billing
	processUnsubscription(user_id: string): Observable<boolean> {
		return this.http.get(`${this.apiUrl}/subscription/unsubscribe/` + user_id).pipe(
			map((cancel_at_period_end: boolean) => {
				return cancel_at_period_end; //true
			})
		);
	}

	// Reactivate automatic billing
	processResubscription(user_id: string): Observable<boolean> {
		return this.http.get(`${this.apiUrl}/subscription/resubscribe/` + user_id).pipe(
			map((cancel_at_period_end: boolean) => {
				return cancel_at_period_end; //false
			})
		);
	}
}

// Data structure we receive from Stripe API Subscription AND Subscription database
export interface SubscriptionInterface {
	current_period_end: string,
	plan_name: string,
	cancel_at_period_end: boolean,
	offers: number
}