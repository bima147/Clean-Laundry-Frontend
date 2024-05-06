import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlankComponent } from "./layouts/blank/blank.component";
import { FullComponent } from "./layouts/full/full.component";
import { AuthGuard, PreventGuard } from "./guards/auth.guard";
import { BarangComponent } from "./pages/laundry/barang/barang.component";
import { AppDashboardComponent } from "./pages/dashboard/dashboard.component";
import { AppSideRegisterComponent } from "./pages/authentication/register/register.component";
import { AppSideLoginComponent } from "./pages/authentication/login/login.component";
import { TrackComponent } from "./pages/track/track.component";
import { TrackDetailComponent } from "./pages/track/track-detail/track-detail.component";

const routes: Routes = [
	{
		path: "track",
		component: BlankComponent,
		children: [
			{
				path: "",
				component: TrackComponent,
			},
			{
				path: ":uuid",
				component: TrackDetailComponent,
			},
		],
	},
	{
		path: "",
		component: FullComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: "",
				component: AppDashboardComponent,
				loadChildren: () =>
					import("./pages/pages.module").then((m) => m.PagesModule),
			},
			{
				path: "",
				loadChildren: () =>
					import("./pages/laundry/laundry.module").then(
						(m) => m.LaundryModule
					),
			},
			{
				path: "ui-components",
				loadChildren: () =>
					import("./pages/ui-components/ui-components.module").then(
						(m) => m.UicomponentsModule
					),
			},
			{
				path: "extra",
				loadChildren: () =>
					import("./pages/extra/extra.module").then(
						(m) => m.ExtraModule
					),
			},
		],
	},
	{
		path: "",
		component: BlankComponent,

		children: [
			{
				path: "authentication",
				loadChildren: () =>
					import("./pages/authentication/authentication.module").then(
						(m) => m.AuthenticationModule
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
