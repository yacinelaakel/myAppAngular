import { Component } from '@angular/core';

@Component({
    templateUrl: './transfer-state.component.html',
    styleUrls: ['./transfer-state.component.css']
})
export class TransferStateComponent {

    hits: string;
    shake: boolean;

    performRequest(): void {
    	this.shake = true;
        setTimeout(() => this.shake = false, 500);
    }
}
