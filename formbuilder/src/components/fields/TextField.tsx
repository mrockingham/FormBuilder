// fields/TextField.tsx
import React, { useEffect } from "react";
import {
  FormElement,
  FormElementInstance,
  FormElementKey,
  InputSize,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { TextField, FormControl, Switch, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";
import { capitalizeFirstLetter } from "../utils/utils";

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
    <div
      style={{
        width: "100%",
        // padding: "5px",
        // marginTop: "10px",
        backgroundColor: "white",
      }}
    >
      <Box gap={"5px"} display={"flex"} flexDirection={"column"}>
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
  }),
  designerBtnElement: { icon: MdTextFields, label: "TextField" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
