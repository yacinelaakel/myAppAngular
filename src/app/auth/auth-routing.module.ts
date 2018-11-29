import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';

const authRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'forgotten-password', component: ResetPasswordComponent }, //ResetPasswordComponent 
	{ path: 'reset-password/:token/:user_id', component: ResetPasswordComponent }, //ResetPasswordComponent
	{ path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
	{ path: 'logout', component: LogoutComponent },
];

@NgModule({
	imports: [
		RouterModule.forChild(authRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AuthRouting {}