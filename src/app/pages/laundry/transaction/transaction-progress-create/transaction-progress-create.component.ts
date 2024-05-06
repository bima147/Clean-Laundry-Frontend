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
	selector: "app-transaction-progress-create",
	templateUrl: "./transaction-progress-create.component.html",
	styleUrls: ["./transaction-progress-create.component.scss"],
})
export class TransactionProgressCreateComponent implements OnInit {
	uuid: string = "";
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
	) {
		this.progress.progress = "Diproses";
	}

	onSelectChange(selectedValue: string) {
		this.progress.progress = selectedValue;
	}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.uuid = params["uuid"]; // Access the route parameter 'id'
		});
		this.onGet();
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
			});
	}

	onAdd() {
		this.progress.transactionID.transactionID = this.idTransaksi;
		this.loadingIndicator = true;
		this.btnLoading = true;
		this.transaksiService
			.createProgress(this.progress)
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
