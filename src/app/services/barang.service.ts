import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.development";
import { IResponseDetail, IResponseList } from "../interfaces/i-response";
import { IBarang } from "../interfaces/i-barang";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
	providedIn: "root",
})
export class BarangService {
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
	): Observable<IResponseList<IBarang>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};
		let url: string = `${environment.baseUrl}/api/v1/barang/list/${page}/`;
		url += sort ? sort : this.SORT_ASC;
		url += `/${sortBy}`;

		return this.http.get<IResponseList<IBarang>>(url, {
			headers,
			params,
		});
	}

	create(barang: IBarang): Observable<IResponseDetail<IBarang>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.post<IResponseDetail<IBarang>>(
			`${environment.baseUrl}/api/v1/barang/create`,
			JSON.stringify(barang),
			{
				headers,
			}
		);
	}

	get(id: string): Observable<IResponseDetail<IBarang>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.get<IResponseDetail<IBarang>>(
			`${environment.baseUrl}/api/v1/barang/find-detail/${id}`,
			{
				headers,
			}
		);
	}

	getByNama(nama: string): Observable<IResponseDetail<IBarang>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.get<IResponseDetail<IBarang>>(
			`${environment.baseUrl}/api/v1/barang/find-detail-nama/${nama}`,
			{
				headers,
			}
		);
	}

	update(id: string, barang: IBarang): Observable<IResponseDetail<IBarang>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.put<IResponseDetail<IBarang>>(
			`${environment.baseUrl}/api/v1/barang/update/${id}`,
			JSON.stringify(barang),
			{
				headers,
			}
		);
	}

	delete(id: number | undefined): Observable<IBarang> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.delete<IBarang>(
			`${environment.baseUrl}/api/v1/barang/delete/${id}`,
			{
				headers,
			}
		);
	}
}
