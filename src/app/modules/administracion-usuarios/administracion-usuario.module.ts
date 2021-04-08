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
import { PasswordValidator } from "src/app/shared/directives/password-validator.directive";
import { ShowHidePasswordDirective } from "src/app/shared/directives/show-hide-password.directive";
import { MatchPassword } from "src/app/shared/directives/match-password.directive";
import { OnlyNumberDirective } from "src/app/shared/directives/only-number.directive";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    imports:
        [
            AdministracionUsuarioRoutingModule,
            DataTablesModule,
            CommonModule,
            FormsModule,
            SharedModule            
        ],
    declarations:
        [
            AdministracionUsuariosComponent,
            CrearComponent,
            ConsultarComponent,
            EditarComponent,
            DeshabilitarComponent,
            // OnlyNumberDirective,
            PasswordValidator,
            ShowHidePasswordDirective,
            MatchPassword
        ]
})

export class AdministracionUsuarioModule { }