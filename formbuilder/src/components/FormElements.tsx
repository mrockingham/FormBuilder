import React from "react";
import { TextFieldFormElementSmall } from "./fields/TextField";

export type ElementsType = "TextFieldSmall";

export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string
    }

    designerCompontent: React.FC<{ elementInstance: FormElementInstance }>;
    formComponent: React.FC;
    propertiesComponent: React.FC;
}

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    size?: number;
    extraAttr?: Record<string, any>;
}

type FormElementsType = {
    [key in ElementsType]: FormElement;
}
export const FormElements: FormElementsType = {
    TextFieldSmall: TextFieldFormElementSmall
};