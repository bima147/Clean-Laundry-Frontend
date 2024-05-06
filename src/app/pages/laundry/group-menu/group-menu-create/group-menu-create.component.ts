import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IGroupMenu } from "src/app/interfaces/i-group-menu";
import { IMenu, IMenuUser } from "src/app/interfaces/i-menu";
import { IResponseDetail, IResponseList } from "src/app/interfaces/i-response";
import { GroupMenu } from "src/app/models/group-menu";
import { Menu } from "src/app/models/menu";
import { GroupMenuService } from "src/app/services/group-menu.service";
import { MenuService } from "src/app/services/menu.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-group-menu-create",
	templateUrl: "./group-menu-create.component.html",
	styleUrls: ["./group-menu-create.component.scss"],
})
export class GroupMenuCreateComponent {
	listMenu: IMenuUser[] = [];
	groupMenu: IGroupMenu = new GroupMenu();
	loadingIndicator: boolean = false;
	btnLoading: boolean = false;
	errorNama: string = "";
	sendListMenu: IMenuUser[] = [];

	constructor(
		private groupMenuService: GroupMenuService,
		private menuService: MenuService,
		private router: Router,
		private userService: UserService
	) {
		this.onMenu();
	}

	addListMenu(sendListMenu: IMenuUser) {
		if (
			this.sendListMenu.some(
				(item) => item.menuID === sendListMenu.menuID
			)
		) {
			let index = this.sendListMenu.findIndex(
				(item) => item.menuID === sendListMenu.menuID
			);
			this.sendListMenu.splice(index, 1);
		} else {
			this.sendListMenu.push(sendListMenu);
		}
		console.log(this.sendListMenu);
	}

	onMenu() {
		this.menuService
			.all(0, "asc", "nama", {
				filterBy: "",
				value: "",
				size: 100,
			})
			.pipe(
				catchError((error: HttpErrorResponse) => {
					Swal.fire({
						title: "Error!",
						text:
							error.error.message !== null
								? error.error.error
								: error.error.message,
						icon: "error",
					}).then(() => {
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
			.subscribe((response: IResponseList<IMenuUser>) => {
				this.listMenu = response.data.content;
			});
	}

	onAdd() {
		this.errorNama = "";
		this.groupMenu.menuModel = this.sendListMenu;

		this.loadingIndicator = true;
		this.btnLoading = true;
		this.groupMenuService
			.create(this.groupMenu)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					if (
						error.error.subErrors !== null &&
						error.error.subErrors.size !== 0
					) {
						for (let getError of error.error.subErrors) {
							if (
								getError.field === "nama" &&
								this.errorNama === ""
							) {
								this.errorNama = getError.message;
							}
						}
					}
					Swal.fire({
						title: "Error!",
						text:
							error.error.message !== null
								? error.error.error
								: error.error.message,
						icon: "error",
					}).then(() => {
						this.loadingIndicator = false;
						this.btnLoading = false;

						if (
							error.error.error ==
							"Full authentication is required to access this resource"
						) {
							this.userService.signout();
						}
					});
					// this.error.detail = error.error.detail;
					return throwError(() => new Error("Someting wrong!"));
				})
			)
			.subscribe((response: IResponseDetail<IGroupMenu>) => {
				this.router.navigate(["/group-menu"]);
				Swal.fire({
					icon: "success",
					title: "Berhasil!",
					html: `Data group menu ${this.groupMenu.groupName} berhasil ditambahkan!`,
					showConfirmButton: false,
					timer: 1500,
				});
			});
	}
}
