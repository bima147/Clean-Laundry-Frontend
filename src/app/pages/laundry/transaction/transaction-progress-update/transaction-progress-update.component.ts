import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IProgress, ISendProgress } from "src/app/interfaces/i-progress";
import { IResponseDetail } from "src/app/interfaces/i-response";
import { ITransaksiDetail } from "src/app/interfaces/i-transaksi";
import { Progress, SendProgress } from "src/app/models/progress";
import { TransaksiDetail } from "src/app/models/transaksi";
import { TransaksiService } from "src/app/services/transaksi.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-transaction-progress-update",
	templateUrl: "./transaction-progress-update.component.html",
	styleUrls: ["./transaction-progress-update.component.scss"],
})
export class TransactionProgressUpdateComponent implements OnInit {
	uuid: string = "";
	id: string = "";
	loadingIndicator: boolean = false;
	btnLoading: boolean = false;
	progress: ISendProgress = new SendProgress();
	idTransaksi: number = 0;

	progressArray: any[] = [
		{ label: "Diproses", value: "Diproses" },
		{ label: "Selesai", value: "Selesai" },
		{ label: "Diambil", value: "Diambil" },
	];

	constructor(
		private userService: UserService,
		private transaksiService: TransaksiService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.uuid = params["uuid"]; // Access the route parameter 'id'
			this.id = params["id"]; // Access the route parameter 'id'
		});
		this.onGetTransaksi();
		this.onGet();
	}

	onGetTransaksi() {
		this.transaksiService
			.get(this.uuid)
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
			.subscribe((response: IResponseDetail<ITransaksiDetail>) => {
				this.idTransaksi = response.data.transactionID;
			});
	}

	onGet() {
		this.transaksiService
			.get(this.uuid)
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
			.subscribe((response: IResponseDetail<ITransaksiDetail>) => {
				this.idTransaksi = response.data.transactionID;
				const foundData = response.data.progress.find(
					(item) => item.transactionDetailID === parseInt(this.id)
				);

				if (foundData !== undefined) {
					this.progress.progress = foundData.progress;
					this.progress.note = foundData.note;
					this.progress.transactionID = response.data;
				}
			});
	}

	onSelectChange(selectedValue: string) {
		this.progress.progress = selectedValue;
	}

	onUpdate() {
		this.progress.transactionID = new TransaksiDetail();
		this.progress.transactionID.transactionID = this.idTransaksi;
		this.loadingIndicator = true;
		this.btnLoading = true;
		this.transaksiService
			.updateProgress(this.id, this.progress)
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
			.subscribe((response: IResponseDetail<ISendProgress>) => {
				this.router.navigate(["/transaction/detail/" + this.uuid]);
				Swal.fire({
					icon: "success",
					title: "Berhasil!",
					html: `Data Progress ${this.progress.progress} berhasil ditambahkan!`,
					showConfirmButton: false,
					timer: 1500,
				});
			});
	}
}
