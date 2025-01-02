import React from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { TextField } from "@mui/material";

const type: ElementsType = "TextFieldSmall";

const extraAttr = {
  label: "Text Field",
  required: false,
  name: "text-field",
};

type CustomInstance = FormElementInstance & { extraAttr: typeof extraAttr };

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  return (
    <div style={{ color: "blue" }}>
      <TextField
        label={element.extraAttr.label}
        required={element.extraAttr.required}
      />
    </div>
  );
};

const PropertiesCompont = () => {
  return <div>Properties</div>;
};

export const TextFieldFormElementSmall: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    size: 1,
    extraAttr: {
      label: "Text FieldSmall",
      required: false,
      name: "text-fieldSmall",
    },
  }),
  designerBtnElement: { icon: MdTextFields, label: "1" },
  designerCompontent: DesignerComponent,
  formComponent: () => <div>Form</div>,
  propertiesComponent: PropertiesCompont,
};

export const TextFieldFormElementMedium: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    size: 2,

    extraAttr: {
      label: "Text Field",
      required: false,
      name: "text-field",
    },
  }),
  designerBtnElement: { icon: MdTextFields, label: "2" },
  designerCompontent: DesignerComponent,
  formComponent: () => <div>Form</div>,
  propertiesComponent: () => <div>Properties</div>,
};
export const TextFieldFormElementLarge: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    size: 3,
    extraAttr: {
      label: "Text Field",
      required: false,
      name: "text-field",
    },
  }),
  designerBtnElement: { icon: MdTextFields, label: "3" },
  designerCompontent: DesignerComponent,
  formComponent: () => <div>Form</div>,
  propertiesComponent: () => <div>Properties</div>,
};
