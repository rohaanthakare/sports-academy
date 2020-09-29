import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  mustMatchValidator(firstFieldName, secondFieldName) {
    return (formGroup: FormGroup) => {
      const firstFieldCtlr = formGroup.controls[firstFieldName];
      const secondFieldCtlr = formGroup.controls[secondFieldName];
      if (secondFieldCtlr.errors && secondFieldCtlr.errors.required) {
        return;
      }
      if (secondFieldCtlr.value !== firstFieldCtlr.value) {
        secondFieldCtlr.setErrors({
          mustMatch: true
        });
      } else {
        secondFieldCtlr.setErrors(null);
      }
    };
  }

  mobileNoValidator(fieldName) {
    return (formGroup: FormGroup) => {
      const fieldCtlr = formGroup.controls[fieldName];
      if (fieldCtlr.errors && fieldCtlr.errors.required) {
        return;
      }
      if (fieldCtlr.value.toString().length !== 10) {
        fieldCtlr.setErrors({
          invalidMobileNo: true
        });
      } else {
        fieldCtlr.setErrors(null);
      }
    };
  }
}
