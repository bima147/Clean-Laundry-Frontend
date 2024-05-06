import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// icons
import { TablerIconsModule } from "angular-tabler-icons";
import * as TablerIcons from "angular-tabler-icons/icons";

//Import all material modules
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgScrollbarModule } from "ngx-scrollbar";

//Import Layouts
import { FullComponent } from "./layouts/full/full.component";
import { BlankComponent } from "./layouts/blank/blank.component";

// Vertical Layout
import { SidebarComponent } from "./layouts/full/sidebar/sidebar.component";
import { HeaderComponent } from "./layouts/full/header/header.component";
import { BrandingComponent } from "./layouts/full/sidebar/branding.component";
import { AppNavItemComponent } from "./layouts/full/sidebar/nav-item/nav-item.component";
import { CommonModule } from "@angular/common";
import { NgApexchartsModule } from "ng-apexcharts";
import { BarangComponent } from "./pages/laundry/barang/barang.component";
import { AppSideLoginComponent } from "./pages/authentication/login/login.component";
import { AppSideRegisterComponent } from "./pages/authentication/register/register.component";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { TrackComponent } from "./pages/track/track.component";
import { TrackDetailComponent } from "./pages/track/track-detail/track-detail.component";
import { ResponseInterceptor } from "./interceptors/response.interceptor";

@NgModule({
	declarations: [
		AppComponent,
		FullComponent,
		BlankComponent,
		SidebarComponent,
		HeaderComponent,
		BrandingComponent,
		AppNavItemComponent,
		TrackComponent,
		TrackDetailComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		TablerIconsModule.pick(TablerIcons),
		NgScrollbarModule,

		CommonModule,
		NgApexchartsModule,
		MatIconModule,
		MatCardModule,
		MatInputModule,
		MatCheckboxModule,
		MatButtonModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ResponseInterceptor,
			multi: true,
		},
	],
	exports: [TablerIconsModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
