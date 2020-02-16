import { Routes } from '@angular/router';

import {
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    settingsRoute,
    // added for clarity
    loginRoute
} from './';

const ACCOUNT_ROUTES = [
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    settingsRoute,
    // added for clarity
    loginRoute
];

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
