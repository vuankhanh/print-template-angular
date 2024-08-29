import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolService } from '../../service/tool.service';
import { IQrCodeEditComponent } from '../../interface/rq_code_edit_component.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FileToBase64Utitl } from '../../util/file-to-base64';
import { IPosition } from '../../interface/tool_basic_component.interface';

@Component({
  selector: 'app-qr-code-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './qr-code-edit.component.html',
  styleUrl: './qr-code-edit.component.scss'
})
export class QrCodeEditComponent implements OnChanges, OnInit, IQrCodeEditComponent {
  @Input() id!: string;
  @Input() position!: IPosition;
  @Output() imageChange: EventEmitter<string> = new EventEmitter<string>();
  
  image: string = '';
  editForm!: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private toolService: ToolService,
    private fileToBase64Utitl: FileToBase64Utitl
  ) { }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const position = simpleChanges['position'];
    const previousPosition = position?.previousValue;
    const currentPosition = position?.currentValue;
    
    if(previousPosition != currentPosition){
      
      this.editForm.patchValue({
        position: {
          x: currentPosition.x,
          y: currentPosition.y
        }
      });
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.editForm = this.fb.group({
      position: this.fb.group({
        x: [this.position?.x || 0],
        y: [this.position?.y || 0]
      })
    });
  }

  async onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files ? input.files[0] : null;
    if(file){
      const image = await this.fileToBase64Utitl.convert(file);

      this.imageChange.emit(image);
      this.cdr.detectChanges();
    }
  }

  remove() {
    this.toolService.toolDeleted = this.id;
  }
}
