import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser }  			   from '@angular/common';
import { HttpClient }  					   from '@angular/common/http';
import { SwPush }      					   from '@angular/service-worker';
import { Observable } 					   from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class Notifications {

	apiUrl: string = environment.apiUrl;
	vapidPublic: string = environment.vapidPublic;
	
  	constructor(
  		@Inject(PLATFORM_ID) private platform: any,
  		private http: HttpClient, 
    	private swPush: SwPush
  	) {}

  	requestSubscription() {
  		if(isPlatformBrowser(this.platform)) {
  			if(!localStorage.getItem('push-subscription')) {
	 	  		this.swPush.requestSubscription({
		  			serverPublicKey: this.vapidPublic
		  		})
		        .then(subscription => {
		          	this.subscribeToPush(subscription).subscribe(
		          		() => localStorage.setItem('push-subscription', JSON.stringify(subscription))
		          	);
		        })
		        .catch(console.error);   				
  			}
  		}
  	}

   	subscribeToPush(subscription: PushSubscription): Observable<object> {
    	return this.http.post(`${this.apiUrl}/notification/subscribe`, subscription);
  	}
}
