import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IBarang } from "src/app/interfaces/i-barang";
import { IResponseDetail } from "src/app/interfaces/i-response";
import { IDataResponse } from "src/app/interfaces/i-signin";
import { BarangService } from "src/app/services/barang.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-barang-create",
	templateUrl: "./barang-create.component.html",
	styleUrls: ["./barang-create.component.scss"],
})
export class BarangCreateComponent {
	barang: IBarang;
	loadingIndicator: boolean = false;
	btnLoading: boolean = false;
	errorNama: string = "";
	errorSatuan: string = "";
	errorHarga: string = "";
	errorEstimasi: string = "";

	constructor(
		private barangService: BarangService,
		private router: Router,
		private userService: UserService
	) {
		this.barang = {
			barangID: 0,
			nama: "",
			satuan: "",
			harga: 0,
			estimasi: 0,
		};
	}

	onAdd() {
		this.errorNama = "";
		this.errorSatuan = "";
		this.errorEstimasi = "";
		this.errorHarga = "";

		this.loadingIndicator = true;
		this.btnLoading = true;
		this.barangService
			.create(this.barang)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					if (
						error.error === undefined &&
						error.error.subErrors !== null
					) {
						if (error.error.subErrors.size !== 0) {
							for (let getError of error.error.subErrors) {
								if (
									getError.field === "nama" &&
									this.errorNama === ""
								) {
									this.errorNama = getError.message;
								} else if (
									getError.field === "satuan" &&
									this.errorSatuan === ""
								) {
									this.errorSatuan = getError.message;
								} else if (
									getError.field === "estimasi" &&
									this.errorEstimasi === ""
								) {
									this.errorEstimasi = getError.message;
								} else if (
									getError.field === "harga" &&
									this.errorHarga === ""
								) {
									this.errorHarga = getError.message;
								}
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
			.subscribe((response: IResponseDetail<IBarang>) => {
				this.router.navigate(["/barang"]);
				Swal.fire({
					icon: "success",
					title: "Berhasil!",
					html: `Data Barang ${this.barang.nama} berhasil ditambahkan!`,
					showConfirmButton: false,
					timer: 1500,
				});
			});
	}
}
