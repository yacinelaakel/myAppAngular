import { Component, OnInit }  	   from '@angular/core';
import { Router } 			 	   from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  	selector: 'app-register',
  	templateUrl: './register.component.html',
  	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	registerForm = this.fb.group({
		firstname: ['', Validators.required],
		lastname: ['', Validators.required],
		email: ['', Validators.required],
		password: ['', Validators.required]
	});
	error: string;

  	constructor(
  		private fb: FormBuilder, 
  		private authService: AuthService,
  		private router: Router
  	) {}

  	ngOnInit() {}

  	onSubmit() {
  		return this.authService.register(this.registerForm.value).subscribe(
  			() => {
  				this.router.navigate(['/']);
  			},
  			(err) => {
  				this.error = err.error;
  			}
  		);
  	}
}
