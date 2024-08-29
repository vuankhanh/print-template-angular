import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ITextEdit, ITextEditComponent } from '../../interface/text_edit_component.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolService } from '../../service/tool.service';

@Component({
  selector: 'app-text-edit',
  standalone: true,
  imports: [
    CommonModule,

    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './text-edit.component.html',
  styleUrl: './text-edit.component.scss'
})
export class TextEditComponent implements OnInit, ITextEditComponent {
  @Input() id!: string;
  @Input() textEdit!: ITextEdit;
  @Output() textEditChange = new EventEmitter<ITextEdit>();
  editForm!: FormGroup;

  private subscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private toolService: ToolService
  ) { }

  remove(){
    this.toolService.toolDeleted = this.id;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.editForm = this.fb.group({
      text: [this.textEdit?.text || 'Text'],
      textSize: [this.textEdit?.textSize || 16],
      textStyle: [this.textEdit?.textStyle || 'normal'],
      textFont: [this.textEdit?.textFont || 'Arial'],
      textColor: [this.textEdit?.textColor || '#000000'],
    });
    this.subscription.add(
      this.editForm.valueChanges.subscribe((value) => {
        this.textEditChange.emit(value);
      })
    )
  }
}