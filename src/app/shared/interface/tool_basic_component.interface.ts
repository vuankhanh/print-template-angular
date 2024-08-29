import { EventEmitter } from "@angular/core";
import { CdkDragEnd } from "@angular/cdk/drag-drop";

export interface IToolBasicComponent {
  size: ISize;
  position: IPosition;
  isSelection: boolean;
  positionChange: EventEmitter<IPosition>;
  sizeChange: EventEmitter<ISize>;

  onDragEnded: (event: CdkDragEnd)=>void;
}

export interface ISize {
  x: number;
  y: number;
}

export interface IPosition {
  x: number;
  y: number;
}