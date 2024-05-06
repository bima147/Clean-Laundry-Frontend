import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";
import { IResponseDetail, IResponseList } from "../interfaces/i-response";
import { ICustomer } from "../interfaces/i-customer";

@Injectable({
	providedIn: "root",
})
export class CustomerService {
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
	): Observable<IResponseList<ICustomer>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};
		let url: string = `${environment.baseUrl}/api/v1/users/list/${page}/`;
		url += sort ? sort : this.SORT_ASC;
		url += `/${sortBy}`;

		return this.http.get<IResponseList<ICustomer>>(url, {
			headers,
			params,
		});
	}

	create(customer: ICustomer): Observable<IResponseDetail<ICustomer>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.post<IResponseDetail<ICustomer>>(
			`${environment.baseUrl}/api/v1/customer/add`,
			JSON.stringify(customer),
			{
				headers,
			}
		);
	}

	get(id: string): Observable<IResponseDetail<ICustomer>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.get<IResponseDetail<ICustomer>>(
			`${environment.baseUrl}/api/v1/users/find-detail/${id}`,
			{
				headers,
			}
		);
	}

	update(
		id: string,
		customer: ICustomer
	): Observable<IResponseDetail<ICustomer>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.put<IResponseDetail<ICustomer>>(
			`${environment.baseUrl}/api/v1/users/update/${id}`,
			JSON.stringify(customer),
			{
				headers,
			}
		);
	}

	delete(id: number | undefined): Observable<ICustomer> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.userService.getToken()}`,
		};

		return this.http.delete<ICustomer>(
			`${environment.baseUrl}/api/v1/users/delete/${id}`,
			{
				headers,
			}
		);
	}
}
