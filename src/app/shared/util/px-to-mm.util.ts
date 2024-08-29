import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class mmToPxUtil {
  mmToPx(mm: number): number {
    return (mm / 25.4) * 96;
  }

  pxToMm(px: number): number {
    return (px * 25.4) / 96;
  }
}