import { Component, EventEmitter, Output, Type } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material';
import { QrCodeComponent } from '../../../shared/component/qr-code/qr-code.component';
import { LineComponent } from '../../../shared/component/line/line.component';
import { TInsert } from '../../../shared/interface/insert.interface';
import { ToolService } from '../../../shared/service/tool.service';
import { TextComponent } from '../../../shared/component/text/text.component';

@Component({
  selector: 'tool-insert',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.scss'
})
export class InsertComponent {
  tools: TInsert[] = [
    {
      name: 'Text',
      icon: 'edit',
      component: TextComponent
    },
    {
      name: 'Qr Code',
      icon: 'qr_code',
      component: QrCodeComponent
    },
    {
      name: 'Line',
      icon: 'horizontal_rule',
      component: LineComponent
    }
  ];

  constructor(
    private toolService: ToolService
  ) { }

  onToolClick(component: Type<Component>){
    this.toolService.toolSelected = component
  }
}
