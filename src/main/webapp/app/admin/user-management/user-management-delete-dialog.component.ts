import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { User, UserService } from 'app/core';
import {PROGRESS_STATE} from 'app/shared/constants/load.constants';

@Component({
    selector: 'jhi-user-mgmt-delete-dialog',
    templateUrl: './user-management-delete-dialog.component.html'
})
export class UserMgmtDeleteDialogComponent implements OnInit {

    private item: User;
    private list: User[];
    private progressValue: number;
    private progressState: string;
    private _opened: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe(({ response }) => {
            if (response.body instanceof Array) {
                this.list = response.body;
            } else if (response.body instanceof Object) {
                this.item = response.body;
            }
            this.opened = true;
        });
    }

    get opened() {
        return this._opened;
    }

    set opened(value: any) {
        this._opened = value;
        if (!value) {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
        }
    }

    confirmBatchDelete() {
        const loop = () => {
            this.userService.delete(this.list[this.progressValue].id).subscribe(
                response => {
                    if (this.progressValue >= 0 && this.progressValue < this.list.length) {
                        this.progressValue++;
                        loop();
                    } else {
                        this.progressState = PROGRESS_STATE.SUCCESS;
                        this.eventManager.broadcast({
                            name: 'userListModification',
                            content: 'Deleted an User'
                        });
                    }
                },
                error => {
                    this.progressState = PROGRESS_STATE.ERROR;
                    this.eventManager.broadcast({
                        name: 'userListModification',
                        content: 'Deleted an User'
                    });
                }
            );
        };
        this.progressState = PROGRESS_STATE.IN_PROGRESS;
        loop();
    }
}
