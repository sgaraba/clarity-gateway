import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PopupDirective } from 'app/layouts/popup/popup.directive';
import { PopupService } from 'app/layouts/popup/popup.service';
import { PopupItem } from 'app/layouts/popup/popup-item.model';

@Component({
    selector: 'jhi-popup',
    template: '<ng-template jhiPopup></ng-template>'
})
export class PopupComponent implements OnInit {

    @ViewChild(PopupDirective) popup: PopupDirective;

    constructor(private popupService: PopupService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private router: Router) {
    }

    ngOnInit() {
        this.popupService.component.subscribe(popupItem => {
            if (popupItem) {
                this.loadComponent(popupItem);
            } else {
                this.ejectComponent();
            }
        });
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.ejectComponent();
            }
        });
    }

    private loadComponent(popupItem: PopupItem) {
        const componentFactory = this.componentFactoryResolver
            .resolveComponentFactory(popupItem.component);
        const viewContainerRef = this.popup.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        if (popupItem.params) {
            for (const prop in popupItem.params) {
                if (popupItem.params.hasOwnProperty(prop)) {
                    (componentRef.instance)[prop] = popupItem.params[prop];
                }
            }
        }
    }

    private ejectComponent() {
        const viewContainerRef = this.popup.viewContainerRef;
        viewContainerRef.clear();
    }

}
