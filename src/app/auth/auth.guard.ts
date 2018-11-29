import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { 
	Router,
	CanActivate, 
	ActivatedRouteSnapshot, 
	RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private authService: AuthService, 
		private router: Router,
		@Inject(PLATFORM_ID) private platform: any
	) {}

  	canActivate(
    	next: ActivatedRouteSnapshot,
    	state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    	let url = state.url;
    	return this.checkLogin(url);
  	}

  	private checkLogin(url) {
  		if(this.authService.user) {
  			return true;
  		}
  		else {
  			this.authService.redirectUrl = url;
  			this.router.navigate(['/login']);
  			return false;
  		}
  	}
}
