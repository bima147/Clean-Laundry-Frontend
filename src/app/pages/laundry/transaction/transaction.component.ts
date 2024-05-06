import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { IResponseDetail, IResponseList } from "src/app/interfaces/i-response";
import { ITransaksi } from "src/app/interfaces/i-transaksi";
import { ResponseList } from "src/app/models/response";
import { LoadingService } from "src/app/services/loading.service";
import { TransaksiService } from "src/app/services/transaksi.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { IMenu } from "src/app/interfaces/i-menu";
import { IUser } from "src/app/interfaces/i-user";

@Component({
	selector: "app-transaction",
	templateUrl: "./transaction.component.html",
	styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
	listTransaksi: ITransaksi[] = [];

	filterArray: any[] = [
		{ label: "Nama", value: "nama" },
		{ label: "No. Telepon", value: "phone" },
		{ label: "Email", value: "email" },
	];

	filterLimit: any[] = [
		{ label: "10", value: 10 },
		{ label: "25", value: 25 },
		{ label: "100", value: 100 },
	];

	loadingIndicatorPaging: boolean = false;
	limit: number = 10;
	search: string = "";
	sort: string = this.transaksiService.SORT_ASC;
	sortBy: string = "id";
	filterBy: string = "nama";
	page: number = 0;
	totalPages: number = Math.ceil(this.listTransaksi.length / this.limit); // Total number of pages
	menu: IMenu[] = [];
	level: string = "Customer";

	daftarTransaksi: IResponseList<ITransaksi> = new ResponseList(
		this.filterBy,
		this.transaksiService.SORT_ASC,
		this.limit.toString()
	);

	constructor(
		private transaksiService: TransaksiService,
		private loadingService: LoadingService,
		public userService: UserService
	) {}

	ngOnInit(): void {
		this.onList();
		// throw new Error("Method not implemented.");
		// this.loadData();
	}

	onChangeLimit(selectedLimit: number) {
		this.limit = selectedLimit;
		this.onList();
	}

	onSelectChange(selectedValue: string) {
		this.filterBy = selectedValue;
	}

	get pages(): number[] {
		return Array(this.totalPages)
			.fill(0)
			.map((_, index) => index + 1);
	}

	goToPage(page: number) {
		if (page >= 0 && page <= this.totalPages + 1) {
			this.page = page;
			this.onList();
		}
	}

	onSearch() {
		this.loadingIndicatorPaging = true;
		this.loadingService.start();
		this.transaksiService
			.all(this.page, this.sort, this.sortBy, {
				filterBy: this.filterBy,
				value: this.search.toLowerCase(),
				size: this.limit,
			})
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
						this.search = "";
						this.loadingIndicatorPaging = false;
						this.loadingService.stop();
					});
					// this.error.detail = error.error.detail;
					return throwError(() => new Error("Someting wrong!"));
				})
			)
			.subscribe((response: IResponseList<ITransaksi>) => {
				this.totalPages = response.data.totalPages;
				this.daftarTransaksi = response;
				this.loadingIndicatorPaging = false;
				this.loadingService.stop();
				this.listTransaksi = this.daftarTransaksi.data.content;
			});
	}

	onList() {
		this.level = this.userService.getLevel();
		if (this.level === "Management") {
			this.loadingIndicatorPaging = true;
			this.loadingService.start();
			this.transaksiService
				.all(this.page, this.sort, this.sortBy, {
					filterBy: this.filterBy,
					value: this.search,
					size: this.limit,
				})
				.pipe(
					catchError((error: HttpErrorResponse) => {
						Swal.fire({
							title: "Error!",
							text:
								error.error.message === null
									? error.error.error
									: error.error.message,
							icon: "error",
						}).then(() => {
							if (
								error.error.error ===
								"Full authentication is required to access this resource"
							) {
								this.userService.signout();
							}
							this.search = "";
							this.loadingIndicatorPaging = false;
							this.loadingService.stop();
						});
						// this.error.detail = error.error.detail;
						return throwError(() => new Error("Someting wrong!"));
					})
				)
				.subscribe((response: IResponseList<ITransaksi>) => {
					this.totalPages = response.data.totalPages;
					this.daftarTransaksi = response;
					this.loadingIndicatorPaging = false;
					this.loadingService.stop();
					this.listTransaksi = this.daftarTransaksi.data.content;
				});
		} else {
			this.loadingIndicatorPaging = true;
			this.loadingService.start();
			this.transaksiService
				.allByCustomer(this.page, this.sort, this.sortBy, {
					filterBy: this.filterBy,
					value: this.search,
					size: this.limit,
				})
				.pipe(
					catchError((error: HttpErrorResponse) => {
						if (error.error.message !== "DATA TIDAK DITEMUKAN") {
							Swal.fire({
								title: "Error!",
								text:
									error.error.message === null
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
								this.search = "";
								this.loadingIndicatorPaging = false;
								this.loadingService.stop();
							});
						}
						// this.error.detail = error.error.detail;
						return throwError(() => new Error("Someting wrong!"));
					})
				)
				.subscribe((response: IResponseList<ITransaksi>) => {
					this.totalPages = response.data.totalPages;
					this.daftarTransaksi = response;
					this.loadingIndicatorPaging = false;
					this.loadingService.stop();
					this.listTransaksi = this.daftarTransaksi.data.content;
				});
		}
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
	// 			this.level = response.data.groupMenu;
	// 			this.userService.setName(response.data.namaLengkap);
	// 			// this.userService.setMenu(response.data.menu);
	// 			this.onList();
	// 		});
	// }
}
