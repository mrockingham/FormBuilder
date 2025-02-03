// FormElements.ts
import React from "react";

// Import each field component from its own file
import { TextFieldFormElement } from "./fields/TextField";
import { CheckboxFormElement } from "./fields/CheckBox";
import { TextAreaFormElement } from "./fields/TextAreaField";
// import { MultiSelectFormElement } from "./fields/MultiSelect";
import { RadioFormElement } from "./fields/RadioButton";
// import { DateFormElement } from "./fields/Date";
// import { TimeFormElement } from "./fields/Time";

// Use one key per input type.
export type FormElementKey = "TextField" | "Checkbox" | "TextArea" | "Radio";
// | "MultiSelect"
// | "Radio"
// | "Date"
// | "Time";

// Define a unified sizing type.
export type InputSize =
  | "1/2"
  | "1/3"
  | "2/3"
  | "1/4"
  | "3/4"
  | "1/6"
  | "5/6"
  | "100%";

// Generic instance type.
export type FormElementInstance<TExtra = {}> = {
  id: string;
  type: FormElementKey;
  size: InputSize;
  extraAttr: TExtra;
};

// Generic form element type.
// Update the FormElement interface to accept an optional second parameter.
export interface FormElement<TExtra = {}> {
  type: FormElementKey;
  construct: (
    id: string,
    sizeOverride?: InputSize
  ) => FormElementInstance<TExtra>;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  designerCompontent: React.FC<{
    elementInstance: FormElementInstance<TExtra>;
  }>;
  formComponent: React.FC<{ elementInstance: FormElementInstance<TExtra> }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance<TExtra>;
  }>;
}

// Registry for form elements.
type FormElementsType = {
  [key in FormElementKey]: FormElement<any>;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  Checkbox: CheckboxFormElement,
  TextArea: TextAreaFormElement,
  // MultiSelect: MultiSelectFormElement,
  Radio: RadioFormElement,
  // Date: DateFormElement,
  // Time: TimeFormElement,
};
