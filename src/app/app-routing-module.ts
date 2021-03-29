import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "./core/guards/login.guard";
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./modules/authentication/login/login.component";
import { BulkLoadComponent } from "./modules/bulk-load/bulk-load.component";
import { SearchByDocumentComponent } from "./modules/search-by-document/search-by-document.component";
import { SearchByProjectsComponent } from "./modules/search-by-projects/search-by-projects.component";


const routes: Routes = [

    { path: "login", component: LoginComponent },

    {
        path: "",   component: LayoutComponent,
        children: [
            {
                path: "Constructoras",
                canActivate:[LoginGuard],
                loadChildren: () => import("./modules/constructor/constructor.module").then((m) => m.ConstructorModule)
            },
            {
                path: "Proyectos",
                loadChildren: () => import("./modules/projects/projects.module").then((m) => m.ProjectsModule)
            },
            {
                path: "AdministracionUsuario",
                // canLoad: [ConsultasIQGuard],
                //canActivateChild: [ConsultasIQGuard],
                loadChildren: () => import("./modules/administracion-usuarios/administracion-usuario.module").then((m) => m.AdministracionUsuarioModule)
            },
            {
                path: "BusquedaProyecto", component: SearchByProjectsComponent
            },
            {
                path: "BusquedaDocumento", component: SearchByDocumentComponent
            },
            {
                path: "CargaMasiva", component: BulkLoadComponent
            },
            {
                path: "Contactos", 
                loadChildren: () =>import("./modules/contacts/contacts.module").then((m) => m.ContactsModule)
            }
        ]
    },

    { path: "**", redirectTo: "" }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    // providers: [ ConsultasIQGuard ],
})

export class AppRoutingModule { }