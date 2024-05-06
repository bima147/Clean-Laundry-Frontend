import { IMenu, IMenuUser } from "./i-menu";

export interface IUser {
	namaLengkap: string;
	alamat: string;
	tanggalLahir: string;
	noHp: number;
	username: string;
	email: string;
	groupMenu: string;
	menu: IMenuUser[];
	active: boolean;
}

export interface IUserDetail extends IUser {
	userID: number;
}
