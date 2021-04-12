import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConstructorComponent } from "./constructor.component";
import { ConsultarComponent } from "./consultar/consultar.component";
import { CrearComponent } from "./crear/crear.component";
import { EditarComponent } from "./editar/editar.component";

const routes: Routes = [
    { 
        path: "", 
        // canActivate: [], //IMPLEMETAR Guards
        component: ConstructorComponent 
    },
    { 
        path: "Crear", 
        // canLoad: [ConsultasIQGuard], //IMPLEMETAR Guards
        component: CrearComponent 
    },
    { 
        path: "Editar", 
        // canLoad: [ConsultasIQGuard], //IMPLEMETAR Guards
        component: EditarComponent 
    },
    {
        path: "Consultar", component: ConsultarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ConstructorRoutingModule { }