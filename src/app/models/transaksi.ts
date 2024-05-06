import { IBarang, IBarangDetail } from "../interfaces/i-barang";
import { ICustomer } from "../interfaces/i-customer";
import { IPage } from "../interfaces/i-page";
import { IProgress } from "../interfaces/i-progress";
import { IResponseList } from "../interfaces/i-response";
import {
	ISendTransaksiSub,
	ITransaksi,
	ITransaksiBarang,
	ITransaksiDetail,
	ITransaksiDetailGeneral,
} from "../interfaces/i-transaksi";
import { Customer } from "./customer";

export class Transaksi implements ITransaksi {
	createdAt: number = 0;
	transactionUUID?: string | undefined = "";
	customer: ICustomer = new Customer();
	done: boolean = false;
	taken: boolean = false;
	paid: boolean = false;
}

export class TransaksiDetail implements ITransaksiDetail {
	transactionID: number = 0;
	progress: IProgress[] = [];
	customer: string = "";
	total: number = 0;
	createdAt: number = 0;
	createdBy: string = "";
	updatedBy: string | undefined = "";
	barang: ITransaksiBarang[] = [];
	done: boolean = false;
	taken: boolean = false;
	paid: boolean = false;
}

export class TransaksiBarang implements ITransaksiBarang {
	barangID: IBarangDetail = {} as IBarangDetail;
	count: number = 0;
	subtotal: number = 0;
	note: any;
	createdBy: number = 0;
	updatedBy: number | undefined = 0;
	createdAt: number = 0;
	updatedAt: number | undefined = 0;
}

export class TransaksiDetailGeneral implements ITransaksiDetailGeneral {
	transactionID: number = 0;
	Customer: string = "";
	total: number = 0;
	creaatedAt: number = 0;
	createdBy: string = "";
	updatedBy: string | null = "";
	barang: IBarang[] = [];
	progress: IProgress[] = [];
	done: boolean | null = false;
	taken: boolean | null = false;
	paid: boolean | null = false;
}

export class SendTransaksiSub implements ISendTransaksiSub {
	transactionID: number = 0;
}
