import { CommonModule } from '@angular/common';
import { AfterViewInit, ApplicationRef, Component, createComponent, Input, Renderer2, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { ToolService } from '../../shared/service/tool.service';
import { AttributeService } from '../../shared/service/attribute.service';

@Component({
  selector: 'dashboard-template',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements AfterViewInit {
  @ViewChild('templateContainer', { read: ViewContainerRef }) templateContainer!: ViewContainerRef;
  @Input() width: number = 100;
  @Input() height: number = 150;

  component$: Observable<Type<Component>> = this.toolService.toolSelected$.pipe(
    filter((component) => component !== null)
  ) as Observable<Type<Component>>;

  constructor(
    private renderer2: Renderer2,
    private applicationRef: ApplicationRef,
    private toolService: ToolService,
    private attributeService: AttributeService
  ) { }

  ngAfterViewInit(): void {
    this.component$.subscribe((component) => {
      const environmentInjector = this.applicationRef.injector;
      const componentRef = createComponent(component, {
        environmentInjector,
      });

      const templateContainer = this.templateContainer.element.nativeElement;

      componentRef.location.nativeElement.addEventListener('click', () => {
        console.log(componentRef.instance);
        this.attributeService.attribute = componentRef.componentType;
      })
      console.log(componentRef);
      
      
      this.renderer2.appendChild(
        templateContainer,
        componentRef.location.nativeElement
      );

      componentRef.hostView.detectChanges();

    });
  }
}
