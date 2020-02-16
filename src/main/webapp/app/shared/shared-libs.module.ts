import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
// added for clarity
import { ClarityModule } from '@clr/angular';

@NgModule({
    imports: [
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            i18nEnabled: true,
            defaultI18nLang: 'en'
        }),
        InfiniteScrollModule,
        CookieModule.forRoot(),
        // added for clarity
        ClarityModule,
],
    exports: [
        FormsModule,
        CommonModule,
        NgJhipsterModule,
        InfiniteScrollModule,
        // added for clarity
        ClarityModule
]
})
export class GatewaySharedLibsModule {}
