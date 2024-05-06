import { IMenu, IMenuUser } from "../interfaces/i-menu";
import { IUser, IUserDetail } from "../interfaces/i-user";

export class User implements IUser {
	namaLengkap: string = "";
	alamat: string = "";
	tanggalLahir: string = "";
	noHp: number = 0;
	username: string = "";
	email: string = "";
	groupMenu: string = "";
	menu: IMenuUser[] = [];
	active: boolean = false;
}

export class UserDetail implements IUserDetail {
	userID: number = 0;
	namaLengkap: string = "";
	alamat: string = "";
	tanggalLahir: string = "";
	noHp: number = 0;
	username: string = "";
	email: string = "";
	groupMenu: string = "";
	menu: IMenuUser[] = [];
	active: boolean = false;
}
