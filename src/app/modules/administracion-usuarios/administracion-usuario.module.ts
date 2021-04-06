import { NgModule } from "@angular/core";
import { AdministracionUsuarioRoutingModule } from "./administracion-usuario-routing.module";
import { AdministracionUsuariosComponent } from "./administracion-usuarios.component";
import { ConsultarComponent } from './consultar/consultar.component';
import { EditarComponent } from './editar/editar.component';
import { DeshabilitarComponent } from './deshabilitar/deshabilitar.component';
import { CrearComponent } from "./crear/crear.component";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [AdministracionUsuariosComponent, CrearComponent, ConsultarComponent, EditarComponent, DeshabilitarComponent],
    imports: [ AdministracionUsuarioRoutingModule, DataTablesModule, CommonModule, FormsModule ],
    // providers: [ ConsultasIQGuard ],
})

export class AdministracionUsuarioModule { }