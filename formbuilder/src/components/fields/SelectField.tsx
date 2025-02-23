// fields/SelectField.tsx
import React, { useEffect } from "react";
import {
  FormElement,
  FormElementInstance,
  FormElementKey,
  InputSize,
} from "../FormElements";
import { MdArrowDropDown } from "react-icons/md";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";
import { capitalizeFirstLetter } from "../utils/utils";

// Use one key for SelectField.
const type: FormElementKey = "Select";

// Define the extra attributes for a SelectField.
export type SelectFieldExtraAttr = {
  label: string;
  required: boolean;
  name: string;
  options: string; // Comma separated list e.g. "Option 1, Option 2, Option 3"
};

type CustomInstance = FormElementInstance<SelectFieldExtraAttr>;

interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
  options: string;
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
      options: elementInstance.extraAttr.options,
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
        options: values.options,
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
        name="options"
        render={({ field }) => (
          <TextField
            label="Options (comma separated)"
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
    </form>
  );
};

const FormComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  // Split the comma-separated options into an array.
  const optionsArray = elementInstance.extraAttr.options
    .split(",")
    .map((opt) => opt.trim())
    .filter((opt) => opt !== "");

  return (
    <FormControl
      fullWidth
      required={elementInstance.extraAttr.required}
      size="small"
    >
      <InputLabel>
        {capitalizeFirstLetter(elementInstance.extraAttr.label)}
      </InputLabel>
      <Select label={capitalizeFirstLetter(elementInstance.extraAttr.label)}>
        {optionsArray.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const DesignerComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  // Provide a preview of the select field in the designer.
  const optionsArray = elementInstance.extraAttr.options
    .split(",")
    .map((opt) => opt.trim())
    .filter((opt) => opt !== "");

  return (
    <FormControl
      fullWidth
      required={elementInstance.extraAttr.required}
      size="small"
    >
      <InputLabel>
        {capitalizeFirstLetter(elementInstance.extraAttr.label)}
      </InputLabel>
      <Select label={capitalizeFirstLetter(elementInstance.extraAttr.label)}>
        {optionsArray.length > 0 ? (
          optionsArray.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="">
            <em>No options</em>
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export const SelectFieldFormElement: FormElement<SelectFieldExtraAttr> = {
  type,
  construct: (id: string, sizeOverride?: InputSize) => ({
    id,
    type,
    size: sizeOverride || "100%",
    extraAttr: {
      label: "Select Field",
      required: false,
      name: "select-field",
      options: "Option 1, Option 2, Option 3",
    },
  }),
  designerBtnElement: { icon: MdArrowDropDown, label: "SelectField" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
