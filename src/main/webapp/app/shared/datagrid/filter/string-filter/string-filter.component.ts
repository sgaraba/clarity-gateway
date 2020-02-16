import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { StringFilter, FilterType, StringFilterValue } from 'app/shared/util/filter-util';

@Component({
    selector: 'jhi-string-filter',
    templateUrl: './string-filter.component.html',
    styleUrls: [
        './string-filter.component.scss'
    ]
})
export class JhiStringFilterComponent implements ClrDatagridFilterInterface<any> {
    @Output('clrFilterValueChange') clrFilterValueChange = new EventEmitter();
    private _changes = new Subject<any>();
    property: string;
    value: any;
    stringContainType = FilterType.STRING_CONTAIN;
    stringAdvancedType = FilterType.STRING_ADVANCED;

    constructor(public filterFn: ClrDatagridFilter) {
        this.filterFn.setFilter(this);
        this.value = new StringFilterValue();
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
        return this.value && (this.value.keyword !== '' || this.value.primaryValue !== '');
    }

    accepts(item: any): boolean {
        return StringFilter(item[this.property], this.value);
    }

    submit() {
        this.value.type = this.value.enableAdvancedFilter ? this.stringAdvancedType : this.stringContainType;
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
