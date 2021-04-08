import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";


import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { LayoutComponent } from "./layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
	imports: [SharedModule, RouterModule, BrowserModule],
	providers: [],
	declarations: [LayoutComponent, SidebarComponent, HeaderComponent, FooterComponent],
	exports: [LayoutComponent, SidebarComponent, HeaderComponent, FooterComponent],
})
export class LayoutModule {}