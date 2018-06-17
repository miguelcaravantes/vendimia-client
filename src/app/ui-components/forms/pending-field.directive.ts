

import { NgControl } from '@angular/forms';
import { Directive, ViewChild, AfterContentInit, ContentChild, OnInit, ElementRef, Input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms/src/model';
import { startWith } from 'rxjs/operators';

@Directive({
    selector: '[appPendingField]'
})
export class PendingFieldDirective implements OnInit {
    control: NgControl;
    @Input() appPendingField;

    constructor(private element: ElementRef) {

    }

    ngOnInit() {


        setTimeout(() => {
            this.control.statusChanges.pipe(startWith(null)).subscribe(() => {
                if (this.control.pending) {
                    this.element.nativeElement.classList.add(this.appPendingField);
                } else {
                    this.element.nativeElement.classList.remove(this.appPendingField);
                }
            }
            );
        });
    }

}
