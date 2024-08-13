import { Component, Type } from "@angular/core";

export type TInsert = {
  name: string;
  icon: string;
  component: Type<Component>
}