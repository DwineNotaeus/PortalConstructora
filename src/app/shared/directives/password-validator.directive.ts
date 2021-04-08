import { Attribute, Directive, ElementRef, forwardRef, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
	selector: '[passwordValidator]',
	providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordValidator), multi: true }]
})
export class PasswordValidator implements Validator {

	constructor(@Attribute('passwordValidator') public invalidPassword: boolean, elemDom: ElementRef, renderer: Renderer2) {
		// console.log('directiva OK PasswordValidator');
		renderer.setStyle(elemDom.nativeElement, "color", "green");
	}
	validate(control: AbstractControl): ValidationErrors {
		debugger;
		const password = control.value;

		let hasLower = false;
		let hasUpper = false;
		let hasNum = false;
		let hasSpecial = false;

		const lowercaseRegex = new RegExp('(?=.*[a-z])'); // has at least one lower case letter
		if (lowercaseRegex.test(password)) {
			hasLower = true;
		}

		const uppercaseRegex = new RegExp('(?=.*[A-Z])'); // has at least one upper case letter
		if (uppercaseRegex.test(password)) {
			hasUpper = true;
		}

		const numRegex = new RegExp('(?=.*\\d)'); // has at least one number
		if (numRegex.test(password)) {
			hasNum = true;
		}

		const specialcharRegex = new RegExp("[!@#$%^&*(),.?':{}|<>]"); // has at least one special character
		if (specialcharRegex.test(password)) {
			hasSpecial = true;
		}

		let counter = 0;
		const checks = [hasLower, hasUpper, hasNum, hasSpecial];
		checks.forEach((e) => {
			if (e) {
				counter++;
			}
		});

		if (counter === 4) {
			return null;
		}
		return { invalidPassword: true };
	}


	registerOnValidatorChange?(fn: () => void): void {
		throw new Error('Method not implemented.');
	}

}
