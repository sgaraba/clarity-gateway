import { NgModule } from '@angular/core';

import {
    GatewaySharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiStringFilterComponent,
    JhiNumberFilterComponent,
    JhiDateFilterComponent,
    JhiTimeFilterComponent,
    JhiDateTimeFilterComponent,
    JhiBooleanFilterComponent,
    JhiEnumFilterComponent
} from './';
/* jhipster-needle-add-entity-filter-import - JHipster will add entity filter here */

const SELECT_FILTER_COMPONENT = [
    /* jhipster-needle-add-entity-filter - JHipster will add entity filter here */
];

@NgModule({
    imports: [
        GatewaySharedLibsModule,
    ],
    declarations: [
        ...SELECT_FILTER_COMPONENT,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        JhiStringFilterComponent,
        JhiNumberFilterComponent,
        JhiDateFilterComponent,
        JhiTimeFilterComponent,
        JhiDateTimeFilterComponent,
        JhiBooleanFilterComponent,
        JhiEnumFilterComponent
    ],
    providers: [],
    exports: [
        ...SELECT_FILTER_COMPONENT,
        GatewaySharedLibsModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
        JhiStringFilterComponent,
        JhiNumberFilterComponent,
        JhiDateFilterComponent,
        JhiTimeFilterComponent,
        JhiDateTimeFilterComponent,
        JhiBooleanFilterComponent,
        JhiEnumFilterComponent
    ]
})
export class GatewaySharedCommonModule {}
