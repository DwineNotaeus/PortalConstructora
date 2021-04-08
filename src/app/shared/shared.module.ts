import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OnlyLetterDirective } from "./directives/only-letter.directive";
import { OnlyNumberDirective } from "./directives/only-number.directive";

@NgModule({
	imports:
		[
			CommonModule,
			FormsModule,
			ReactiveFormsModule
		],
	providers:
		[
		],
	declarations:
		[
			OnlyLetterDirective,
			OnlyNumberDirective
		],
	exports:
		[
			CommonModule,
			FormsModule,
			ReactiveFormsModule
		],
})
export class SharedModule { }