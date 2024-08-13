import { Component } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { ToolComponent } from "../tool/tool.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,

    TemplateComponent,
    ToolComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{

}
