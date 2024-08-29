import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IQrCodeComponent } from '../../interface/qr_code_component.interface';
import { ResizeHandleDirective } from '../../directive/resize-handle.directive';
import { ClickOutsideDirective } from '../../directive/click-outside.directive';
import { MatIconModule } from '@angular/material/icon';
import { IPosition, ISize } from '../../interface/tool_basic_component.interface';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [
    CommonModule,

    DragDropModule,
    MatIconModule,

    ClickOutsideDirective,
    ResizeHandleDirective
  ],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss'
})
export class QrCodeComponent implements IQrCodeComponent {
  @Input() isSelection: boolean = false;

  size: ISize = {
    x: 100,
    y: 100
  }

  position: IPosition = {
    x: 0,
    y: 0
  };

  @Input() image: string = 'assets/qr-code/qr-code-default.jpg';
  
  @Output() positionChange = new EventEmitter<IPosition>();
  @Output() sizeChange = new EventEmitter<ISize>();

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  onDragEnded(event: CdkDragEnd){
    this.position.x = event.source.getFreeDragPosition().x;
    this.position.y = event.source.getFreeDragPosition().y;
    this.positionChange.emit(this.position);
  }

  onNewWidth(newWidth: number) {
    this.size.x = newWidth;
    this.sizeChange.emit(this.size);
    this.cdr.detectChanges();
  }

  onNewHeight(newHeight: number) {
    this.size.y = newHeight;
    this.sizeChange.emit(this.size);
    this.cdr.detectChanges();
  }

  onClickOutside(event: PointerEvent) {
    if (this.isSelection) {
      this.isSelection = false;
      this.cdr.detectChanges();
    }
  }
}
