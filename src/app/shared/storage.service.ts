import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(atob(data));
  }

  set(key, value) {
    const dataValue = btoa(JSON.stringify(value));
    localStorage.setItem(key, dataValue);
  }
}
