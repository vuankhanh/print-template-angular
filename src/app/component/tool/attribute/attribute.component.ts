import { ApplicationRef, Component, createComponent, ElementRef, OnDestroy, OnInit, Renderer2, Type, ViewContainerRef } from '@angular/core';
import { AttributeService } from '../../../shared/service/attribute.service';
import { ComponentMappingService } from '../../../shared/service/component-mapping.service';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { AttributeHelper } from '../../../shared/helper/attribute.helper';
import { TextEditComponent } from '../../../shared/component/text-edit/text-edit.component';
import { QrCodeComponent } from '../../../shared/component/qr-code/qr-code.component';
import { QrCodeEditComponent } from '../../../shared/component/qr-code-edit/qr-code-edit.component';

@Component({
  selector: 'tool-attribute',
  standalone: true,
  imports: [
    TextEditComponent,
    QrCodeEditComponent
  ],
  providers: [
    AttributeHelper
  ],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss'
})
export class AttributeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(
    private element: ElementRef,
    private renderer2: Renderer2,
    private applicationRef: ApplicationRef,
    private attributeService: AttributeService,
    private componentMappingService: ComponentMappingService,
    private attributeHelper: AttributeHelper,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.attributeService.attribute$.subscribe((toolComponentRef) => {
        console.log(toolComponentRef);
        
        // Lấy edit component từ attribute
        const editComponent = this.componentMappingService.getEditComponent(toolComponentRef.componentType);
        if (!editComponent) {
          return;
        }
        const environmentInjector = this.applicationRef.injector;
        
        const attributeTemplate = this.element.nativeElement;

        // Tạo một component từ editComponent
        const editComponentRef = createComponent(editComponent as Type<Component>, {
          environmentInjector,
        });

        this.attributeHelper.componentProperty(toolComponentRef, editComponentRef);

        // Xóa tất cả các phần tử con của attributeTemplate
        while (attributeTemplate.firstChild) {
          this.renderer2.removeChild(attributeTemplate, attributeTemplate.firstChild);
        }

        // Thêm edit component vào attributeTemplate
        this.renderer2.appendChild(
          attributeTemplate,
          editComponentRef.location.nativeElement
        );

        editComponentRef.hostView.detectChanges();
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}