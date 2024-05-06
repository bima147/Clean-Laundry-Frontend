import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IData, IDataResponse, ISignin } from "../interfaces/i-signin";
import { IForgotPassword } from "../interfaces/i-forgot-password";
import { environment } from "src/environments/environment.development";
import { IResponseDetail } from "../interfaces/i-response";
import { IUser, IUserDetail } from "../interfaces/i-user";
import { User } from "../models/user";
import { ResponseDetails } from "../models/response";
import { IMenu, IMenuUser } from "../interfaces/i-menu";
import { Menu } from "../models/menu";

@Injectable({
	providedIn: "root",
})
export class UserService {
	isLoggedIn: boolean = false;
	baseUrl: string = environment.baseUrl;
	keyToken: string = "token";
	name: string = "";
	level: string = "";

	constructor(private http: HttpClient, private router: Router) {}

	signin(user: ISignin): Observable<IDataResponse> {
		const headers = {
			"Content-Type": "application/json",
		};
		const body = JSON.stringify(user);

		return this.http.post<IDataResponse>(
			`${this.baseUrl}/api/v1/users/auth/login`,
			body,
			{
				headers,
			}
		);
	}

	forgot(user: IForgotPassword): Observable<IDataResponse> {
		const headers = {
			"Content-Type": "application/json",
		};
		const body = JSON.stringify(user);

		return this.http.post<IDataResponse>(
			`${this.baseUrl}/api/v1/users/auth/forgot-password`,
			body
		);
	}

	getData(): Observable<IResponseDetail<IUser>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.getToken()}`,
		};

		return this.http.get<IResponseDetail<IUser>>(
			`${this.baseUrl}/api/v1/users/get-data`,
			{
				headers,
			}
		);
	}

	getByPhone(phone: string): Observable<IResponseDetail<IUserDetail>> {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${this.getToken()}`,
		};

		return this.http.get<IResponseDetail<IUserDetail>>(
			`${environment.baseUrl}/api/v1/users/find/${phone}`,
			{
				headers,
			}
		);
	}

	setAuthentication(response: IData) {
		localStorage.setItem(this.keyToken, response.token);
		this.isLoggedIn = true;
	}

	isAuthenticated(): boolean {
		if (localStorage.getItem(this.keyToken)) {
			this.isLoggedIn = true;
			return this.isLoggedIn;
		}
		return false;
	}

	setName(name: string) {
		this.name = name;
	}

	getName(): string {
		return this.name;
	}

	setLevel(level: string) {
		this.level = level;
	}

	getLevel(): string {
		return this.level;
	}

	getToken(): string {
		return localStorage.getItem(this.keyToken) || "";
	}

	signout(): void {
		localStorage.removeItem(this.keyToken);
		this.router.navigate(["authentication/login"]);
		this.isLoggedIn = false;
	}
}
