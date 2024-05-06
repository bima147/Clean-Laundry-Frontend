import { IPage } from '../interfaces/i-page';

export class Page<T> implements IPage<T> {
  nextPage: any;
  previousPage: any;
  totalItems: number;
  numberOfElements: number;
  totalPages: number;
  filterBy: string;
  sort: string;
  componentFilter: any;
  value: string;
  content: T[];

  constructor(filterBy: string, sort: string, value: string) {
    this.nextPage = 0;
    this.previousPage = 0;
    this.totalItems = 0;
    this.numberOfElements = 0;
    this.totalPages = 0;
    this.filterBy = 'asc';
    this.sort = sort;
    this.componentFilter = [];
    this.value = value;
    this.content = [];
    this.filterBy = filterBy;
  }
}
