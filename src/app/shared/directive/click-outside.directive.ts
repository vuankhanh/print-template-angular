import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<PointerEvent>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onClick(event: PointerEvent) {
    const targetElement = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    const isChildOfToolAttribute = targetElement.closest('tool-attribute') !== null;

    if (!clickedInside && !isChildOfToolAttribute) {
      this.clickOutside.emit(event);
    }
  }

}
