export interface IBarang {
	readonly barangID?: number | undefined;
	nama: string;
	satuan: string;
	harga: number;
	estimasi: number;
}

export interface IBarangDetail {
	barangID: number;
	nama: string;
	satuan: string;
	harga: number;
	estimasi: number;
	createdBy: number;
	updatedBy: number | undefined;
	createdAt: number;
	updatedAt: number | undefined;
	active: boolean;
}
