import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper, AccountService, Principal } from 'app/core';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private principal: Principal,
        private accountSerivce: AccountService,
        private router: Router
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'gatewayApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
        this.accountSerivce
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (!account) {
                    this.router.navigate(['/login']);
                }
            })
            .catch(err => {
                this.router.navigate(['/login']);
            });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}
