import { EventEmitter } from "@angular/core";
import { ISize, IToolBasicComponent } from "./tool_basic_component.interface";

export interface IQrCodeComponent extends IToolBasicComponent {
  image: string;
  sizeChange: EventEmitter<ISize>;
}