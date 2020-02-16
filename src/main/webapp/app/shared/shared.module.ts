import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
    GatewaySharedLibsModule,
    GatewaySharedCommonModule,
    HasAnyAuthorityDirective
} from './';

@NgModule({
    imports: [
        GatewaySharedLibsModule,
        GatewaySharedCommonModule
    ],
    declarations: [
        HasAnyAuthorityDirective
    ],
    providers: [
    ],
    entryComponents: [],
    exports: [
        GatewaySharedCommonModule,
        HasAnyAuthorityDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class GatewaySharedModule {}
