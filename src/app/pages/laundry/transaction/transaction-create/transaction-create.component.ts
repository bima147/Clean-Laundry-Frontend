import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { IBarang } from "src/app/interfaces/i-barang";
import { ICustomer } from "src/app/interfaces/i-customer";
import {
	ICountListBarang,
	IItems,
	IOrder,
	IOrderDetail,
} from "src/app/interfaces/i-order";
import { IResponseDetail, IResponseList } from "src/app/interfaces/i-response";
import { ITransaksi } from "src/app/interfaces/i-transaksi";
import { IUser, IUserDetail } from "src/app/interfaces/i-user";
import { CustomerData, Order } from "src/app/models/order";
import { Transaksi } from "src/app/models/transaksi";
import { UserDetail } from "src/app/models/user";
import { BarangService } from "src/app/services/barang.service";
import { CustomerService } from "src/app/services/customer.service";
import { OrderService } from "src/app/services/order.service";
import { TransaksiService } from "src/app/services/transaksi.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-transaction-create",
	templateUrl: "./transaction-create.component.html",
	styleUrls: ["./transaction-create.component.scss"],
})
export class TransactionCreateComponent {
	orderForm!: FormGroup;
	// order: IOrder = new Order();
	nomorBarang: string = "";
	nomorCustomer: string = "";
	customerData: boolean = false;
	customer: IUserDetail = new UserDetail();
	customerNama: string = "";
	order: IOrder;
	paid = 0;
	return = 0;
	total = 0;

	constructor(
		private fb: FormBuilder,
		private barangService: BarangService,
		private customerService: CustomerService,
		private userService: UserService,
		private orderService: OrderService,
		private router: Router,
		private transaksiService: TransaksiService
	) {
		this.order = new Order(
			new CustomerData(this.customer.userID),
			[],
			false
		);
	}

	ngOnInit(): void {
		this.orderForm = this.fb.group({
			nomor: new FormControl("", [Validators.required]),
			tanggal: new FormControl("", [Validators.required]),
			dibayar: new FormControl("", [Validators.required]),
			total: new FormControl(0, [Validators.required]),
			customer: this.fb.group({
				nomor: new FormControl("", [
					Validators.required,
					Validators.maxLength(6),
					Validators.minLength(6),
				]),
				nama: new FormControl("", [Validators.required]),
				alamat: new FormControl("", [Validators.required]),
				telepon: new FormControl("", [Validators.required]),
			}),
			items: this.fb.array([]),
		});

		this.orderForm.valueChanges.subscribe((value: IOrder) => {
			this.order = value;
		});
	}

	newItemForm(barang: IBarang) {
		return this.fb.group({
			id: new FormControl(barang.barangID, [Validators.required]),
			nama: new FormControl(barang.nama, [Validators.required]),
			satuan: new FormControl(barang.satuan, [Validators.required]),
			harga: new FormControl(barang.harga, [Validators.required]),
			estimasi: new FormControl(barang.estimasi, [Validators.required]),
			qty: new FormControl(1, [Validators.required]),
			subtotal: new FormControl(barang.harga * 1, [Validators.required]),
		});
	}

	getItemsForm(): FormArray {
		return this.orderForm.get("items") as FormArray;
	}

	getItemForm(index: number): IItems {
		return this.getItemsForm().at(index).value;
	}

	// addItemForm(barang: IBarang) {
	// 	this.getItemsForm().push(this.newItemForm(barang));
	// }

	addItemForm(barang: IBarang) {
		const itemsFormArray = this.getItemsForm();

		// Check if the item already exists in the form array
		const existingItemIndex = itemsFormArray.value.findIndex(
			(item: IItems) => item.nama === barang.nama
		);

		if (existingItemIndex !== -1) {
			// Item already exists, update its quantity
			const existingItem = itemsFormArray.at(existingItemIndex);
			const currentQty = existingItem.get("qty")?.value + 1;
			const currentPrice = existingItem.get("harga")?.value;
			const subtotal = currentQty * currentPrice;
			existingItem.patchValue({ qty: currentQty });
			existingItem.patchValue({ subtotal: subtotal });
		} else {
			// Item does not exist, add it to the form array
			itemsFormArray.push(this.newItemForm(barang));
		}

		// Recalculate total
		this.calculateTotal();
	}

	updateCount() {
		this.return = this.paid - this.total;
	}

	onCreate() {
		let ltData: IOrderDetail[] = [];
		this.getItemsForm().value.forEach((item: ICountListBarang) => {
			const barang = {
				barangID: {
					barangID: item.id,
				},
				count: parseInt(item.qty),
			};
			ltData.push(barang);
		});
		this.order = new Order(
			new CustomerData(this.customer.userID),
			ltData,
			this.return >= 0 ? true : false
		);

		this.transaksiService
			.create(this.order)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					Swal.fire({
						title: "Error!",
						text:
							error.error.detail === null
								? "Terjadi kesalahan pada server kami!"
								: error.error.detail,
						icon: "error",
					});
					// this.error.detail = error.error.detail;
					return throwError(() => new Error("Someting wrong!"));
				})
			)
			.subscribe((value) => {
				this.router.navigate(["/transaction"]);
			});
	}

	onFindCustomer() {
		this.userService
			.getByPhone(this.nomorCustomer)
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
							error.error.error ==
							"Full authentication is required to access this resource"
						) {
							this.userService.signout();
						} else if (
							error.error.message === "DATA TIDAK DITEMUKAN" ||
							error.error.message === "User tidak terdaftar!"
						) {
							Swal.fire({
								title: "<strong>Tambah Pelanggan</strong>",
								icon: "info",
								html: `<iframe src="http://localhost:4200/customer/new" title="Add Customer - Clean Laundry" width="100%" height="300px" allowfullscreen frameBorder="0">`,
							});
						}
						this.nomorBarang = "";
					});
					// this.error.detail = error.error.detail;
					return throwError(() => new Error("Someting wrong!"));
				})
			)
			.subscribe((response: IResponseDetail<IUserDetail>) => {
				// this.orderForm
				// 	.get("customer")
				// 	?.patchValue(response.data.content, { eventEmit: true });
				this.customerData = true;
				this.customer = response.data;
				this.customerNama = response.data.namaLengkap.toUpperCase();
			});
	}

	onFindBarang(event: Event) {
		// Prevent the default behavior (form submission)
		event.preventDefault();

		// Call the method to find barang
		this.barangService
			.getByNama(this.nomorBarang)
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
					return throwError(() => new Error("Someting wrong!"));
				})
			)
			.subscribe((response: IResponseDetail<IBarang>) => {
				this.nomorBarang = "";
				this.addItemForm(response.data);
				this.calculateTotal();
			});
	}

	updateQtyForm(event: any, index: number) {
		const newQty = event.target.value;
		const itemsFormArray = this.getItemsForm();
		const itemForm = itemsFormArray.at(index);

		// Update the qty value in the form control
		itemForm.get("qty")?.patchValue(newQty);

		// Recalculate subtotal
		const harga = itemForm.get("harga")?.value;
		const subtotal = newQty * harga;
		itemForm.get("subtotal")?.patchValue(subtotal);

		// Recalculate total
		this.calculateTotal();
	}

	calculateTotal() {
		this.total = 0;
		// this.order.ltTransactionDetail.map((value: IItems) => {
		// 	total += value.subtotal;
		// });
		// this.orderForm.get("total")?.patchValue(total);
		this.getItemsForm().value.forEach((item: ICountListBarang) => {
			this.total += item.subtotal;
		});
		this.orderForm.get("total")?.patchValue(this.total);
	}
}
