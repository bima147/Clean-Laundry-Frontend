import { Customer } from "../models/customer";
import { IBarang, IBarangDetail } from "./i-barang";
import { ICustomer } from "./i-customer";
import { IProgress } from "./i-progress";

export interface ITransaksi {
	readonly transactionUUID?: string;
	customer: ICustomer;
	done: boolean;
	taken: boolean;
	paid: boolean;
	createdAt: number;
}

export interface ITransaksiDetail {
	transactionID: number;
	customer: string;
	total: number;
	createdBy: string;
	createdAt: number;
	updatedBy: string | undefined;
	barang: ITransaksiBarang[];
	done: boolean;
	taken: boolean;
	paid: boolean;
	progress: IProgress[];
}

export interface ITransaksiBarang {
	readonly transactionDetailID?: number;
	barangID: IBarangDetail;
	count: number;
	subtotal: number;
	note: any;
	createdBy: number;
	updatedBy: number | undefined;
	createdAt: number;
	updatedAt: number | undefined;
}

export interface ITransaksiDetailGeneral {
	transactionID: number;
	Customer: string;
	total: number;
	creaatedAt: number;
	createdBy: string;
	updatedBy: string | null;
	barang: IBarang[];
	progress: IProgress[];
	done: boolean | null;
	taken: boolean | null;
	paid: boolean | null;
}

export interface ISendTransaksiSub {
	transactionID: number | undefined;
}
