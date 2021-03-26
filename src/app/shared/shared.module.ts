import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [],
	declarations: [],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
})
export class SharedModule {}