import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { IMenu, IMenuUser } from "src/app/interfaces/i-menu";
import { IResponseList } from "src/app/interfaces/i-response";
import { ResponseList } from "src/app/models/response";
import { LoadingService } from "src/app/services/loading.service";
import { MenuService } from "src/app/services/menu.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {
	displayedColumns: string[] = [
		"menuID",
		"estimasi",
		"harga",
		"nama",
		"satuan",
	];
	listMenu: IMenuUser[] = [];

	daftarMenu: IResponseList<IMenuUser> = new ResponseList("nama", "asc", "5");
	filterLimit: any[] = [
		{ label: "10", value: 10 },
		{ label: "25", value: 25 },
		{ label: "100", value: 100 },
	];

	loadingIndicatorPaging: boolean = false;
	limit: number = 10;
	search: string = "";
	sortBy: string = "id";
	sort: number = 1;
	filterBy: string = "nama";
	page: number = 0;

	totalPages: number = Math.ceil(this.listMenu.length / this.limit); // Total number of pages

	constructor(
		// private messageService: MessageService,
		private menuService: MenuService,
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
		this.menuService
			.all(this.page, this.menuService.SORT_ASC, this.sortBy, {
				filterBy: this.search === "" ? "" : "nama",
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
							error.error.error ===
								"Full authentication is required to access this resource" ||
							error.error.message === "Anda tidak punya akses!"
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
			.subscribe((response: IResponseList<IMenuUser>) => {
				console.log("masuk");

				this.totalPages = response.data.totalPages;
				this.daftarMenu = response;
				this.loadingIndicatorPaging = false;
				this.loadingService.stop();
				this.listMenu = this.daftarMenu.data.content;
			});
	}

	onList(sort: string = this.menuService.SORT_ASC, sortBy: string = "id") {
		this.loadingIndicatorPaging = true;
		this.loadingService.start();
		this.menuService
			.all(this.page, sort, sortBy, {
				filterBy: this.search === "" ? "" : this.filterBy,
				value: this.search,
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
			.subscribe((response: IResponseList<IMenuUser>) => {
				this.totalPages = response.data.totalPages;
				this.daftarMenu = response;
				this.loadingIndicatorPaging = false;
				this.loadingService.stop();
				this.listMenu = this.daftarMenu.data.content;
			});
	}

	onDelete(id: number | undefined, name: string | null) {
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
				this.menuService
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
							html: `Data menu ${name} berhasil dihapus.`,
							icon: "success",
						});
					});
			}
		});
	}

	onSuccessUpdate(menu: IMenu) {
		this.onList();
	}

	onChangeLimit(selectedLimit: number) {
		this.limit = selectedLimit;
		this.onList();
	}
}
