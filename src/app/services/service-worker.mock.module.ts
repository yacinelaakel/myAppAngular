import { NgModule } 		   from '@angular/core';
import { SwPush, SwUpdate }    from '@angular/service-worker';
import { Observable, Subject } from 'rxjs';
import { UpdateActivatedEvent, UpdateAvailableEvent } from '@angular/service-worker/src/low_level';

export class SwPushServerMock {
    public messages: Observable<object>;
    public subscription: Observable<PushSubscription | null>;

    public requestSubscription(options: {
        serverPublicKey: string;
    }): Promise<PushSubscription> {
        return new Promise((resolve) => resolve());
    }
    public unsubscribe(): Promise<void> {
        return new Promise((resolve) => resolve());
    }
}

export class SwUpdateServerMock {
  	public available: Observable<UpdateAvailableEvent> = new Subject();
  	public activated: Observable<UpdateActivatedEvent> = new Subject();
  	public isEnabled: boolean = false;

  	public checkForUpdate(): Promise<void> {
    	return new Promise((resolve) => resolve());
  	}

  	public activateUpdate(): Promise<void> {
    	return new Promise((resolve) => resolve());
  	}
}

@NgModule({
    providers: [
        {provide: SwUpdate, useClass: SwUpdateServerMock },
        {provide: SwPush, useClass: SwPushServerMock }
    ]
})
export class ServiceWorkerModuleMock {}
