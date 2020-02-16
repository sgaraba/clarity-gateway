import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { DateFilter, DateFilterValue, FilterType } from 'app/shared/util/filter-util';

@Component({
    selector: 'jhi-date-filter',
    templateUrl: './date-filter.component.html',
    styleUrls: [
        './date-filter.component.scss'
    ]
})
export class JhiDateFilterComponent implements ClrDatagridFilterInterface<any> {
    @Output('clrFilterValueChange') clrFilterValueChange = new EventEmitter();
    _changes = new Subject<any>();
    property: string;
    value: any;
    dateRangeType = FilterType.DATE_RANGE;
    dateAdvancedType = FilterType.DATE_ADVANCED;

    constructor(public filterFn: ClrDatagridFilter) {
        this.filterFn.setFilter(this);
        this.value = new DateFilterValue();
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
            this.value = filter.value;
        }
    }

    isActive(): boolean {
        return this.value && (this.value.max || this.value.min || this.value.primaryValue);
    }

    accepts(item: any): boolean {
        return DateFilter(item[this.property], this.value);
    }

    submit() {
        this.value.type = this.value.enableAdvancedFilter ? this.dateAdvancedType : this.dateRangeType;
        this._changes.next(true);
    }

    close(event) {
        const  inputs = event.currentTarget.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].blur();
        }
        this.filterFn.open = false;
    }
}
