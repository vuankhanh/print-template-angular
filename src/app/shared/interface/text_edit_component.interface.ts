import { EventEmitter } from "@angular/core";

export interface ITextEditComponent {
  id: string;
  textEdit: ITextEdit;
  textEditChange: EventEmitter<ITextEdit>;
}

export interface ITextEdit {
  text: string;
  textSize: number;
  textStyle: string
  textFont: string;
  textColor: string
}