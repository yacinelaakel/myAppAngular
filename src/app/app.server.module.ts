import { NgModule } 						from '@angular/core';
import { ServerModule } 					from '@angular/platform-server';
import { BrowserModule }                    from '@angular/platform-browser';
import { NoopAnimationsModule }             from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ModuleMapLoaderModule }            from '@nguniversal/module-map-ngfactory-loader';

import { AppModule }               from './app.module';
import { AppComponent }            from './app.component';
import * as fs                     from 'file-system';
import { ServiceWorkerModuleMock } from './services/service-worker.mock.module';
import { Observable, Observer }    from 'rxjs';

export function universalLoader(): TranslateLoader {
    return {
        getTranslation: (lang: string) => {
            return Observable.create((observer: Observer<any>) => {
                observer.next(JSON.parse(fs.readFileSync(`./dist/assets/i18n/${lang}.json`, 'utf8')));
                observer.complete();
            });
        }
    } as TranslateLoader;
}

@NgModule({
    imports: [
        BrowserModule.withServerTransition({
            appId: 'app-root'
        }),
        AppModule,
        ServerModule,
        ServiceWorkerModuleMock,
        NoopAnimationsModule,
        ModuleMapLoaderModule,
        TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useFactory: universalLoader}
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
