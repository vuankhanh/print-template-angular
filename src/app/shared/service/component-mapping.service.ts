import { Component, Injectable, Type } from '@angular/core';
import { TextComponent } from '../component/text/text.component';
import { TextEditComponent } from '../component/text-edit/text-edit.component';
import { QrCodeComponent } from '../component/qr-code/qr-code.component';
import { QrCodeEditComponent } from '../component/qr-code-edit/qr-code-edit.component';
import { LineComponent } from '../component/line/line.component';
import { LineEditComponent } from '../component/line-edit/line-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentMappingService {
  private componentMap = new Map<Type<any>, Type<any>>();

  constructor() {
    this.componentMap.set(TextComponent, TextEditComponent);
    this.componentMap.set(QrCodeComponent, QrCodeEditComponent);
    this.componentMap.set(LineComponent, LineEditComponent);
    // Thêm các component khác tương ứng
  }

  getEditComponent(toolComponent: Type<any>): Type<any> | undefined {
    return this.componentMap.get(toolComponent);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ComponentNameService {
  private componentMap = new Map<string, Type<Component>>();
  constructor() {
    this.componentMap.set('_TextComponent', TextComponent as Type<Component>);
    this.componentMap.set('_QrCodeComponent', QrCodeComponent as Type<Component>);
    this.componentMap.set('_LineComponent', LineComponent as Type<Component>);
    // Thêm các component khác tương ứng
  }

  getComponentTypeByName(name: string): Type<Component> | undefined {
    return this.componentMap.get(name);
  }
}