import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ITextComponent } from '../../interface/text_component.interface';
import { ClickOutsideDirective } from '../../directive/click-outside.directive';
import { IPosition, ISize } from '../../interface/tool_basic_component.interface';
import { ITextEdit } from '../../interface/text_edit_component.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResizeHandleDirective } from '../../directive/resize-handle.directive';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    CommonModule,

    DragDropModule,
    MatButtonModule,
    MatIconModule,

    ResizeHandleDirective,
    ClickOutsideDirective
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent implements ITextComponent {
  @Input() textEdit: ITextEdit = {
    text: 'Text',
    textSize: 16,
    textStyle: 'normal',
    textFont: 'Arial',
    textColor: '#000000',
  };
  @Input() isSelection: boolean = false;
  
  size: ISize = {
    x: 100,
    y: 100
  };
  
  position: IPosition = {
    x: 0,
    y: 0
  };
  
  @Output() positionChange = new EventEmitter<IPosition>();
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
