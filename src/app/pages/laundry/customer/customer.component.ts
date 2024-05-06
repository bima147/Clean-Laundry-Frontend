import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ICustomer } from "src/app/interfaces/i-customer";
import { IResponseList } from "src/app/interfaces/i-response";
import { ResponseList } from "src/app/models/response";
import { CustomerService } from "src/app/services/customer.service";
import { LoadingService } from "src/app/services/loading.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-customer",
	templateUrl: "./customer.component.html",
	styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent {
	listCustomer: ICustomer[] = [];

	filterArray: any[] = [
		{ label: "Nama", value: "nama" },
		{ label: "No. Telepon", value: "phone" },
		{ label: "Email", value: "email" },
	];

	loadingIndicatorPaging: boolean = false;
	limit: number = 10;
	search: string = "";
	sortBy: string = "id";
	sort: string = this.customerService.SORT_ASC;
	filterBy: string = "nama";
	page: number = 0;
	totalPages: number = Math.ceil(this.listCustomer.length / this.limit); // Total number of pages

	daftarCustomer: IResponseList<ICustomer> = new ResponseList(
		this.filterBy,
		this.customerService.SORT_ASC,
		this.limit.toString()
	);

	constructor(
		// private messageService: MessageService,
		private customerService: CustomerService,
		private loadingService: LoadingService,
		private userService: UserService
	) {
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
		this.customerService
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
			.subscribe((response: IResponseList<ICustomer>) => {
				this.totalPages = response.data.totalPages;
				this.daftarCustomer = response;
				this.loadingIndicatorPaging = false;
				this.loadingService.stop();
				this.listCustomer = this.daftarCustomer.data.content;
			});
	}

	onList() {
		this.loadingIndicatorPaging = true;
		this.loadingService.start();
		this.customerService
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
			.subscribe((response: IResponseList<ICustomer>) => {
				this.totalPages = response.data.totalPages;
				this.daftarCustomer = response;
				this.loadingIndicatorPaging = false;
				this.loadingService.stop();
				this.listCustomer = this.daftarCustomer.data.content;
			});
	}
}
