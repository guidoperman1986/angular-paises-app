import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PaisModule } from './pais/pais.module';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HeaderComponent } from "./shared/header/header.component";
@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        PaisModule,
        SharedModule,
        AppRoutingModule, HeaderComponent], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
