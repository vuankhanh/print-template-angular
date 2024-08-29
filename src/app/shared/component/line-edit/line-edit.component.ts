import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolService } from '../../service/tool.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ILineEdit, ILineEditComponent } from '../../interface/line_edit_component.interface';

@Component({
  selector: 'app-line-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './line-edit.component.html',
  styleUrl: './line-edit.component.scss'
})
export class LineEditComponent implements ILineEditComponent {
  @Input() id!: string;
  @Input() lineEdit!: ILineEdit;

  @Output() lineEditChange = new EventEmitter<ILineEdit>();
  editForm!: FormGroup;

  subscription: Subscription = new Subscription();
  constructor(
    private toolService: ToolService,
    private fb: FormBuilder
  ){ }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.editForm = this.fb.group({
      lineColor: [this.lineEdit?.lineColor || '#000000'],
      lineHeight: [this.lineEdit?.lineHeight || 1]
    });
    this.subscription.add(
      this.editForm.valueChanges.subscribe((value) => {
        this.lineEditChange.emit(value);
      })
    )
  }
  remove() {
    this.toolService.toolDeleted = this.id;
  }
}