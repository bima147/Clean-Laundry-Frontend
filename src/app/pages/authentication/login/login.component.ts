import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IDataResponse, ISignin } from "src/app/interfaces/i-signin";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class AppSideLoginComponent {
	user: ISignin;
	loadingIndicator: boolean = false;
	btnLoading: boolean = false;

	constructor(private userService: UserService, private router: Router) {
		this.user = {
			username: "",
			password: "",
		};
	}

	onSignin() {
		this.loadingIndicator = true;
		this.btnLoading = true;
		this.userService
			.signin(this.user)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					Swal.fire({
						title: "Error!",
						text:
							error.error.message == null
								? "Terjadi kesalahan pada server kami!"
								: error.error.message,
						icon: "error",
					}).then(() => {
						this.loadingIndicator = false;
						this.btnLoading = false;
					});
					// this.error.detail = error.error.detail;
					return throwError(() => new Error("Someting wrong!"));
				})
			)
			.subscribe((response: IDataResponse) => {
				this.userService.setAuthentication(response.data);
				this.router.navigate(["/"]);
				Swal.fire({
					icon: "success",
					title: "Welcome",
					html: `Selamat datang ${this.user.username}`,
					showConfirmButton: false,
					timer: 1500,
				});
			});
	}
}
