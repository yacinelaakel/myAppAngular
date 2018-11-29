import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  	template: '',
})
export class LogoutComponent implements OnInit {

  	constructor(
  		private authService: AuthService,
  		private router: Router
  	) {}

   	ngOnInit(): void {
   		this.router.navigate(['/']);
   		this.authService.logout();
   	}

}