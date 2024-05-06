import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading: boolean = false;

  constructor() {}

  isLoading() {
    return this.loading;
  }

  toggleLoading() {
    this.loading = !this.loading;
  }

  start() {
    this.loading = true;
  }

  stop() {
    this.loading = false;
  }
}
