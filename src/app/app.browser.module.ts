import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule }     from '@angular/common/http';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { ServiceWorkerModule }              from '@angular/service-worker';

import { TranslateHttpLoader } 			    from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppModule }    from './app.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        BrowserModule.withServerTransition({
            appId: 'app-root'
        }),
        BrowserAnimationsModule,
        HttpClientModule,
        AppModule,
        BrowserTransferStateModule,
        ServiceWorkerModule.register('/ngsw-worker.js'),
        TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]}
        }),
    ],
    bootstrap: [AppComponent]
})
export class AppBrowserModule {}
