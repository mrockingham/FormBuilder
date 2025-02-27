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
  Button,
  IconButton,
} from "@mui/material";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";
import { capitalizeFirstLetter } from "../utils/utils";
import { MdDelete } from "react-icons/md";

// Use one key for SelectField.
const type: FormElementKey = "Select";

// Define the extra attributes for a SelectField.
// 'options' is now an object array with id and label.
export type SelectFieldExtraAttr = {
  label: string;
  required: boolean;
  name: string;
  options: { id: string; label: string }[];
};

type CustomInstance = FormElementInstance<SelectFieldExtraAttr>;

interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
  options: { id: string; label: string }[];
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

  // Manage the dynamic array of select options.
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  useEffect(() => {
    form.reset({
      label: elementInstance.extraAttr.label,
      name: elementInstance.extraAttr.name,
      required: elementInstance.extraAttr.required,
      options: elementInstance.extraAttr.options,
    });
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
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
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
      <div>
        <h4>Select Options</h4>
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
              name={`options.${index}.label`}
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
        {elementInstance.extraAttr.options.length > 0 ? (
          elementInstance.extraAttr.options.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
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

const DesignerComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
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
        {elementInstance.extraAttr.options.length > 0 ? (
          elementInstance.extraAttr.options.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
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
      options: [
        { id: "option-1", label: "Option 1" },
        { id: "option-2", label: "Option 2" },
        { id: "option-3", label: "Option 3" },
      ],
    },
  }),
  designerBtnElement: { icon: MdArrowDropDown, label: "SelectField" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
