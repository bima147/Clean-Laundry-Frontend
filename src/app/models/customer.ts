import { ICustomer } from "../interfaces/i-customer";

export class Customer implements ICustomer {
	customerID: number = 0;
	namaLengkap: string = "";
	alamat: string | undefined = "";
	tanggalLahir: string | undefined = "";
	noHp: string = "";
	username: string | undefined = "";
	email: string = "";
	token: string | undefined = "";
	password: string | undefined = "";
	createdBy: number = 0;
	active: boolean = false;
}
