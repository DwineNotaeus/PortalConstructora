import { Attribute, Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatchPassword), multi: true }]
})
export class MatchPassword implements Validator {


  constructor(@Attribute('appMatchPassword') public validateEqual: string) {        
  }

  validate(control: AbstractControl): ValidationErrors {
    debugger;
    console.log(this.validateEqual);
    console.log(control);

    let selfValue = control.value;
    let controlValue = control.root.get(this.validateEqual);

    // value not equal
    if (controlValue && selfValue !== controlValue.value) return {
      validateEqual: false
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
