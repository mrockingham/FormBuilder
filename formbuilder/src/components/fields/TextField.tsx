// fields/TextField.tsx
import React, { useEffect } from "react";
import {
  FormElement,
  FormElementInstance,
  FormElementKey,
  InputSize,
  FormElements, // for reference when passing to SidebarBtnElement
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import {
  TextField,
  FormControl,
  Switch,
  Box,
  Button,
  LinearProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";
import { capitalizeFirstLetter } from "../utils/utils";
import SidebarBtnElement from "../sidebar/SidebarBtnElement"; // import the component

// Use one key for TextField.
const type: FormElementKey = "TextField";

// Define the extra attributes for a TextField.
export type TextFieldExtraAttr = {
  label: string;
  required: boolean;
  name: string;
  placeholder: string;
};

type CustomInstance = FormElementInstance<TextFieldExtraAttr>;

interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
}

const textInputSizes: { label: string; size: InputSize }[] = [
  { label: "XX-S", size: "1/6" },
  { label: "X-S", size: "1/4" },
  { label: "S", size: "1/3" },
  { label: "M", size: "1/2" },
  { label: "L", size: "2/3" },
  { label: "X-L", size: "3/4" },
  { label: "XX-L", size: "5/6" },
  { label: "Full", size: "100%" },
];

const PropertiesComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  const { updateElement, removeElement } = useBuilderStore();

  const form = useForm<PropertiesFormData>({
    mode: "onBlur",
    defaultValues: {
      label: elementInstance.extraAttr.label,
      name: elementInstance.extraAttr.name,
      required: elementInstance.extraAttr.required,
    },
  });

  useEffect(() => {
    form.reset({
      label: elementInstance.extraAttr.label,
      name: elementInstance.extraAttr.name,
      required: elementInstance.extraAttr.required,
    });
  }, [elementInstance, form]);

  const applyChanges = (values: PropertiesFormData) => {
    updateElement(elementInstance.id, {
      ...elementInstance,
      extraAttr: {
        ...elementInstance.extraAttr,
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

      <Controller
        control={form.control}
        name="required"
        render={({ field }) => (
          <Box display="flex" alignItems="center" gap="8px">
            <FormControl>
              <Switch checked={field.value} onChange={field.onChange} />
            </FormControl>
            <span>Required</span>
          </Box>
        )}
      />

      {/* Size Selector using SidebarBtnElement */}
      <Box>
        <div>Size:</div>
        <Box display="flex" gap={1} flexWrap="wrap">
          {textInputSizes.map((option) => (
            // Wrap the button with an onClick that updates the size.
            <Box
              key={option.size}
              onClick={() =>
                updateElement(elementInstance.id, {
                  ...elementInstance,
                  size: option.size,
                })
              }
              sx={{ cursor: "pointer" }}
            >
              <SidebarBtnElement
                formElement={FormElements.TextField}
                sizeOverride={option.size}
                labelOverride={option.label}
                disableDrag={true} // disables draggable behavior in properties editor
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box mt={2}>
        <Button
          variant="contained"
          color="error"
          onClick={() => removeElement(elementInstance.id)}
        >
          Delete Element
        </Button>
      </Box>
    </form>
  );
};

const FormComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <div>{elementInstance.extraAttr.label}</div>
      <TextField
        size="small"
        fullWidth
        label={capitalizeFirstLetter(elementInstance.extraAttr.placeholder)}
        required={elementInstance.extraAttr.required}
      />
    </div>
  );
};

const DesignerComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <div style={{ width: "100%", backgroundColor: "white" }}>
      <Box gap="5px" display="flex" flexDirection="column">
        <div>{elementInstance.extraAttr.label || "Label"}</div>
        <TextField
          style={{ borderColor: "limegreen" }}
          size="small"
          fullWidth
          variant="outlined"
          label={capitalizeFirstLetter(
            elementInstance.extraAttr.placeholder || "Placeholder..."
          )}
          required={elementInstance.extraAttr.required}
        />
      </Box>
    </div>
  );
};

export const TextFieldFormElement: FormElement<TextFieldExtraAttr> = {
  type,
  construct: (id: string, sizeOverride?: InputSize) => ({
    id,
    type,
    size: sizeOverride || "100%", // default size if no override is provided
    extraAttr: {
      label: "Text Field",
      placeholder: "Placeholder",
      required: false,
      name: "text-field",
    },
    formComponent: FormComponent,
    designerCompontent: DesignerComponent,
  }),
  designerBtnElement: { icon: MdTextFields, label: "TextField" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
