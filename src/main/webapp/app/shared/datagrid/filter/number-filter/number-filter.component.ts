import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { NumberFilter, FilterSymbol, FilterType, NumberFilterValue } from 'app/shared/util/filter-util';

@Component({
    selector: 'jhi-number-filter',
    templateUrl: './number-filter.component.html',
    styleUrls: [
        './number-filter.component.scss'
    ]
})

export class JhiNumberFilterComponent implements ClrDatagridFilterInterface<any> {
    @Output('clrFilterValueChange') clrFilterValueChange = new EventEmitter();
    _changes = new Subject<any>();
    property: string;
    value: any;
    numberRangeType = FilterType.NUMBER_RANGE;
    numberAdvancedType = FilterType.NUMBER_ADVANCED;

    constructor(public filterFn: ClrDatagridFilter) {
        this.filterFn.setFilter(this);
        this.value = new NumberFilterValue();
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
        return this.value && (this.value.max != null || this.value.min != null || this.value.primaryValue != null);
    }

    accepts(item: any): boolean {
        return NumberFilter(item[this.property], this.value);
    }

    submit() {
        this.value.type = this.value.enableAdvancedFilter ? this.numberAdvancedType : this.numberRangeType;
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
