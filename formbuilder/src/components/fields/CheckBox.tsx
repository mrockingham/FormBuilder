// fields/Checkbox.tsx
import React, { useEffect } from "react";
import {
  FormElement,
  FormElementInstance,
  InputSize,
  FormElementKey,
} from "../FormElements";
import { IoIosCheckboxOutline } from "react-icons/io";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";

// Use one key for the Checkbox element.
const type: FormElementKey = "Checkbox";

// const textInputSizes: { label: string; size: InputSize }[] = [
//   { label: "XX-S", size: "1/6" },
//   { label: "X-S", size: "1/4" },
//   { label: "S", size: "1/3" },
//   { label: "M", size: "1/2" },
//   { label: "L", size: "2/3" },
//   { label: "X-L", size: "3/4" },
//   { label: "XX-L", size: "5/6" },
//   { label: "Full", size: "100%" },
// ];

// Define the extra attributes for a Checkbox.
export type CheckboxExtraAttr = {
  label: string;
  required: boolean;
  name: string;
  items: { id: string; label: string }[];
};

// Create a custom instance type using the extra attributes.
type CustomInstance = FormElementInstance<CheckboxExtraAttr>;

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
            <Box display="flex" alignItems="center" gap="8px">
              <Checkbox checked={field.value} onChange={field.onChange} />
              <span>Required</span>
            </Box>
          )}
        />
      </div>
      <div>
        <h4>Checkbox Options</h4>
        {fields.map((item, index) => (
          <Box
            key={item.id}
            display="flex"
            alignItems="center"
            gap="8px"
            mb={1}
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
                form.handleSubmit(applyChanges)();
              }}
            >
              <MdDelete />
            </IconButton>
          </Box>
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
    <div style={{ width: "100%" }}>
      <h3>{elementInstance.extraAttr.name}</h3>
      <FormGroup style={{ display: "flex", flexDirection: "row" }}>
        {elementInstance.extraAttr.items?.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                sx={{
                  color: "lightblue",
                  "&.Mui-checked": { color: "lightblue" },
                }}
                defaultChecked={elementInstance.extraAttr.required}
              />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
    </div>
  );
};

// Updated DesignerComponent for Checkbox with matching style
const DesignerComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
      }}
    >
      <div style={{ fontSize: "1rem", marginBottom: "2px" }}>
        {elementInstance.extraAttr.name}
      </div>
      <Box
        sx={{
          backgroundColor: "white",
          pl: 2,
          border: "1px solid lightblue",
          borderRadius: "16px",
          boxShadow: "0 0 10px lightgray",
        }}
      >
        <FormGroup row>
          {elementInstance.extraAttr.items?.map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  sx={{
                    color: "lightblue",
                    "&.Mui-checked": { color: "lightblue" },
                    transform: "scale(0.8)", // scales checkbox down by 20%
                  }}
                />
              }
              label={<span style={{ fontSize: "0.8rem" }}>{item.label}</span>}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
};

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
      items: [{ id: `${id}-option-1`, label: "Option 1" }],
    },
    formComponent: FormComponent,
    designerCompontent: DesignerComponent,
  }),
  designerBtnElement: { icon: IoIosCheckboxOutline, label: "Checkbox" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

export default CheckboxFormElement;
