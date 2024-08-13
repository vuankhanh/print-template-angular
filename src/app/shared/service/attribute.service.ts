import { Component, Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  private attributeSubject = new Subject<Type<Component>>();
  constructor() { }

  set attribute(component: Type<Component>){
    console.log(component);
    this.attributeSubject.next(component);
  }

  get attribute$(){
    return this.attributeSubject.asObservable();
  }
}
