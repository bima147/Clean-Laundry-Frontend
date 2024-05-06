import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IBarang } from "src/app/interfaces/i-barang";
import { IResponseDetail } from "src/app/interfaces/i-response";
import { BarangService } from "src/app/services/barang.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-barang-detail",
	templateUrl: "./barang-detail.component.html",
	styleUrls: ["./barang-detail.component.scss"],
})
export class BarangDetailComponent implements OnInit {
	id: string = "";
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
		private route: ActivatedRoute,
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

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.id = params["id"]; // Access the route parameter 'id'
			this.onGet();
		});
	}

	onGet() {
		this.barangService
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
			.subscribe((response: IResponseDetail<IBarang>) => {
				this.barang = response.data;
				console.log(response.data);
			});
	}

	onUpdate() {
		this.errorNama = "";
		this.errorSatuan = "";
		this.errorEstimasi = "";
		this.errorHarga = "";

		console.log(this.barang);

		this.loadingIndicator = true;
		this.btnLoading = true;
		this.barangService
			.update(this.id, this.barang)
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
					html: `Data Barang <b>${this.barang.nama}</b> berhasil diubah!`,
					showConfirmButton: false,
					timer: 1500,
				});
			});
	}
}
