import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { pipe, fromEvent }   from 'rxjs';
import { throttleTime } 	 from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Component({
  	selector: 'menu',
  	templateUrl: 'menu.component.html',
  	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

	user: object | null;
  
   	menuElements: MenuElement[] = [
    	{link: '', icon: 'home', text: 'Home'},
    	{link: 'transferState', icon: 'call_merge', text: 'TransferState (API calls)'},
  	];

   	menuElementsAnon: MenuElement[] = [
    	{link: 'login', icon: 'call_merge', text: 'Connexion'},
    	{link: 'register', icon: 'call_merge', text: 'Inscription'},
  	];

  	menuElementsUser: MenuElement[] = [
    	{link: 'profile', icon: 'call_merge', text: 'Mon compte'},
    	{link: 'subscription', icon: 'call_merge', text: 'Mon abonnement'},
    	{link: 'logout', icon: 'call_merge', text: 'Déconnexion'},
  	];

  	mobile: boolean; 

  	constructor(
  		@Inject(PLATFORM_ID) private platform: any,
  		private authService: AuthService
  	) {}

   	ngOnInit(): void {
   		if (isPlatformBrowser(this.platform)) {
			window.innerWidth < 768 ? this.mobile = true : this.mobile = false;
	   		fromEvent(window, 'resize').pipe(throttleTime(1000)).subscribe(() => {
	   				window.innerWidth < 768 ? this.mobile = true : this.mobile = false;
	   			}
	   		);
	   	}
	   	else {
	   		this.mobile = true;
	   	}
	   	this.authService.tokenSubject.subscribe(
	   		() => {
	   			this.user = this.authService.getUser();
	   		}
	   	);
	   	this.authService.emitTokenSubject();
   	}

}

interface MenuElement {
  	link: string;
  	icon: string;
  	text: string;
}
