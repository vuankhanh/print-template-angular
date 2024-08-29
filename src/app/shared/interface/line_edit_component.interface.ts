import { EventEmitter } from "@angular/core";

export interface ILineEditComponent {
  id: string;
  lineEdit: ILineEdit;
  lineEditChange: EventEmitter<ILineEdit>;
}

export interface ILineEdit {
  lineColor: string;
  lineHeight: number;
}