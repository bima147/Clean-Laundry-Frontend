import { HttpErrorResponse } from "@angular/common/http";
import {
	Component,
	Output,
	EventEmitter,
	Input,
	ViewEncapsulation,
	OnInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IResponseDetail } from "src/app/interfaces/i-response";
import { IUser } from "src/app/interfaces/i-user";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
	@Input() showToggle = true;
	@Input() toggleChecked = false;
	@Output() toggleMobileNav = new EventEmitter<void>();
	@Output() toggleMobileFilterNav = new EventEmitter<void>();
	@Output() toggleCollapsed = new EventEmitter<void>();

	showFiller = false;

	user: IUser = new User();
	nameNavbar = "";

	constructor(
		public dialog: MatDialog,
		private userService: UserService,
		private router: Router
	) {
		// this.loadData();
	}

	// loadData() {
	// 	this.userService
	// 		.getData()
	// 		.pipe(
	// 			catchError((error: HttpErrorResponse) => {
	// 				Swal.fire({
	// 					title: "Error!",
	// 					text:
	// 						error.error.message === null
	// 							? error.error.error
	// 							: error.error.message,
	// 					icon: "error",
	// 				}).then(() => {
	// 					if (
	// 						error.error.error ==
	// 						"Full authentication is required to access this resource"
	// 					) {
	// 						this.userService.signout();
	// 					}
	// 				});
	// 				// this.error.detail = error.error.detail;
	// 				return throwError(() => new Error("Someting wrong!"));
	// 			})
	// 		)
	// 		.subscribe((response: IResponseDetail<IUser>) => {
	// 			this.user = response.data;
	// 			var words = this.user.namaLengkap.split(" ");
	// 			this.nameNavbar = words[0];
	// 			this.nameNavbar =
	// 				this.nameNavbar.charAt(0).toUpperCase() +
	// 				this.nameNavbar.slice(1);
	// 			if (this.nameNavbar.length > 7) {
	// 				this.nameNavbar.slice(0, 7);
	// 			}
	// 		});
	// }

	getNama() {
		let name = this.userService.getName();
		var words = name.split(" ");
		this.nameNavbar = words[0];
		this.nameNavbar =
			this.nameNavbar.charAt(0).toUpperCase() + this.nameNavbar.slice(1);
		if (this.nameNavbar.length > 7) {
			this.nameNavbar.slice(0, 7);
		}

		return this.nameNavbar;
	}

	onSignout() {
		this.userService.signout();
	}
}
