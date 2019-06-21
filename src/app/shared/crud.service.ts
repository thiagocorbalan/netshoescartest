import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  private API = environment.ApiURL;

  constructor(protected http: HttpClient, protected apiRoute: string ) {
    this.API = this.API + apiRoute;
  }

  list() {
    return this.http.get<T[]>(this.API).pipe(take(1));
  }

  loadById(id) {
    return this.http.get<T>(`${this.API}/${id}`).pipe(take(1));
  }
}
