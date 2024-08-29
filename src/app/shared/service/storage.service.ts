import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private _storage: Storage
  ) { }

  get(key: string): Promise<any> {
    const value = this._storage.getItem(key);
    return new Promise((resolve, reject) => {
      if (value) {
        try {
          const parsedValue = JSON.parse(value);
          resolve(parsedValue);
        } catch (error) {
          if (error instanceof Error) {
            reject(error.message);
          } else {
            reject(String(error));
          }
        }
      }
      resolve(value);
    });
  }
  set(key: string, value: any): void {
    this._storage.setItem(key, JSON.stringify(value));
  }
}
