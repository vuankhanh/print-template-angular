import { ITextEdit } from "./text_edit_component.interface";
import { IToolBasicComponent } from "./tool_basic_component.interface";

export interface ITextComponent extends IToolBasicComponent {
  textEdit: ITextEdit;
}