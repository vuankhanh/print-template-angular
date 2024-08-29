import { Component, ComponentRef, Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  private attributeSubject = new Subject<ComponentRef<Component>>();
  constructor() { }

  set attribute(component: ComponentRef<Component>){
    this.attributeSubject.next(component);
  }

  get attribute$(){
    return this.attributeSubject.asObservable();
  }
}
