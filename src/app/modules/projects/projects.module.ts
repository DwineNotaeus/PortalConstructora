import { NgModule } from "@angular/core";
import { ProjectsRoutingModule } from "./projects-routing.module";
import { ProjectsComponent } from "./projects.component";
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { ContactoComponent } from './contacto/contacto.component';
import { OnlyNumberDirective } from "src/app/shared/directives/only-number.directive";
import { SharedModule } from "src/app/shared/shared.module";
import { OnlyLetterDirective } from "src/app/shared/directives/only-letter.directive";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { ConsultarComponent } from './consultar/consultar.component';

@NgModule({
    imports: [SharedModule, ProjectsRoutingModule, DataTablesModule, CommonModule, NgMultiSelectDropDownModule.forRoot()],
    declarations: [ProjectsComponent, CrearComponent, EditarComponent, ContactoComponent, ConsultarComponent ]
})

export class ProjectsModule { }