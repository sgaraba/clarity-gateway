import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[jhiPopup]'
})
export class PopupDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
