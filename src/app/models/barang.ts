import { IBarang } from "../interfaces/i-barang";
import { IPage } from "../interfaces/i-page";
import { IResponseDetail, IResponseList } from "../interfaces/i-response";
import { Page } from "./page";

export class Barang implements IBarang {
	barangID?: number | undefined;
	nama: string = "";
	satuan: string = "";
	harga: number = 0;
	estimasi: number = 0;
}
