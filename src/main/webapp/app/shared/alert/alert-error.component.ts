import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-alert-error',
    template: `
        <div class="alert" *ngFor="let alert of alerts"
             [ngClass]="{'alert-danger':alert.type=='danger', 'alert-info':alert.type=='info', 'alert-success':alert.type=='success', 'alert-warning':alert.type=='warning'}">
            <div class="alert-items">
                <div class="alert-item static">
                    <div class="alert-icon-wrapper">
                        <clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>
                    </div>
                    <span class="alert-text" [innerHTML]="alert.msg" *ngIf="alert && alert.type && alert.msg"></span>
                </div>
            </div>
            <button type="button" class="close" aria-label="Close" (click)="this.alerts = [];">
                <clr-icon aria-hidden="true" shape="close"></clr-icon>
            </button>
        </div>`
})
export class JhiAlertErrorComponent implements OnDestroy {

    alerts: any[];
    cleanHttpErrorListener: Subscription;

    /* tslint:disable */
    constructor(private alertService: JhiAlertService, private eventManager: JhiEventManager, private translateService: TranslateService) {
        /* tslint:enable */
        this.alerts = [];

        this.cleanHttpErrorListener = eventManager.subscribe('gatewayApp.httpError',
            response => {
                let i;
                const httpErrorResponse = response.content;
                switch (httpErrorResponse.status) {
                    // connection refused, server not reachable
                    case 0:
                        this.addErrorAlert('Server not reachable', 'error.server.not.reachable');
                        break;

                    case 400:
                        const arr = httpErrorResponse.headers.keys();
                        let errorHeader = null;
                        let entityKey = null;
                        arr.forEach(entry => {
                            if (entry.endsWith('app-error')) {
                                errorHeader = httpErrorResponse.headers.get(entry);
                            } else if (entry.endsWith('app-params')) {
                                entityKey = httpErrorResponse.headers.get(entry);
                            }
                        });
                        if (errorHeader) {
                            const entityName = translateService.instant('global.menu.entities.' + entityKey);
                            this.addErrorAlert(errorHeader, errorHeader, { entityName });
                        } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.fieldErrors) {
                            const fieldErrors = httpErrorResponse.error.fieldErrors;
                            for (i = 0; i < fieldErrors.length; i++) {
                                const fieldError = fieldErrors[i];
                                // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                                const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                                const fieldName = translateService.instant('gatewayApp.' +
                                    fieldError.objectName + '.' + convertedField);
                                this.addErrorAlert(
                                    'Error on field "' + fieldName + '"', 'error.' + fieldError.message, { fieldName });
                            }
                        } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
                            this.addErrorAlert(httpErrorResponse.error.message, httpErrorResponse.error.message, httpErrorResponse.error.params);
                        } else {
                            this.addErrorAlert(httpErrorResponse.error);
                        }
                        break;

                    case 404:
                        this.addErrorAlert('Not found', 'error.url.not.found');
                        break;

                    default:
                        if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
                            this.addErrorAlert(httpErrorResponse.error.message);
                        } else {
                            this.addErrorAlert(httpErrorResponse.error);
                        }
                }
            }
        );
    }

    ngOnDestroy() {
        if (this.cleanHttpErrorListener !== undefined && this.cleanHttpErrorListener !== null) {
            this.eventManager.destroy(this.cleanHttpErrorListener);
            this.alerts = [];
        }
    }

    addErrorAlert(message, key?, data?) {
        key = (key && key !== null) ? key : message;
            this.alerts.push(
                this.alertService.addAlert(
                    {
                        type: 'danger',
                        msg: key,
                        params: data,
                        timeout: 5000,
                        toast: this.alertService.isToast(),
                        scoped: true
                    },
                    this.alerts
                )
            );
    }
}
