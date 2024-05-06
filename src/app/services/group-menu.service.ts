import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { UserService } from "./user.service";
import { IResponseDetail, IResponseList } from "../interfaces/i-response";
import { Observable } from "rxjs";
import { IGroupDetail, IGroupMenu } from "../interfaces/i-group-menu";

@Injectable({
	providedIn: "root",
})
export class GroupMenuService {
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
	): Observable<IResponseList<IGroupDetail>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};
		let url: string = `${environment.baseUrl}/api/v1/group-menu/list/${page}/`;
		url += sort ? sort : this.SORT_ASC;
		url += `/${sortBy}`;

		return this.http.get<IResponseList<IGroupDetail>>(url, {
			headers,
			params,
		});
	}

	create(groupMenu: IGroupMenu): Observable<IResponseDetail<IGroupMenu>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.post<IResponseDetail<IGroupMenu>>(
			`${environment.baseUrl}/api/v1/group-menu/create`,
			JSON.stringify(groupMenu),
			{
				headers,
			}
		);
	}

	get(id: string): Observable<IResponseDetail<IGroupDetail>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.get<IResponseDetail<IGroupDetail>>(
			`${environment.baseUrl}/api/v1/group-menu/find-detail/${id}`,
			{
				headers,
			}
		);
	}

	getByNama(nama: string): Observable<IResponseDetail<IGroupMenu>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.get<IResponseDetail<IGroupMenu>>(
			`${environment.baseUrl}/api/v1/group-menu/find-detail-nama/${nama}`,
			{
				headers,
			}
		);
	}

	update(
		id: number,
		groupMenu: IGroupMenu
	): Observable<IResponseDetail<IGroupMenu>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.put<IResponseDetail<IGroupMenu>>(
			`${environment.baseUrl}/api/v1/group-menu/update/${id}`,
			JSON.stringify(groupMenu),
			{
				headers,
			}
		);
	}

	delete(id: number | undefined): Observable<IGroupMenu> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.delete<IGroupMenu>(
			`${environment.baseUrl}/api/v1/group-menu/delete/${id}`,
			{
				headers,
			}
		);
	}
}
