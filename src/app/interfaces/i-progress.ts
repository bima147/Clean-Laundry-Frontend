import { ISendTransaksiSub, ITransaksiDetail } from "./i-transaksi";

export interface ISendProgress {
	transactionID: ISendTransaksiSub;
	progress: string;
	note: string;
}

export interface IProgress {
	createdAt: number;
	createdBy: number;
	note: string;
	progress: string;
	transactionDetailID: number;
	updatedAt: number | null;
	updatedBy: number | null;
}
