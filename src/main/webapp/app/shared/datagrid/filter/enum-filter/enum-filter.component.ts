import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { EnumFilterValue } from 'app/shared/util/filter-util';

@Component({
    selector: 'jhi-enum-filter',
    templateUrl: './enum-filter.component.html',
    styleUrls: [
        './enum-filter.component.scss'
    ]
})
export class JhiEnumFilterComponent implements ClrDatagridFilterInterface<any> {
    @Output('clrFilterValueChange') clrFilterValueChange = new EventEmitter();
    private _changes = new Subject<any>();
    property: string;
    i18nProperty: string;
    value: any;
    enumList: Array<string>;
    checkBoxValue: {[key: string]: boolean};
    all: boolean;

    constructor(public filterFn: ClrDatagridFilter) {
        this.filterFn.setFilter(this);
        this.value = new EnumFilterValue();
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
            this.value.filters.forEach(name => {
               this.checkBoxValue[name] = true;
            });
        }
    }

    @Input('enumList')
    public set setEnumList(list: Array<string>) {
        this.enumList = list;
        this.all = true;
        this.checkBoxValue = {};
        list.forEach(name => {
           this.checkBoxValue[name] = true;
        });
    }

    @Input('i18nProperty')
    public set setI18nProperty(property: string) {
        this.i18nProperty = property;
    }

    changeCheckBoxValue() {
        for (let i = 0; i < this.enumList.length; i++) {
            if (!this.checkBoxValue[this.enumList[i]]) {
                this.all = false;
                this.submit();
                return;
            }
        }
        this.all = true;
        this.submit();
    }

    changeAllCheckBoxValue() {
        let check = false;
        if (this.all) {
            check = true;
        }
        this.enumList.forEach(name => {
            this.checkBoxValue[name] = check;
        });
        this.submit();
    }

    isActive(): boolean {
        return this.value && this.value.filters && this.value.filters.length > 0;
    }

    accepts(item: any): boolean {
        return this.checkBoxValue[item[this.property]];
    }

    submit() {
        const list = [];
        if (!this.all) {
            this.enumList.forEach(name => {
                if (this.checkBoxValue[name]) {
                    list.push(name);
                }
            });
        }
        this.value.filters = list;
        this._changes.next(true);
    }
}
