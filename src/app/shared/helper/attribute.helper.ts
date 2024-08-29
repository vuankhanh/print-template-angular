import { Component, ComponentRef, Injectable } from "@angular/core";
import { AttributeComponent } from "../../component/tool/attribute/attribute.component";
import { Subject, Subscription, takeUntil } from "rxjs";
import { TemplateStorageService } from "../../component/template/template-storage.service";
import { ITextComponent } from "../interface/text_component.interface";
import { ITextEdit, ITextEditComponent } from "../interface/text_edit_component.interface";
import { IQrCodeComponent } from "../interface/qr_code_component.interface";
import { IQrCodeEditComponent } from "../interface/rq_code_edit_component.interface";
import { IPosition, ISize } from "../interface/tool_basic_component.interface";
import { ILineComponent } from "../interface/line_component.interface";
import { ILineEdit, ILineEditComponent } from "../interface/line_edit_component.interface";

@Injectable({
  providedIn: AttributeComponent
})
export class AttributeHelper {
  private oldComponentRef: ComponentRef<Component> | null = null;
  subscription: Subscription = new Subscription();

  subject: Subject<null> = new Subject<null>();
  constructor(
    private readonly templateStorageService: TemplateStorageService
  ) { }

  componentProperty(toolComponentRef: ComponentRef<Component>, attributeComponentRef: ComponentRef<Component>) {
    this.subject.next(null);
    this.setSelectionStyle(toolComponentRef);

    switch (toolComponentRef.instance.constructor.name) {
      case '_TextComponent':
        const textComponentRef: ComponentRef<ITextComponent> = toolComponentRef as ComponentRef<ITextComponent>;
        const textEditComponentRef: ComponentRef<ITextEditComponent> = attributeComponentRef as ComponentRef<ITextEditComponent>;

        textComponentRef.instance.positionChange.pipe(
          takeUntil(this.subject)
        ).subscribe((position: IPosition) => {
          this.templateStorageService.updateComponentToLocalStorage(toolComponentRef);
        })

        //TextEditComponentRef sẽ nhận giá trị từ TextComponentRef
        textEditComponentRef.setInput('textEdit', textComponentRef.instance.textEdit);
        textEditComponentRef.setInput('id', textComponentRef.location.nativeElement.id);

        textEditComponentRef.instance.textEditChange.pipe(
          takeUntil(this.subject)
        ).subscribe((textEdit: ITextEdit) => {
          textComponentRef.setInput('textEdit', textEdit);
          this.templateStorageService.updateComponentToLocalStorage(toolComponentRef);
          textComponentRef.changeDetectorRef.detectChanges();
        })

        textEditComponentRef.changeDetectorRef.detectChanges();

        return;
      case '_QrCodeComponent':
        const qrCodeComponentRef: ComponentRef<IQrCodeComponent> = toolComponentRef as ComponentRef<IQrCodeComponent>;
        const qrCodeEditComponentRef: ComponentRef<IQrCodeEditComponent> = attributeComponentRef as ComponentRef<IQrCodeEditComponent>;

        qrCodeComponentRef.instance.positionChange.pipe(
          takeUntil(this.subject)
        ).subscribe((position: IPosition) => {
          this.templateStorageService.updateComponentToLocalStorage(toolComponentRef);
        })

        qrCodeComponentRef.instance.sizeChange.pipe(
          takeUntil(this.subject)
        ).subscribe((size: ISize) => {
          this.templateStorageService.updateComponentToLocalStorage(toolComponentRef);
        })

        qrCodeEditComponentRef.setInput('id', qrCodeComponentRef.location.nativeElement.id);

        qrCodeEditComponentRef.instance.imageChange.pipe(
          takeUntil(this.subject)
        ).subscribe((image: string) => {
          qrCodeComponentRef.setInput('image', image);
          this.templateStorageService.updateComponentToLocalStorage(toolComponentRef);
          qrCodeComponentRef.changeDetectorRef.detectChanges();
        })

        return;
      case '_LineComponent':
        const lineComponentRef: ComponentRef<ILineComponent> = toolComponentRef as ComponentRef<ILineComponent>;
        const lineEditComponentRef: ComponentRef<ILineEditComponent> = attributeComponentRef as ComponentRef<ILineEditComponent>;

        lineComponentRef.instance.positionChange.pipe(
          takeUntil(this.subject)
        ).subscribe((position: IPosition) => {
          this.templateStorageService.updateComponentToLocalStorage(toolComponentRef);
        })

        lineComponentRef.instance.sizeChange.pipe(
          takeUntil(this.subject)
        ).subscribe((size: ISize) => {
          this.templateStorageService.updateComponentToLocalStorage(toolComponentRef);
        })

        lineEditComponentRef.setInput('id', lineComponentRef.location.nativeElement.id);
        lineEditComponentRef.setInput('lineEdit', lineComponentRef.instance.lineEdit);

        lineEditComponentRef.instance.lineEditChange.pipe(
          takeUntil(this.subject)
        ).subscribe((lineEdit: ILineEdit) => {
          lineComponentRef.setInput('lineEdit', lineEdit);
          this.templateStorageService.updateComponentToLocalStorage(toolComponentRef);
          lineComponentRef.changeDetectorRef.detectChanges();
        })

        return;
      default:
        return;
    }
  }

  private setSelectionStyle(componentRef: ComponentRef<Component>) {
    // Clear style selection của oldComponentRef nếu nó tồn tại
    if (this.oldComponentRef) {
      this.oldComponentRef.setInput('isSelection', false);
      this.templateStorageService.updateComponentToLocalStorage(this.oldComponentRef);
      this.oldComponentRef.changeDetectorRef.detectChanges();
    }

    // Set oldComponentRef là toolComponentRef hiện tại
    this.oldComponentRef = componentRef;

    // Thêm style selection vào toolComponentRef
    this.oldComponentRef.setInput('isSelection', true);
    this.templateStorageService.updateComponentToLocalStorage(this.oldComponentRef);
    this.oldComponentRef.changeDetectorRef.detectChanges();
  }
}