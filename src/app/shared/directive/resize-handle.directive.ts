import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appResizeHandle]',
  standalone: true
})
export class ResizeHandleDirective {
  @Input() direction: 'right' | 'bottom' = 'right';

  @Output() newWidth: EventEmitter<number> = new EventEmitter<number>();
  @Output() newHeight: EventEmitter<number> = new EventEmitter<number>();

  private resizing: boolean = false;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;

  constructor(private el: ElementRef) { }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onResizeHandleMouseDown(event: MouseEvent | TouchEvent): void {
    event.stopPropagation();
    this.resizing = true;
    if (event instanceof MouseEvent) {
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
    } else if (event instanceof TouchEvent) {
      this.lastMouseX = event.touches[0].clientX;
      this.lastMouseY = event.touches[0].clientY;
    }
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    if (this.resizing) {
      let dx!: number;
      let dy!: number;

      if (event instanceof MouseEvent) {
        dx = event.clientX - this.lastMouseX;
        dy = event.clientY - this.lastMouseY;
      } else if (event instanceof TouchEvent) {
        dx = event.touches[0].clientX - this.lastMouseX;
        dy = event.touches[0].clientY - this.lastMouseY;
      }

      const parentElement = this.el.nativeElement.parentElement;

      if (this.direction === 'right') {
        const newWidth = parentElement.clientWidth + dx;
        this.newWidth.emit(newWidth);
      } else if (this.direction === 'bottom') {
        const newHeight = parentElement.clientHeight + dy;
        this.newHeight.emit(newHeight);
      }

      if (event instanceof MouseEvent) {
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
      } else if (event instanceof TouchEvent) {
        this.lastMouseX = event.touches[0].clientX;
        this.lastMouseY = event.touches[0].clientY;
      }
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onMouseUp(): void {
    this.resizing = false;
  }
}
