import { Component, ComponentRef, Injectable } from '@angular/core';
import { TemplateHelper } from './template.helper';
import { LocalStorageConstant } from '../../shared/constant/local_storage.constant';
import { StorageService } from '../../shared/service/storage.service';
import { ComponentNameService } from '../../shared/service/component-mapping.service';
import { v4 as uuidv4 } from 'uuid';
import { TTemplateStorage } from '../../shared/interface/template_component.interface';

@Injectable({
  providedIn: 'root'
})
export class TemplateStorageService {
  private savedComponentData: Array<TTemplateStorage> = [];
  constructor(
    private templateHelper: TemplateHelper,
    private storageService: StorageService,
    private componentNameService: ComponentNameService
  ) { }

  async loadComponent() {
    this.savedComponentData = await this.storageService.get(LocalStorageConstant.TEMPLATE) || [];
    
    return this.savedComponentData.map(componentData => {
      const componentType = this.componentNameService.getComponentTypeByName(componentData.name);
      if (!componentType) {
        return;
      }
      const componentRef = this.templateHelper.createComponent(componentType);
      componentRef.location.nativeElement.id = componentData.id;
      TemplateStorageHelper.setProperties(componentRef.instance, componentData.properties);
      
      return componentRef;
    });
  }

  saveComponentToLocalStorage(componentRef: ComponentRef<Component>) {
    const instance = componentRef.instance;
    const componentData: TTemplateStorage = {
      id: uuidv4(),
      name: instance.constructor.name,
      properties: TemplateStorageHelper.extractProperties(instance),
    };
    
    this.savedComponentData.push(componentData);
    this.storageService.set(LocalStorageConstant.TEMPLATE, this.savedComponentData);
  }

  updateComponentToLocalStorage(componentRef: ComponentRef<Component>) {
    const id = componentRef.location.nativeElement.id || uuidv4();

    const instance = componentRef.instance;
    const componentData: TTemplateStorage = {
      id,
      name: instance.constructor.name,
      properties: TemplateStorageHelper.extractProperties(instance),
    };
    const index = TemplateStoreUtil.findComponentById(this.savedComponentData, id);
    if (index === -1) {
      return;
    }
    this.savedComponentData[index] = componentData;
    this.storageService.set(LocalStorageConstant.TEMPLATE, this.savedComponentData);
  }

  removeComponentInLocalStorage(componentId: string) {
    const index = TemplateStoreUtil.findComponentById(this.savedComponentData, componentId);
    if (index === -1) {
      return;
    }
    this.savedComponentData.splice(index, 1);
    this.storageService.set(LocalStorageConstant.TEMPLATE, this.savedComponentData);
  }
  
}

export class TemplateStorageHelper {
  static extractProperties(instance: any): any {
    const excludeProperties = ['positionChange', 'sizeChange', 'isSelection', 'cdr'];
    const properties: any = {};
    for (const key of Object.keys(instance)) {
      if (instance.hasOwnProperty(key) && !excludeProperties.includes(key)) {
        properties[key] = instance[key];
      }
    }
    return properties;
  }

  static setProperties(instance: any, properties: any) {
    for (const key of Object.keys(properties)) {
      instance[key] = properties[key];
    }
  }

}

export class TemplateStoreUtil {
  static findComponentById(components: Array<TTemplateStorage>, id: string): number {
    return components.findIndex(component => component.id === id);
  }
}
