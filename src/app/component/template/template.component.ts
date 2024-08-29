import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, Type, ViewChild } from '@angular/core';
import { filter, Observable, Subscription } from 'rxjs';
import { ToolService } from '../../shared/service/tool.service';
import { TemplateStorageService } from './template-storage.service';
import { TemplateHelper } from './template.helper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import html2canvas from 'html2canvas';
import { mmToPxUtil } from '../../shared/util/px-to-mm.util';
import jsPDF from 'jspdf';

@Component({
  selector: 'dashboard-template',
  standalone: true,
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements AfterViewInit, OnDestroy {
  @ViewChild('templateContainer') templateContainer!: ElementRef<HTMLDivElement>;
  @Input() width: number = 100;
  @Input() height: number = 150;

  component$: Observable<Type<Component>> = this.toolService.toolSelected$.pipe(
    filter((component) => component !== null)
  ) as Observable<Type<Component>>;

  subscription: Subscription = new Subscription();
  constructor(
    private toolService: ToolService,
    private templateStorageService: TemplateStorageService,
    private templateHelper: TemplateHelper,
    private mmToPxUtil: mmToPxUtil,
  ) { }

  ngAfterViewInit(): void {
    this.initTemplate();
    this.listenToolIsInserted();
    this.listenToolIsDeleted();
  }

  private async initTemplate() {
    const templateContainer = this.templateContainer.nativeElement;
    const components = await this.templateStorageService.loadComponent();
    for (let componentRef of components) {
      if (!componentRef) {
        continue;
      }
      this.templateHelper.appendComponent(templateContainer, componentRef);
      componentRef.hostView.detectChanges();
    }
  }

  private listenToolIsInserted(): void {
    this.subscription.add(
      this.component$.subscribe((component) => {
        const templateContainer = this.templateContainer.nativeElement;

        const componentRef = this.templateHelper.createComponent(component);

        this.templateHelper.appendComponent(templateContainer, componentRef);

        componentRef.hostView.detectChanges();

        this.templateStorageService.saveComponentToLocalStorage(componentRef);
      })
    )
  }

  private listenToolIsDeleted(): void {
    this.subscription.add(
      this.toolService.toolDeleted$.subscribe((componentRef) => {
        this.templateHelper.removeComponent(this.templateContainer.nativeElement, componentRef);
        this.templateStorageService.removeComponentInLocalStorage(componentRef);
      })
    )
  }

  print(template: HTMLDivElement) {
    const widthPx = this.mmToPxUtil.mmToPx(100); // Chuyển đổi 100mm sang px
    const heightPx = this.mmToPxUtil.mmToPx(150); // Chuyển đổi 150mm sang px
    const scale = 3;

    html2canvas(template, { width: widthPx, height: heightPx, scale }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Tạo cửa sổ mới và chèn hình ảnh canvas vào đó
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>body { margin: 0; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(`<img src="${imgData}" style="width:100%;height:auto;">`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
      
      // const pdf = new jsPDF({
      //   orientation: 'portrait',
      //   unit: 'mm',
      //   format: [100, 150]
      // });

      // // const widthMm = this.mmToPxUtil.pxToMm(canvas.width);
      // // const heightMm = this.mmToPxUtil.pxToMm(canvas.height);

      // // pdf.addImage(imgData, 'PNG', 0, 0, widthMm, heightMm);
      // // pdf.save('document.pdf');
    });

  }

  // onTemplateClick(event: MouseEvent) {
  //   if (event.target === event.currentTarget) {
  //     // Thực hiện hành động mong muốn khi click vào chính element này
  //     console.log('Element chính được click');
  //   }

  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
