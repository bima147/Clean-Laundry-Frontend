import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IMenu, ISendMenu } from "src/app/interfaces/i-menu";
import { IResponseDetail } from "src/app/interfaces/i-response";
import { SidebarComponent } from "src/app/layouts/full/sidebar/sidebar.component";
import { Menu, SendMenu } from "src/app/models/menu";
import { MenuService } from "src/app/services/menu.service";
import { NavService } from "src/app/services/nav.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-menu-detail",
	templateUrl: "./menu-detail.component.html",
	styleUrls: ["./menu-detail.component.scss"],
})
export class MenuDetailComponent implements OnInit {
	id: string = "";
	menu: IMenu = new Menu();
	loadingIndicator: boolean = false;
	btnLoading: boolean = false;
	errorNama: string = "";
	errorEstimasi: string = "";
	errorService: string = "";
	errorIcon: string = "";
	errorAction: string = "";
	errorLink: string = "";
	errorShow: string = "";

	constructor(
		private menuService: MenuService,
		private router: Router,
		private userService: UserService,
		public navService: NavService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.id = params["id"]; // Access the route parameter 'id'
			this.onGet();
		});
	}

	onGet() {
		this.menuService
			.get(this.id)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					Swal.fire({
						title: "Error!",
						text:
							error.error.message !== null
								? error.error.error
								: error.error.message,
						icon: "error",
					}).then(() => {});
					// this.error.detail = error.error.detail;
					return throwError(() => new Error("Someting wrong!"));
				})
			)
			.subscribe((response: IResponseDetail<IMenu>) => {
				this.menu = response.data;
				console.log(this.menu);
			});
	}

	onUpdate() {
		if (this.menu.menuLink !== null && this.menu.menuLink !== undefined) {
			this.menu.menuLink = this.menu.menuLink.replace(/\//g, "5LA5H");
		}

		this.errorNama = "";
		this.errorService = "";
		this.errorIcon = "";
		this.errorAction = "";
		this.errorLink = "";
		this.errorNama = "";
		this.errorShow = "";

		this.loadingIndicator = true;
		this.btnLoading = true;
		this.menuService
			.update(this.menu.menuID, this.menu)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					this.loadingIndicator = true;
					this.btnLoading = true;
					// if (
					// 	error.error.subErrors !== null &&
					// 	error.error.subErrors.size !== 0
					// ) {
					// 	for (let getError of error.error.subErrors) {
					// 		if (
					// 			getError.field === "nama" &&
					// 			this.errorNama === ""
					// 		) {
					// 			this.errorNama = getError.message;
					// 		} else if (
					// 			getError.field === "menuNameService" &&
					// 			this.errorService === ""
					// 		) {
					// 			this.errorService = getError.message;
					// 		} else if (
					// 			getError.field === "doAction" &&
					// 			this.errorAction === ""
					// 		) {
					// 			this.errorAction = getError.message;
					// 		} else if (
					// 			getError.field === "show" &&
					// 			this.errorShow === ""
					// 		) {
					// 			this.errorShow = getError.message;
					// 		}
					// 	}
					// }
					Swal.fire({
						title: "Error!",
						text:
							error.error.message === null
								? error.error.error
								: error.error.message,
						icon: "error",
					}).then(() => {
						this.loadingIndicator = false;
						this.btnLoading = false;

						if (
							error.error.error ===
								"Full authentication is required to access this resource" ||
							error.error.message === "Anda tidak punya akses!"
						) {
							this.userService.signout();
						}
					});
					// this.error.detail = error.error.detail;
					return throwError(() => new Error("Someting wrong!"));
				})
			)
			.subscribe((response: IResponseDetail<ISendMenu>) => {
				new SidebarComponent(
					this.navService,
					this.userService,
					this.router
				).loadData();
				this.router.navigate(["/menu"]);
				Swal.fire({
					icon: "success",
					title: "Berhasil!",
					html: `Data Barang ${this.menu.menuName} berhasil diubah!`,
					showConfirmButton: false,
					timer: 1500,
				});
			});
	}
}
