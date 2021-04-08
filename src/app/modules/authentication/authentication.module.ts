import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AuthenticationRoutingModule } from "./authentication-routing.module";

@NgModule({
    declarations:
        [
            // LoginComponent,
            // ForgotPasswordComponent
        ],
    imports:
        [
            AuthenticationRoutingModule, CommonModule, FormsModule, ReactiveFormsModule
        ]
})

export class AuthenticationModule { }
