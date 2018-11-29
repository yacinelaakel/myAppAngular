import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MyMaterialModule } from '../material.module';

import { AuthRouting } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  	declarations: [
  		LoginComponent,
  		RegisterComponent,
  		ResetPasswordComponent,
  		ProfileComponent,
  		LogoutComponent
  	],
  	imports: [
    	CommonModule,
    	MyMaterialModule,
    	ReactiveFormsModule,
    	AuthRouting,
  	]
})
export class AuthModule { }
