import { Component, Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private toolSubject = new Subject<Type<Component>>();
  constructor() { }

  set toolSelected(component: Type<Component>){
    this.toolSubject.next(component);
  }

  get toolSelected$(){
    return this.toolSubject.asObservable();
  }
}
