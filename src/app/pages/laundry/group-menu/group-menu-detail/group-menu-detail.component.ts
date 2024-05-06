import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IGroupDetail, IGroupMenu } from "src/app/interfaces/i-group-menu";
import { IBodySendMenu, IMenu, IMenuUser } from "src/app/interfaces/i-menu";
import { IResponseDetail, IResponseList } from "src/app/interfaces/i-response";
import { GroupMenu, GroupMenuDetail } from "src/app/models/group-menu";
import { GroupMenuService } from "src/app/services/group-menu.service";
import { MenuService } from "src/app/services/menu.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-group-menu-detail",
	templateUrl: "./group-menu-detail.component.html",
	styleUrls: ["./group-menu-detail.component.scss"],
})
export class GroupMenuDetailComponent implements OnInit {
	id: string = "";
	listMenu: IMenuUser[] = [];
	groupMenu: IGroupDetail = new GroupMenuDetail();
	loadingIndicator: boolean = false;
	btnLoading: boolean = false;
	errorNama: string = "";
	sendListMenu: IMenuUser[] = [];

	constructor(
		private groupMenuService: GroupMenuService,
		private menuService: MenuService,
		private router: Router,
		private userService: UserService,
		private route: ActivatedRoute
	) {
		this.onMenu();
	}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.id = params["id"]; // Access the route parameter 'id'
			this.onGet();
		});
	}

	compare(data: IMenuUser) {
		return this.sendListMenu.some((item) => item.menuID === data.menuID) ===
			true
			? true
			: false;
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
				const updatedMenuArray = this.listMenu.map((menu) => {
					if (menu.menuLink !== null && menu.menuLink !== undefined) {
						// Split the menuLink by "/"
						const parts = menu.menuLink.split("/");
						// Join the parts with "5LA5H"
						const updatedMenuLink = parts.join("5LA5H");
						// Update the menuLink property
						menu.menuLink = updatedMenuLink;
					}
					return menu;
				});
				this.listMenu = updatedMenuArray;
			});
	}

	onGet() {
		this.groupMenuService
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
					}).then(() => {
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
			.subscribe((response: IResponseDetail<IGroupDetail>) => {
				this.groupMenu = response.data;
				this.sendListMenu = this.groupMenu.menuModel;
			});
	}

	onUpdate() {
		this.errorNama = "";
		this.sendListMenu = this.sendListMenu.map((menu) => {
			if (menu.menuLink !== null && menu.menuLink !== undefined) {
				// Split the menuLink by "/"
				const parts = menu.menuLink.split("/");
				// Join the parts with "5LA5H"
				const updatedMenuLink = parts.join("5LA5H");
				// Update the menuLink property
				menu.menuLink = updatedMenuLink;
			}
			return menu;
		});
		this.groupMenu.menuModel = this.sendListMenu;

		console.log(this.groupMenu.menuModel);

		this.loadingIndicator = true;
		this.btnLoading = true;
		this.groupMenuService
			.update(this.groupMenu.groupMenuID, this.groupMenu)
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
