import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { ICustomer } from "src/app/interfaces/i-customer";
import { IResponseDetail } from "src/app/interfaces/i-response";
import { CustomerService } from "src/app/services/customer.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-customer-create",
	templateUrl: "./customer-create.component.html",
	styleUrls: ["./customer-create.component.scss"],
})
export class CustomerCreateComponent {
	customer: ICustomer;
	loadingIndicator: boolean = false;
	btnLoading: boolean = false;
	errorNama: string = "";
	errorPhone: string = "";
	errorEmail: string = "";

	constructor(
		private customerService: CustomerService,
		private router: Router,
		private userService: UserService
	) {
		this.customer = {
			namaLengkap: "",
			noHp: "",
			email: "",
		};
	}

	onAdd() {
		this.errorNama = "";
		this.errorPhone = "";
		this.errorEmail = "";

		this.loadingIndicator = true;
		this.btnLoading = true;
		this.customerService
			.create(this.customer)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					if (
						error.error.subErrors !== undefined &&
						error.error.subErrors.size !== 0
					) {
						for (let getError of error.error.subErrors) {
							if (
								getError.field === "namaLengkap" &&
								this.errorNama === ""
							) {
								this.errorNama = getError.message;
							} else if (
								getError.field === "noHp" &&
								this.errorPhone === ""
							) {
								this.errorPhone = getError.message;
							} else if (
								getError.field === "email" &&
								this.errorEmail === ""
							) {
								this.errorEmail = getError.message;
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
						if (
							error.error.error ==
							"Full authentication is required to access this resource"
						) {
							this.userService.signout();
						}
						this.loadingIndicator = false;
						this.btnLoading = false;
					});
					// this.error.detail = error.error.detail;
					return throwError(() => new Error("Someting wrong!"));
				})
			)
			.subscribe((response: IResponseDetail<ICustomer>) => {
				this.router.navigate(["/laundry/customer"]);
				Swal.fire({
					icon: "success",
					title: "Berhasil!",
					html: `Data pelanggan ${this.customer.namaLengkap} berhasil ditambahkan!`,
					showConfirmButton: false,
					timer: 1500,
				});
			});
	}
}
