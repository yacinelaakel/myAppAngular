import { Component, OnInit } 	   from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  	selector: 'app-reset-password',
  	templateUrl: './reset-password.component.html',
  	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

	forgottenForm = this.fb.group({
		email: ['', Validators.required]
	});

	resetForm = this.fb.group({
		password: ['', Validators.required],
		confirmPassword: ['', Validators.required]
	});

	token: string | null;
	user_id: string | null;
	success: string;
	error: string;

  	constructor(
  		private fb: FormBuilder, 
  		private authService: AuthService,
  		private route: ActivatedRoute
  	) { }

  	ngOnInit() {
  		this.token = this.route.snapshot.paramMap.get('token');
  		this.user_id = this.route.snapshot.paramMap.get('user_id');
  	}

  	onSubmitForgotten() {
  		this.authService.forgottenPassword(this.forgottenForm.value).subscribe(
  			(success) => {
  				this.success = success;
  			},
  			(err) => {
  				this.error = err.error;
  			}
  		);
  	}

  	onSubmitReset() {
  		this.resetForm.value.token = this.token;
  		this.resetForm.value.user_id = this.user_id;
  		this.authService.resetPassword(this.resetForm.value).subscribe(
  			(success) => {
  				this.success = success;
  			},
  			(err) => {
  				this.error = err.error;
  			}
  		);
  	}

}
