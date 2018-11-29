import { NgModule } from '@angular/core';
import { 
	MatMenuModule, 
	MatSnackBarModule, 
	MatButtonModule,
	MatInputModule,
	MatFormFieldModule,
	MatSnackBar
} from '@angular/material';


@NgModule({
	imports: [
		MatMenuModule,
		MatSnackBarModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule
	],
	exports: [
		MatMenuModule,
		MatSnackBarModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule
	]
})
export class MyMaterialModule {}