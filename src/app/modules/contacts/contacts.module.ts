import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ContactsRoutingModule } from "./contacts-routing.module";
import { ContactsComponent } from "./contacts.component";
import { ToCreateProjectContactsComponent } from './to-create-project-contacts/to-create-project-contacts.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { ToCreateConstructorContactsComponent } from './to-create-constructor-contacts/to-create-constructor-contacts.component';
import { ToUpdateConstructorContactsComponent } from './to-update-constructor-contacts/to-update-constructor-contacts.component';
import { ToUpdateProjectContactsComponent } from './to-update-project-contacts/to-update-project-contacts.component';
import { DataTablesModule } from "angular-datatables";

@NgModule({
    declarations: [ContactsComponent, ToCreateProjectContactsComponent, ToCreateConstructorContactsComponent, ToUpdateConstructorContactsComponent, ToUpdateProjectContactsComponent],
    imports: [ContactsRoutingModule, DataTablesModule, CommonModule, FormsModule, NgMultiSelectDropDownModule.forRoot()]
})

export class ContactsModule { }