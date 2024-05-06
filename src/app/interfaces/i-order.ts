import { IBarang } from "./i-barang";
import { ICustomer } from "./i-customer";

export interface IItems extends IBarang {
	qty: number;
	subtotal: number;
}

// export interface IOrder {
// 	readonly _id?: string;
// 	nomor: string;
// 	customer: ICustomer;
// 	tanggal: string;
// 	dibayar: number;
// 	total: number;
// 	items: IItems[];
// }

export interface IOrder {
	customer: ICustomerID;
	ltTransactionDetail: IOrderDetail[];
	paid: boolean;
}

export interface ICustomerID {
	userID: number;
}

export interface IOrderDetail {
	barangID: ISendOrder;
	count: number;
}

export interface ISendOrder {
	barangID: number;
}

export interface ICountListBarang {
	estimasi: number;
	harga: number;
	id: number;
	nama: string;
	qty: string;
	satuan: string;
	subtotal: number;
}
