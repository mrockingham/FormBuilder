// fields/Checkbox.tsx
import React, { useEffect } from "react";
import {
  FormElement,
  FormElementInstance,
  FormElementKey,
} from "../FormElements";
import { IoIosCheckboxOutline } from "react-icons/io";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormControl,
  Switch,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";

// Use one key for the Checkbox element.
const type: FormElementKey = "Checkbox";

// Define the extra attributes for a Checkbox.
export type CheckboxExtraAttr = {
  label: string;
  required: boolean;
  name: string;
};

// Create a custom instance type using the extra attributes.
type CustomInstance = FormElementInstance<CheckboxExtraAttr>;

// Define the shape of the form data used in the properties editor.
interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
}

// The properties editor component for the Checkbox.
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
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FormControl>
                <Switch checked={field.value} onChange={field.onChange} />
              </FormControl>
              <span>Required</span>
            </div>
          )}
        />
      </div>
    </form>
  );
};

// The form component renders the checkbox as it will appear in the final form.
const FormComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <div>
      <h3>{elementInstance.extraAttr.name}</h3>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox defaultChecked={elementInstance.extraAttr.required} />
          }
          label={elementInstance.extraAttr.label}
        />
      </FormGroup>
    </div>
  );
};

// The designer component renders the checkbox in the form builder.
const DesignerComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <div>
      <h3>{elementInstance.extraAttr.name}</h3>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox defaultChecked={elementInstance.extraAttr.required} />
          }
          label={elementInstance.extraAttr.label}
        />
      </FormGroup>
    </div>
  );
};

// Export a single unified Checkbox form element.
// The size property here uses one of your custom sizing values.
export const CheckboxFormElement: FormElement<CheckboxExtraAttr> = {
  type,
  construct: (id: string) => ({
    id,
    type,
    size: "1/2", // default size; this value can be updated later
    extraAttr: {
      label: "Checkbox",
      required: false,
      name: "Checkbox",
    },
  }),
  designerBtnElement: { icon: IoIosCheckboxOutline, label: "Checkbox" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
