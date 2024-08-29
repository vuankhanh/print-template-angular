import { ApplicationRef, Component, ComponentRef, createComponent, Injectable, Renderer2, RendererFactory2, Type } from "@angular/core";
import { AttributeService } from "../../shared/service/attribute.service";
import { ITemplateComponent } from "../../shared/interface/template_component.interface";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TemplateHelper {
  private renderer2: Renderer2;
  constructor(
    private rendererFactory: RendererFactory2,
    private applicationRef: ApplicationRef,
    private attributeService: AttributeService
  ) {
    this.renderer2 = rendererFactory.createRenderer(null, null);
  }

  createComponent(component: Type<Component>) {
    const environmentInjector = this.applicationRef.injector;
    const componentRef = createComponent(component, {
      environmentInjector,
    });

    componentRef.location.nativeElement.addEventListener('mousedown', () => {
      this.attributeService.attribute = componentRef;
    });

    return componentRef;
  }

  appendComponent(templateContainer: HTMLDivElement, componentRef: ComponentRef<Component>) {
    this.renderer2.appendChild(
      templateContainer,
      componentRef.location.nativeElement
    );
  }

  removeComponent(templateContainer: HTMLDivElement, componentId: string) {
    const elementToRemove = document.getElementById(componentId);
    if (elementToRemove && templateContainer.contains(elementToRemove)) {
      this.renderer2.removeChild(templateContainer, elementToRemove);
    }
  }
}