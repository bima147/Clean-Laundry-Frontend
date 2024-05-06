import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IResponseDetail } from "src/app/interfaces/i-response";
import { ITransaksiDetail } from "src/app/interfaces/i-transaksi";
import { TransaksiDetail } from "src/app/models/transaksi";
import { LoadingService } from "src/app/services/loading.service";
import { TransaksiService } from "src/app/services/transaksi.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-transaction-details",
	templateUrl: "./transaction-details.component.html",
	styleUrls: ["./transaction-details.component.scss"],
})
export class TransactionDetailsComponent implements OnInit {
	uuid: string = "";
	transaksi: ITransaksiDetail = new TransaksiDetail();
	loadingIndicator: boolean = false;
	btnLoading: boolean = false;
	errorNama: string = "";
	errorSatuan: string = "";
	errorHarga: string = "";
	errorEstimasi: string = "";

	constructor(
		private transaksiService: TransaksiService,
		private loadingService: LoadingService,
		public userService: UserService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.uuid = params["uuid"]; // Access the route parameter 'id'
			this.onGet();
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
				this.transaksi = response.data;
			});
	}

	convertDateTime(timestamp: number) {
		// Create a new Date object with the timestamp
		let date = new Date(timestamp);

		// Get the date components
		let year = date.getFullYear();
		let month = date.getMonth() + 1; // Month is zero-based, so we add 1
		let day = date.getDate();

		// Get the time components
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();

		// Format the date and time as desired (e.g., YYYY-MM-DD HH:MM:SS)
		let formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
			.toString()
			.padStart(2, "0")}`;
		let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}`;

		// Combine date and time
		let formattedDateTime = `${formattedDate} [${formattedTime}]`;

		return formattedDateTime; // Output: "2022-04-30 14:22:37"
	}
}
