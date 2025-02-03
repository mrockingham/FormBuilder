// fields/TextArea.tsx
import React, { useEffect } from "react";
import {
  FormElement,
  FormElementInstance,
  FormElementKey,
} from "../FormElements";
import { MdSubject } from "react-icons/md";
import { Checkbox, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";
import { capitalizeFirstLetter } from "../utils/utils";

const type: FormElementKey = "TextArea";

export type TextAreaExtraAttr = {
  label: string;
  required: boolean;
  name: string;
};

type CustomInstance = FormElementInstance<TextAreaExtraAttr>;

interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
}

const PropertiesComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  const { updateElement } = useBuilderStore();
  const form = useForm<PropertiesFormData>({
    mode: "onBlur",
    defaultValues: {
      label: elementInstance.extraAttr.label,
      name: elementInstance.extraAttr.name,
      required: elementInstance.extraAttr.required,
    },
  });

  useEffect(() => {
    form.reset(elementInstance.extraAttr);
  }, [elementInstance, form]);

  const applyChanges = (values: PropertiesFormData) => {
    updateElement(elementInstance.id, {
      ...elementInstance,
      extraAttr: {
        label: values.label,
        name: values.name,
        required: values.required,
      },
    });
  };

  return (
    <form
      onBlur={form.handleSubmit(applyChanges)}
      onSubmit={(e) => e.preventDefault()}
    >
      <Controller
        control={form.control}
        name="label"
        render={({ field }) => (
          <TextField
            label="Label"
            {...field}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
          />
        )}
      />
      <Controller
        control={form.control}
        name="name"
        render={({ field }) => (
          <TextField
            label="Name"
            {...field}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
          />
        )}
      />
      <Controller
        control={form.control}
        name="required"
        render={({ field }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={field.value} onChange={field.onChange} />
            <span>Required</span>
          </div>
        )}
      />
    </form>
  );
};

const FormComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <TextField
      multiline
      rows={4}
      fullWidth
      label={capitalizeFirstLetter(elementInstance.extraAttr.label)}
      required={elementInstance.extraAttr.required}
    />
  );
};

const DesignerComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <TextField
      multiline
      rows={2}
      fullWidth
      variant="outlined"
      label={capitalizeFirstLetter(elementInstance.extraAttr.label)}
      required={elementInstance.extraAttr.required}
    />
  );
};

export const TextAreaFormElement: FormElement<TextAreaExtraAttr> = {
  type,
  construct: (id: string) => ({
    id,
    type,
    size: "1/2",
    extraAttr: {
      label: "Text Area",
      required: false,
      name: "text-area",
    },
  }),
  designerBtnElement: { icon: MdSubject, label: "TextArea" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
