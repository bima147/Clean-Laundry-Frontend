import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IResponseDetail } from "src/app/interfaces/i-response";
import {
	ITransaksiDetail,
	ITransaksiDetailGeneral,
} from "src/app/interfaces/i-transaksi";
import { TransaksiDetailGeneral } from "src/app/models/transaksi";
import { LoadingService } from "src/app/services/loading.service";
import { TransaksiService } from "src/app/services/transaksi.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-track-detail",
	templateUrl: "./track-detail.component.html",
	styleUrls: ["./track-detail.component.scss"],
})
export class TrackDetailComponent implements OnInit {
	uuid: string = "";
	transaksi: ITransaksiDetailGeneral;

	constructor(
		private transaksiService: TransaksiService,
		private loadingService: LoadingService,
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.transaksi = new TransaksiDetailGeneral();
	}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.uuid = params["uuid"]; // Access the route parameter 'id'
			this.onGet();
		});
	}

	onGet() {
		this.transaksiService
			.getGeneral(this.uuid)
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
			.subscribe((response: IResponseDetail<ITransaksiDetailGeneral>) => {
				this.transaksi = response.data;
			});
	}

	trackData() {
		this.transaksiService
			.getGeneral(this.uuid)
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
			.subscribe((response: IResponseDetail<ITransaksiDetailGeneral>) => {
				this.transaksi = response.data;
			});
	}

	onTrack() {
		console.log(this.uuid);
		this.router.navigate(["/track/" + this.uuid]);
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
		let formattedDateTime = `${formattedDate} ${formattedTime}`;

		return formattedDateTime; // Output: "2022-04-30 14:22:37"
	}
}
