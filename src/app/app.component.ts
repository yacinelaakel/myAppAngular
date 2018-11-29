import { Component, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } 		 from '@angular/common';
import { Meta, Title }				 from '@angular/platform-browser';
import { SwUpdate }					 from '@angular/service-worker';
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
import { filter } 			from 'rxjs/operators';

import { SnackBar, SnackBarNotification } from './services/snack-bar.service';
import { WindowRef } 					  from './window-ref.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
  	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    title: string = this.titleService.getTitle();
  	metaDescription: string = this.metaService.getTag('name=description').content;

  	constructor(
    	private snackBarService: SnackBar,
    	private windowRef: WindowRef,
    	private swUpdate: SwUpdate,
    	private translate: TranslateService,
    	private titleService: Title,
    	private metaService: Meta,
    	private router: Router
  	) {
    	this.translate.setDefaultLang(this.translate.getBrowserLang());
  	}

  	ngOnInit(): void {	
  		this.router.events.subscribe((event: Event) => this.navigationInterceptor(event));
    	// Check for update
  		this.swUpdate.available.subscribe((evt) => {
    		this.snackBarService.displayNotification({
      			message: 'Une nouvelle version de l\'app est disponible',
      			action: 'Lancer',
      			force: true,
      			callback: () => {
        			this.windowRef.nativeWindow.location.reload(true);
      			}
    		} as SnackBarNotification);
  		});

      	this.swUpdate.checkForUpdate().then(() => {
        	// noop
      	}).catch((err) => {
        	console.error('error when checking for update', err);
      	});
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
