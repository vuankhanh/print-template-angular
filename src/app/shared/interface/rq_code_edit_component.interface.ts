import { EventEmitter } from "@angular/core";

export interface IQrCodeEditComponent {
  id: string;
  image: string;
  imageChange: EventEmitter<string>;
}