import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';

import {
    Register,
    ActivateService,
    PasswordService,
    PasswordResetInitService,
    PasswordResetFinishService,
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState,
    // added for clarity
    LoginComponent,
} from './';

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(accountState)
    ],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent,
        // added for clarity
        LoginComponent,
    ],
    providers: [
        Register,
        ActivateService,
        PasswordService,
        PasswordResetInitService,
        PasswordResetFinishService,
        // added for clarity
        LoginComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAccountModule {}
