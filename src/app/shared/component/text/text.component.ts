import { Component, Type } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    DragDropModule,
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
  text: string = 'Text';
  constructor() { }
  onTextClick() {
    console.log(TextComponent);
  }
}
