import { Component, OnInit }  from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  	selector: 'home-view',
  	templateUrl: './home.component.html',
  	styles: ['pre {background: lightgray; color: black}']
})
export class HomeComponent implements OnInit {

	constructor(private http: HttpClient) {}

	ngOnInit() {
	}

}
