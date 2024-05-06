import { Component, OnInit } from "@angular/core";
import { navItems } from "./sidebar-data";
import { NavService } from "../../../services/nav.service";
import { UserService } from "src/app/services/user.service";
import { catchError, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
import { IUser } from "src/app/interfaces/i-user";
import { User } from "src/app/models/user";
import { IResponseDetail } from "src/app/interfaces/i-response";
import { IMenu, IMenuUser } from "src/app/interfaces/i-menu";
import { Menu } from "src/app/models/menu";
import { Router } from "@angular/router";

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
	menu: IMenuUser[] = [
		{
			menuID: 0,
			menuName: "Dashboard",
			menuLink: "/",
			menuIcon: "layout-dashboard",
			menuService: null,
			doAction: null,
			show: false,
			createdBy: 1,
			updatedBy: null,
			createdAt: 1713524314177,
			updatedAt: null,
		},
	];

	constructor(
		public navService: NavService,
		private userService: UserService,
		public router: Router
	) {
		this.loadData();
	}

	ngOnInit(): void {}

	loadData() {
		this.userService
			.getData()
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
			.subscribe((response: IResponseDetail<IUser>) => {
				this.userService.setLevel(response.data.groupMenu);
				this.userService.setName(response.data.namaLengkap);
				for (
					let index = 0;
					index < response.data.menu.length;
					index++
				) {
					if (response.data.menu[index].show === true) {
						this.menu = this.menu.concat(response.data.menu[index]);
					}
				}
			});
	}
}
