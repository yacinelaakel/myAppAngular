import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser }  from '@angular/common';
import { HttpClient }  	      from '@angular/common/http';
import { environment } 	      from '../../environments/environment';
import { Observable, Subject, pipe } from 'rxjs';
import { map } 			      from 'rxjs/operators';

@Injectable({
  	providedIn: 'root'
})
export class AuthService {

	apiUrl: string = environment.apiUrl;
	redirectUrl: string; //We store the url where user tried to go
	user: UserInterface = isPlatformBrowser(this.platform) ? JSON.parse(localStorage.getItem('user')) : null;
	userSubject = new Subject<UserInterface>();

 	constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platform: any) {}

 	setUser(user: UserInterface): void {
 		if(isPlatformBrowser(this.platform)) {
			localStorage.setItem('user', JSON.stringify(user));
			this.user = user;
			this.emitUserSubject();
		}	
 	}

 	emitUserSubject(): void {
 		this.userSubject.next(this.user);
 	}

 	login(loginForm): Observable<void> {
 		return this.http.post(`${this.apiUrl}/account/login`, loginForm).pipe(
 			map((user: UserInterface) => {
 				this.setUser(user);
 			})
 		);
 	}

 	register(registerForm): Observable<void> {
 		return this.http.post(`${this.apiUrl}/account/register`, registerForm).pipe(
 			map((user: UserInterface) => {
 				this.setUser(user);
 			})
 		);
 	}

 	authFacebook(user_fb): Observable<void> {
 		return this.http.post(`${this.apiUrl}/account/facebook`, user_fb).pipe(
 			map((user: UserInterface) => {
 				this.setUser(user);
 			})
 		);
 	}

  	editUser(editUserForm): Observable<void> {
 		return this.http.put(`${this.apiUrl}/account/user`, editUserForm).pipe(
 			map((user: UserInterface) => {
 				this.setUser(user);
 			})
 		);
 	}

 	logout() {
 		if(isPlatformBrowser(this.platform)) {
	 		localStorage.removeItem('user');
	 		this.user = null;
	 		this.emitUserSubject();
	 	}
 	}

 	forgottenPassword(forgottenForm): Observable<string> {
 		return this.http.post(`${this.apiUrl}/account/forgotten-password`, forgottenForm, {responseType: 'text'});
 	}

 	resetPassword(resetForm): Observable<string> {
 		return this.http.post(`${this.apiUrl}/account/reset-password`, resetForm, {responseType: 'text'});
 	}

}

export interface UserInterface {
	_id: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string
}