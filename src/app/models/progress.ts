import { IProgress, ISendProgress } from "../interfaces/i-progress";
import { ISendTransaksiSub, ITransaksiDetail } from "../interfaces/i-transaksi";
import { SendTransaksiSub, TransaksiDetail } from "./transaksi";

export class Progress implements IProgress {
	createdAt: number = 0;
	createdBy: number = 0;
	note: string = "";
	progress: string = "";
	transactionDetailID: number = 0;
	updatedAt: number | null = 0;
	updatedBy: number | null = 0;
}

export class SendProgress implements ISendProgress {
	transactionID: ISendTransaksiSub = new SendTransaksiSub();
	progress: string = "";
	note: string = "";
}
