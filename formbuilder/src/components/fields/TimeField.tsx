// fields/TimeField.tsx
import React, { useEffect } from "react";
import {
  FormElement,
  FormElementInstance,
  FormElementKey,
  InputSize,
} from "../FormElements";
import { MdAccessTime } from "react-icons/md";
import { TextField, FormControl, Switch } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";
import { capitalizeFirstLetter } from "../utils/utils";

// Use one key for TimeField.
const type: FormElementKey = "Time";

// Define the extra attributes for a TimeField.
export type TimeFieldExtraAttr = {
  label: string;
  required: boolean;
  name: string;
};

type CustomInstance = FormElementInstance<TimeFieldExtraAttr>;

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
      <TextField
        type="time"
        size="small"
        fullWidth
        label={capitalizeFirstLetter(elementInstance.extraAttr.label)}
        required={elementInstance.extraAttr.required}
        InputLabelProps={{ shrink: true }}
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
        width: "70%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        type="time"
        size="small"
        fullWidth
        variant="outlined"
        label={capitalizeFirstLetter(elementInstance.extraAttr.label)}
        required={elementInstance.extraAttr.required}
        InputLabelProps={{ shrink: true }}
      />
    </div>
  );
};

export const TimeFieldFormElement: FormElement<TimeFieldExtraAttr> = {
  type,
  construct: (id: string, sizeOverride?: InputSize) => ({
    id,
    type,
    size: sizeOverride || "100%",
    extraAttr: {
      label: "Time Field",
      required: false,
      name: "time-field",
    },
  }),
  designerBtnElement: { icon: MdAccessTime, label: "TimeField" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
