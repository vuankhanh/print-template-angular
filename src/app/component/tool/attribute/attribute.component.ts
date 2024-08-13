import { Component, OnInit } from '@angular/core';
import { AttributeService } from '../../../shared/service/attribute.service';

@Component({
  selector: 'tool-attribute',
  standalone: true,
  imports: [],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss'
})
export class AttributeComponent implements OnInit {
  constructor(
    private attributeService: AttributeService
  ) {}

  ngOnInit(): void {
    this.attributeService.attribute$.subscribe((attribute) => {
      console.log(attribute);
    })
  }
}
