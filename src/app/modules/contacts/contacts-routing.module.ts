import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactsComponent } from "./contacts.component";
import { ToCreateConstructorContactsComponent } from "./to-create-constructor-contacts/to-create-constructor-contacts.component";
import { ToCreateProjectContactsComponent } from "./to-create-project-contacts/to-create-project-contacts.component";
import { ToUpdateConstructorContactsComponent } from "./to-update-constructor-contacts/to-update-constructor-contacts.component";
import { ToUpdateProjectContactsComponent } from "./to-update-project-contacts/to-update-project-contacts.component";

const routes: Routes = [
    {
        path: "",
        component: ContactsComponent
    },
    {
        path: "CrearContactoConstructora",
        component: ToCreateConstructorContactsComponent
    },
    {
        path: "CrearContactoProyecto",
        component: ToCreateProjectContactsComponent
    },
    {
        path: "EditarContactoConstructora",
        component: ToUpdateConstructorContactsComponent
    },
    {
        path: "EditarContactoProyecto",
        component: ToUpdateProjectContactsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ContactsRoutingModule { }