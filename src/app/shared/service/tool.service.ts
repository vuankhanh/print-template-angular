import { Component, ComponentRef, Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private toolSubject = new Subject<Type<Component>>();
  private toolDeletedSubject = new Subject<string>();
  constructor() { }

  set toolSelected(component: Type<Component>){
    this.toolSubject.next(component);
  }

  set toolDeleted(componentId: string){
    this.toolDeletedSubject.next(componentId);
  }

  get toolSelected$(){
    return this.toolSubject.asObservable();
  }

  get toolDeleted$(){
    return this.toolDeletedSubject.asObservable();
  }
}
