// fields/Checkbox.tsx
import React, { useEffect } from "react";
import {
  FormElement,
  FormElementInstance,
  FormElementKey,
  InputSize,
} from "../FormElements";
import { IoIosCheckboxOutline } from "react-icons/io";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormControl,
  Switch,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";

// Use one key for the Checkbox element.
const type: FormElementKey = "Checkbox";

// Define the extra attributes for a Checkbox.
// 'label' represents the group label,
// 'items' is an array of checkbox options, each with an id and label.
export type CheckboxExtraAttr = {
  label: string;
  required: boolean;
  name: string;
  items: { id: string; label: string }[];
};

// Create a custom instance type using the extra attributes.
type CustomInstance = FormElementInstance<CheckboxExtraAttr>;

// Define the shape of the form data used in the properties editor.
interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
  items: { id: string; label: string }[];
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
      items: elementInstance.extraAttr.items,
    },
  });

  // Manage the dynamic array of checkbox items.
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    form.reset({
      label: elementInstance.extraAttr.label,
      name: elementInstance.extraAttr.name,
      required: elementInstance.extraAttr.required,
      items: elementInstance.extraAttr.items,
    });
  }, [elementInstance, form]);

  const applyChanges = (values: PropertiesFormData) => {
    updateElement(elementInstance.id, {
      ...elementInstance,
      extraAttr: {
        label: values.label,
        name: values.name,
        required: values.required,
        items: values.items,
      },
    });
  };

  return (
    <form
      onBlur={form.handleSubmit(applyChanges)}
      onSubmit={(e) => e.preventDefault()}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Controller
          control={form.control}
          name="label"
          render={({ field }) => (
            <TextField
              label="Group Label"
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
      <div>
        <h4>Checkbox Options</h4>
        {fields.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <Controller
              control={form.control}
              name={`items.${index}.label`}
              defaultValue={item.label}
              render={({ field }) => (
                <TextField
                  label={`Option ${index + 1}`}
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              )}
            />
            <IconButton
              onClick={() => {
                remove(index);
                // Immediately update the builder store with the new items list.
                form.handleSubmit(applyChanges)();
              }}
            >
              <MdDelete />
            </IconButton>
          </div>
        ))}
        <Button
          variant="outlined"
          onClick={() =>
            append({
              id: new Date().getTime().toString(),
              label: `Option ${fields.length + 1}`,
            })
          }
        >
          Add Option
        </Button>
      </div>
    </form>
  );
};

// The form component renders the checkboxes as they will appear in the final form.
const FormComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <div>
      <h3>{elementInstance.extraAttr.name}</h3>
      {elementInstance.extraAttr.label && (
        <div>{elementInstance.extraAttr.label}</div>
      )}
      <FormGroup>
        {elementInstance.extraAttr.items?.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox defaultChecked={elementInstance.extraAttr.required} />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
    </div>
  );
};

// The designer component renders the checkboxes in the form builder.
const DesignerComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <div>
      <h3>{elementInstance.extraAttr.name}</h3>
      {elementInstance.extraAttr.label && (
        <div>{elementInstance.extraAttr.label}</div>
      )}
      <FormGroup>
        {elementInstance.extraAttr.items?.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox defaultChecked={elementInstance.extraAttr.required} />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
    </div>
  );
};

// Export a unified Checkbox form element.
// The construct function now sets up a default checkbox group with one option.
export const CheckboxFormElement: FormElement<CheckboxExtraAttr> = {
  type,
  construct: (id: string, sizeOverride?: InputSize) => ({
    id,
    type,
    size: sizeOverride || "1/2",
    extraAttr: {
      label: "Checkbox Group",
      required: false,
      name: "Checkbox",
      items: [{ id: "option-1", label: "Option 1" }],
    },
    formComponent: FormComponent,
    designerCompontent: DesignerComponent,
  }),
  designerBtnElement: { icon: IoIosCheckboxOutline, label: "Checkbox" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
