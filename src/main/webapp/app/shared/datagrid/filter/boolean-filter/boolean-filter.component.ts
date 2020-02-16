import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { BooleanFilterValue } from 'app/shared/util/filter-util';

@Component({
    selector: 'jhi-boolean-filter',
    templateUrl: './boolean-filter.component.html',
    styleUrls: [
        './boolean-filter.component.scss'
    ]
})
export class JhiBooleanFilterComponent implements ClrDatagridFilterInterface<any> {
    @Output('clrFilterValueChange') clrFilterValueChange = new EventEmitter();
    private _changes = new Subject<any>();
    property: string;
    value: BooleanFilterValue;
    yes: boolean;
    no: boolean;

    constructor(public filterFn: ClrDatagridFilter) {
        this.filterFn.setFilter(this);
        this.value = new BooleanFilterValue();
        this.yes = true;
        this.no = true;
    }

    public get changes(): Observable<any> {
        return this._changes.asObservable();
    }

    @Input('clrDgField')
    public set field(field: string) {
        if (typeof field === 'string') {
            this.property = field;
        }
    }

    @Input('clrFilterValue')
    public set clrFilterValue(filter: any) {
        if (filter && filter.value) {
            if (filter.value.filter === '') {
                filter.value.filter = false;
            }
            this.value = filter.value;
            if (this.value.filter === true) {
                this.yes = true;
                this.no = false;
            } else if (this.value.filter === false) {
                this.yes = false;
                this.no = true;
            }
        }
    }

    update() {
        if (this.yes && this.no) {
            this.value.filter = null;
        } else if (!this.yes && !this.no) {
            this.value.filter = null;
        } else if (this.yes) {
            this.value.filter = true;
        } else if (this.no) {
            this.value.filter = false;
        }
        this._changes.next(true);
    }

    isActive(): boolean {
        return this.value && this.value.filter != null;
    }

    accepts(item: any): boolean {
        return this.value.filter == null || item[this.property] === this.value.filter;
    }
}
