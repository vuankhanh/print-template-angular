import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FileToBase64Utitl {
  constructor() { }

  async convert(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(file);
    });
  }
}
