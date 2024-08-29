import { ILineEdit } from "./line_edit_component.interface";
import { IToolBasicComponent } from "./tool_basic_component.interface";

export interface ILineComponent extends IToolBasicComponent {
  lineEdit: ILineEdit;
}