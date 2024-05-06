import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { environment } from "src/environments/environment.development";
import { IResponseDetail, IResponseList } from "../interfaces/i-response";
import {
	ITransaksi,
	ITransaksiDetail,
	ITransaksiDetailGeneral,
} from "../interfaces/i-transaksi";
import { Observable } from "rxjs";
import { IOrder } from "../interfaces/i-order";
import { IProgress, ISendProgress } from "../interfaces/i-progress";

@Injectable({
	providedIn: "root",
})
export class TransaksiService {
	baseUrl: string = environment.baseUrl;
	keyToken: string = "token";
	public SORT_ASC = "asc";
	public SORT_DESC = "desc";

	constructor(private http: HttpClient, private userService: UserService) {}

	all(
		page: number = 0,
		sort: string = "",
		sortBy: string = "id",
		params: any = {}
	): Observable<IResponseList<ITransaksi>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};
		let url: string = `${environment.baseUrl}/api/v1/transaction/list/${page}/`;
		url += sort ? sort : this.SORT_ASC;
		url += `/${sortBy}`;

		return this.http.get<IResponseList<ITransaksi>>(url, {
			headers,
			params,
		});
	}

	allByCustomer(
		page: number = 0,
		sort: string = "",
		sortBy: string = "id",
		params: any = {}
	): Observable<IResponseList<ITransaksi>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};
		let url: string = `${environment.baseUrl}/api/v1/transaction/customer/list/${page}/`;
		url += sort ? sort : this.SORT_ASC;
		url += `/${sortBy}`;

		return this.http.get<IResponseList<ITransaksi>>(url, {
			headers,
			params,
		});
	}

	create(transaksi: IOrder): Observable<IResponseDetail<ITransaksi>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.post<IResponseDetail<ITransaksi>>(
			`${environment.baseUrl}/api/v1/transaction/create`,
			JSON.stringify(transaksi),
			{
				headers,
			}
		);
	}

	get(id: string): Observable<IResponseDetail<ITransaksiDetail>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.get<IResponseDetail<ITransaksiDetail>>(
			`${environment.baseUrl}/api/v1/transaction/find-detail/${id}`,
			{
				headers,
			}
		);
	}

	getGeneral(
		id: string
	): Observable<IResponseDetail<ITransaksiDetailGeneral>> {
		const headers = {
			"Content-Type": "application/json",
		};

		return this.http.get<IResponseDetail<ITransaksiDetailGeneral>>(
			`${environment.baseUrl}/api/v1/transaction/general/find-detail/${id}`,
			{
				headers,
			}
		);
	}

	update(
		id: string,
		transaksi: ITransaksi
	): Observable<IResponseDetail<ITransaksi>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.put<IResponseDetail<ITransaksi>>(
			`${environment.baseUrl}/api/v1/transaction/update/${id}`,
			JSON.stringify(transaksi),
			{
				headers,
			}
		);
	}

	delete(id: number | undefined): Observable<ITransaksi> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.delete<ITransaksi>(
			`${environment.baseUrl}/api/v1/transaction/delete/${id}`,
			{
				headers,
			}
		);
	}

	// Progress
	createProgress(
		progress: ISendProgress
	): Observable<IResponseDetail<ISendProgress>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.post<IResponseDetail<ISendProgress>>(
			`${environment.baseUrl}/api/v1/transaction-progress/create`,
			JSON.stringify(progress),
			{
				headers,
			}
		);
	}

	updateProgress(
		id: string,
		progress: ISendProgress
	): Observable<IResponseDetail<ISendProgress>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.put<IResponseDetail<ISendProgress>>(
			`${environment.baseUrl}/api/v1/transaction-progress/update/${id}`,
			JSON.stringify(progress),
			{
				headers,
			}
		);
	}
}
