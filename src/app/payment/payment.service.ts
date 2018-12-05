import { Injectable } 		  		 from '@angular/core';
import { HttpClient }  	      		 from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { map } 			      		 from 'rxjs/operators';
import { environment } 	      		 from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PaymentService {

	apiUrl: string = environment.apiUrl;

	constructor(private http: HttpClient) {}

	// Return subscription data of the user or null if he never subscribed or has expired sub
	getSubscribe(): Observable<SubscriptionInterface> | null {
		return this.http.get(`${this.apiUrl}/subscription/subscribe`).pipe(
			map((sub_info: SubscriptionInterface | null) => sub_info)
		);
	}

	// Subscribe a user
	processSubscribe(token: object, amount: number): Observable<SubscriptionInterface> {
		const data = { token, amount };
		return this.http.post(`${this.apiUrl}/subscription/subscribe`, data).pipe(
			map((sub_info: SubscriptionInterface) => sub_info)
		);
	}

	// Cancel automatic billing
	processUnsubscribe(): Observable<boolean> {
		return this.http.get(`${this.apiUrl}/subscription/unsubscribe`).pipe(
			map((cancel_at_period_end: boolean) => cancel_at_period_end) //true
		); 
	}

	// Reactivate automatic billing
	processResubscribe(): Observable<boolean> {
		return this.http.get(`${this.apiUrl}/subscription/resubscribe`).pipe(
			map((cancel_at_period_end: boolean) => cancel_at_period_end) //false
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