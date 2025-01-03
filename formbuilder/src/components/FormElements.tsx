import React from "react";
import {
  TextFieldFormElementSmall,
  TextFieldFormElementMedium,
  TextFieldFormElementLarge,
} from "./fields/TextField";
import {
  CheckBoxFormElementSmall,
  CheckBoxFormElementMedium,
  CheckBoxFormElementLarge,
} from "./fields/CheckBox";

export type ElementsType =
  | "TextFieldSmall"
  | "TextFieldMedium"
  | "TextFieldLarge"
  | "CheckboxSmall"
  | "CheckboxMedium"
  | "CheckboxLarge";

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerCompontent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  size?: number;
  extraAttr?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
  TextFieldSmall: TextFieldFormElementSmall,
  TextFieldMedium: TextFieldFormElementMedium,
  TextFieldLarge: TextFieldFormElementLarge,
  CheckboxSmall: CheckBoxFormElementSmall,
  CheckboxMedium: CheckBoxFormElementMedium,
  CheckboxLarge: CheckBoxFormElementLarge,
};
