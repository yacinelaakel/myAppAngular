import { Component, OnInit }	   from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } 				   from '@angular/router';

import { Observable, pipe } from 'rxjs';
import { concatMap } 		from 'rxjs/operators';

import { 
	AuthService as SocialAuthService,
	SocialUser,
	FacebookLoginProvider
} from 'angularx-social-login';

import { AuthService } from '../auth.service';

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm = this.fb.group({
		email: ['', Validators.compose([Validators.email, Validators.required])],
		password: ['', Validators.required]
	});
	error: string;

  	constructor(
  		private fb: FormBuilder, 
  		private authService: AuthService,
  		private socialAuthService: SocialAuthService,
  		private router: Router
  	) { }

  	ngOnInit() {
  	}

  	onSubmit(): void {
  		this.authService.login(this.loginForm.value).subscribe(
  			() => {
  				let redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : '';
  				this.router.navigate([redirectUrl]);
  			},
  			(err) => {
  				this.error = err.error;
  			}
  		);	
  	}

  	onSignInFB(): void {
  		// Facebook popup signin
    	this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    	// We use user object we receive from facebook to authenticate to our app
		const authFacebook: Observable<void> = this.socialAuthService.authState.pipe(
			// concatMap returns an observable instead of a value
			// we return the observable to authenticate to our app
			concatMap(
				(user_fb) => this.authService.authFacebook(user_fb)
			)
		);
		// we subscribe to the answer of our app
		authFacebook.subscribe(	
			() => {
  				let redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : '';
  				this.router.navigate([redirectUrl]);    				
			},
			(err) => {
				this.error = err.error;
			}
		)
  	}
}	
