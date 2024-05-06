import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { UserService } from "./user.service";
import { Observable } from "rxjs";
import { IResponseDetail, IResponseList } from "../interfaces/i-response";
import { IMenu, IMenuUser, ISendMenu } from "../interfaces/i-menu";

@Injectable({
	providedIn: "root",
})
export class MenuService {
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
	): Observable<IResponseList<IMenuUser>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};
		let url: string = `${environment.baseUrl}/api/v1/menu/list/${page}/`;
		url += sort ? sort : this.SORT_ASC;
		url += `/${sortBy}`;

		return this.http.get<IResponseList<IMenuUser>>(url, {
			headers,
			params,
		});
	}

	create(menu: ISendMenu): Observable<IResponseDetail<ISendMenu>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.post<IResponseDetail<ISendMenu>>(
			`${environment.baseUrl}/api/v1/menu/create`,
			JSON.stringify(menu),
			{
				headers,
			}
		);
	}

	get(id: string): Observable<IResponseDetail<IMenu>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.get<IResponseDetail<IMenu>>(
			`${environment.baseUrl}/api/v1/menu/find-detail/${id}`,
			{
				headers,
			}
		);
	}

	getByNama(nama: string): Observable<IResponseDetail<IMenu>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.get<IResponseDetail<IMenu>>(
			`${environment.baseUrl}/api/v1/menu/find-detail-nama/${nama}`,
			{
				headers,
			}
		);
	}

	update(id: number, menu: IMenu): Observable<IResponseDetail<IMenu>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.put<IResponseDetail<IMenu>>(
			`${environment.baseUrl}/api/v1/menu/update/${id}`,
			JSON.stringify(menu),
			{
				headers,
			}
		);
	}

	delete(id: number | undefined): Observable<IMenu> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.delete<IMenu>(
			`${environment.baseUrl}/api/v1/menu/delete/${id}`,
			{
				headers,
			}
		);
	}
}
