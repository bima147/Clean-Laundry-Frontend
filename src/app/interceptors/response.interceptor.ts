// hide-response.interceptor.ts

import { Injectable } from "@angular/core";
import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpEvent,
	HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					// Replace the response with a placeholder
					event = new HttpResponse({ status: 200, body: {} });
				}
			})
		);
	}
}
