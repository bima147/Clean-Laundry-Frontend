import { IPage } from "../interfaces/i-page";
import { IResponseDetail, IResponseList } from "../interfaces/i-response";
import { Page } from "./page";

export class ResponseList<T> implements IResponseList<T> {
	data: IPage<T>;
	success: boolean;
	message: string;
	status: number;
	timestamp: number;

	constructor(filterBy: string, sort: string, value: string) {
		this.data = new Page<T>(filterBy, sort, value);
		this.success = false;
		this.message = "";
		this.status = 200;
		this.timestamp = 0;
	}
}

export class ResponseDetails<T> implements IResponseDetail<T> {
	data: T;
	success: boolean;
	message: string;
	status: number;
	timestamp: number;

	constructor() {
		this.data = {} as T;
		this.success = false;
		this.message = "";
		this.status = 200;
		this.timestamp = 0;
	}
}
