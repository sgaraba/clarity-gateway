import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { GatewaySharedModule } from 'app/shared';
import { GatewayCoreModule } from 'app/core';
import { GatewayAppRoutingModule} from './app-routing.module';
import { GatewayHomeModule } from './home/home.module';
import { GatewayAccountModule } from './account/account.module';
import { GatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileService,
    ActiveMenuDirective,
    ErrorComponent,
    PopupComponent,
    PopupService,
    PopupDirective
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        GatewayAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        GatewaySharedModule,
        GatewayCoreModule,
        GatewayHomeModule,
        GatewayAccountModule,
        GatewayEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        SidebarComponent,
        ActiveMenuDirective,
        ErrorComponent,
        PopupComponent,
        PopupDirective
],
    providers: [
        ProfileService,
        PopupService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class GatewayAppModule {}
