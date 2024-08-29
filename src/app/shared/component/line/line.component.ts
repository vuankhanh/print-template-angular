import { CdkDragEnd, CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ClickOutsideDirective } from '../../directive/click-outside.directive';
import { IPosition, ISize } from '../../interface/tool_basic_component.interface';
import { ILineComponent } from '../../interface/line_component.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ResizeHandleDirective } from '../../directive/resize-handle.directive';
import { ILineEdit } from '../../interface/line_edit_component.interface';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [
    CommonModule,

    DragDropModule,
    MatIconModule,

    ResizeHandleDirective,
    ClickOutsideDirective
  ],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent implements ILineComponent {
  @Input() lineEdit: ILineEdit = {
    lineColor: '#000000',
    lineHeight: 1
  };
  @Input() isSelection: boolean = false;

  size: ISize = {
    x: 100,
    y: 100
  }
  position: IPosition = { x: 0, y: 0 };
  
  @Output() positionChange: EventEmitter<IPosition> = new EventEmitter<IPosition>();
  @Output() sizeChange: EventEmitter<ISize> = new EventEmitter<ISize>();

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

  onClickOutside(event: PointerEvent) {
    if (this.isSelection) {
      this.isSelection = false;
      this.cdr.detectChanges();
    }
  }

}
