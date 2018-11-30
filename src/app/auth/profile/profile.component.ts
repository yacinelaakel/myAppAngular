import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService, UserInterface } from '../auth.service';

@Component({
  	selector: 'app-profile',
  	templateUrl: './profile.component.html',
  	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	user: UserInterface;
	editMode: boolean = false;
	editUserForm: FormGroup;
	success: string;
	error: string;

  	constructor(private fb: FormBuilder, private authService: AuthService) { }

  	ngOnInit() {
	   	this.authService.tokenSubject.subscribe(
	   		() => {
	   			this.user = this.authService.getUser();
		 		this.editUserForm = this.fb.group({
					firstname: [this.user.firstname, Validators.required],
					lastname: [this.user.lastname, Validators.required],
					email: [this.user.email, Validators.required]
				});
	   		}
	   	);
	   	this.authService.emitTokenSubject();
  	}

  	toggleEditMode() {
  		this.editMode = !this.editMode;
  	}

  	onSubmitUser() {
  		this.authService.editUser(this.editUserForm.value).subscribe(
  			() => {
  				this.success = 'Utilisateur bien mis à jour';
  				this.toggleEditMode();
  			},
  			(err) => {
  				this.error = err.error;
  			}
  		);
  	}

}
