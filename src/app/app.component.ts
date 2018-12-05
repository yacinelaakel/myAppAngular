import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } 				      from '@angular/common';
import { Meta, Title }		 				      from '@angular/platform-browser';
import { SwUpdate }								  from '@angular/service-worker';
import { 
		ActivatedRouteSnapshot,
        Event,
        NavigationStart,
        NavigationEnd,
		NavigationCancel,
        NavigationError,
        Router 
} from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { Notifications }    from './services/notifications.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
  	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    title: string = this.titleService.getTitle();
  	metaDescription: string = this.metaService.getTag('name=description').content;

  	constructor(
  		@Inject(PLATFORM_ID) private platform: any,
    	private swUpdate: SwUpdate,
    	private notifService: Notifications,
    	private translateService: TranslateService,
    	private titleService: Title,
    	private metaService: Meta,
    	private router: Router
  	) {
    	this.translateService.setDefaultLang(this.translateService.getBrowserLang());
  	}

  	ngOnInit(): void {	
  		// Intercept route changing
  		this.router.events.subscribe((event: Event) => this.navigationInterceptor(event));
    	// Check for app update
  		this.swUpdate.available.subscribe(
  			() => {
	  			if(isPlatformBrowser(this.platform)) {
	    			window.location.reload(true);
	  			}
  			}
  		);
  		// Ask user if he wants to receive server push notification
 		this.notifService.requestSubscription();
	}

	private navigationInterceptor(event: Event) {
		if(event instanceof NavigationStart) {
		}
		if(event instanceof NavigationEnd) {
	  		// Subscription listening to data 'title' from route
      		const snapshot: ActivatedRouteSnapshot = this.router.routerState.snapshot.root.firstChild;

      		const title: string = snapshot.data['title'] ? snapshot.data['title'] + ' - ' : '';
      		this.titleService.setTitle(title + this.title);

      		const description: string = snapshot.data['description'];
      		this.metaService.updateTag({ name: 'description', content: this.metaDescription + ' ' + description}, 'name=description');
		}	
		if(event instanceof NavigationCancel) {
		}
		if(event instanceof NavigationError) {
		}
	}
}
