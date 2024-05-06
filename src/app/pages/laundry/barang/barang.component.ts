import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { IBarang } from "src/app/interfaces/i-barang";
import { IResponseList } from "src/app/interfaces/i-response";
import { ResponseList } from "src/app/models/response";
import { BarangService } from "src/app/services/barang.service";
import { LoadingService } from "src/app/services/loading.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-barang",
	templateUrl: "./barang.component.html",
	styleUrls: ["./barang.component.scss"],
})
export class BarangComponent {
	displayedColumns: string[] = [
		"barangID",
		"estimasi",
		"harga",
		"nama",
		"satuan",
	];
	listBarang: IBarang[] = [];

	daftarBarang: IResponseList<IBarang> = new ResponseList("nama", "asc", "5");

	loadingIndicatorPaging: boolean = false;
	limit: number = 10;
	search: string = "";
	sortBy: string = "id";
	sort: number = 1;
	filterBy: string = "nama";
	page: number = 0;

	totalPages: number = Math.ceil(this.listBarang.length / this.limit); // Total number of pages

	constructor(
		// private messageService: MessageService,
		private barangService: BarangService,
		private loadingService: LoadingService,
		private userService: UserService
	) {
		this.onList();
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
		this.barangService
			.all(this.page, this.barangService.SORT_ASC, this.sortBy, {
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
			.subscribe((response: IResponseList<IBarang>) => {
				this.totalPages = response.data.totalPages;
				this.daftarBarang = response;
				this.loadingIndicatorPaging = false;
				this.loadingService.stop();
				this.listBarang = this.daftarBarang.data.content;
			});
	}

	onList(sort: string = this.barangService.SORT_ASC, sortBy: string = "id") {
		this.loadingIndicatorPaging = true;
		this.loadingService.start();
		this.barangService
			.all(this.page, sort, sortBy, {
				filterBy: this.filterBy,
				value: this.search,
				size: this.limit,
			})
			.pipe(catchError(this.handleError.bind(this)))
			.subscribe((response: IResponseList<IBarang>) => {
				this.totalPages = response.data.totalPages;
				this.daftarBarang = response;
				this.loadingIndicatorPaging = false;
				this.loadingService.stop();
				this.listBarang = this.daftarBarang.data.content;
			});
	}

	onDelete(id: number | undefined, name: string) {
		this.loadingIndicatorPaging = true;
		this.loadingService.start();
		Swal.fire({
			title: "Apakah anda yakin?",
			html: `Kamu akan menghapus data ${name} selamanya!`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Ya, Hapus!",
			cancelButtonText: "Batal",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				this.barangService
					.delete(id)
					.pipe(
						catchError((error: HttpErrorResponse) => {
							Swal.fire({
								title: "Error!",
								text:
									error.error.message === null
										? error.error.message
										: error.error.error,
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
							return throwError(
								() => new Error("Someting wrong!")
							);
						})
					)
					.subscribe(() => {
						this.onList();
						Swal.fire({
							title: "Berhasil!",
							html: `Data barang ${name} berhasil dihapus.`,
							icon: "success",
						});
					});
			}
		});
	}

	onSuccessUpdate(barang: IBarang) {
		this.onList();
	}

	handleError(error: HttpErrorResponse) {
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
		return throwError(() => new Error("Something wrong!"));
	}
}
