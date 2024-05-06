import { IBarang } from "../interfaces/i-barang";
import { ICustomer } from "../interfaces/i-customer";
import {
	ICustomerID,
	IItems,
	IOrder,
	IOrderDetail,
	ISendOrder,
} from "../interfaces/i-order";
import { Customer } from "./customer";

// export class Order implements IOrder {
// 	_id?: string | undefined = "";
// 	nomor: string = "";
// 	customer: ICustomer = new Customer();
// 	tanggal: string = "";
// 	dibayar: number = 0;
// 	total: number = 0;
// 	items: IItems[] = [];
// }

export class Order implements IOrder {
	constructor(
		public customer: ICustomerID,
		public ltTransactionDetail: IOrderDetail[],
		public paid: boolean
	) {}
}

export class CustomerData implements ICustomerID {
	constructor(public userID: number) {}
}

export class OrderDetail implements IOrderDetail {
	constructor(public barangID: SendOrder, public count: number) {}
}

export class SendOrder implements ISendOrder {
	barangID: number = 0;
}
