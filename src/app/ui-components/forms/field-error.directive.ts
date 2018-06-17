import { NgControl } from '@angular/forms';
import { Directive, ViewChild, AfterContentInit, ContentChild, OnInit, ElementRef } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { ValidationErrorsService } from '../../core/forms/validation-errors.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'mat-error'
})
export class FieldErrorDirective implements AfterContentInit, OnInit {

  control: NgControl;
  placeholder: string;

  constructor(private element: ElementRef, private validationErrorsService: ValidationErrorsService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.control.statusChanges.pipe(startWith(null)).subscribe(this.setError.bind(this));
    });
  }

  ngAfterContentInit(): void {

  }

  private setError() {
    const error = this.validationErrorsService.processErrors(this.control);
    this.element.nativeElement.innerHTML = error.replace('[name]', `<b>${this.placeholder}</b>`);
  }

}


