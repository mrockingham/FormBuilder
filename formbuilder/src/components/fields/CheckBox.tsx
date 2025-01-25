import React, { useEffect } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
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
import useBuilderStore from "../../stores/designBuilderStore";
import { Controller, useForm } from "react-hook-form";

const typeSmall: ElementsType = "CheckboxSmall";
const typeMedium: ElementsType = "CheckboxMedium";
const typeLarge: ElementsType = "CheckboxLarge";

const extraAttr = {
  label: "Text Field",
  required: false,
  name: "text-field",
};
interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
}

type CustomInstance = FormElementInstance & { extraAttr: typeof extraAttr };

const PropertiesComponent = ({ elementInstance }: { elementInstance: any }) => {
  const element = elementInstance as CustomInstance;

  const { updateElement } = useBuilderStore();

  const form = useForm<PropertiesFormData>({
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttr.label,
      name: element.extraAttr.name,
      required: element.extraAttr.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttr);
  }, [element, form]);

  const applyChanges = (values: PropertiesFormData) => {
    updateElement(element.id, {
      ...element,
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
      onSubmit={(e: { preventDefault: () => any }) => e.preventDefault()}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Controller
          control={form.control}
          name="label"
          render={({ field }) => (
            <div>
              <TextField
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
                label="Label"
                {...field}
              />
            </div>
          )}
        ></Controller>

        <Controller
          control={form.control}
          name="required"
          render={({ field }) => (
            <div>
              <FormControl>
                <Switch checked={field.value} onChange={field.onChange} />
              </FormControl>
              <div>Required</div>
            </div>
          )}
        ></Controller>
      </div>
    </form>
  );
};

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  return (
    <div>
      <h3>{element.extraAttr.name}</h3>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      </FormGroup>
    </div>
  );
};
const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  return (
    <div>
      <h3>{element.extraAttr.name}</h3>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      </FormGroup>
    </div>
  );
};

export const CheckBoxFormElementSmall: FormElement = {
  type: typeSmall,
  construct: (id: string) => ({
    id,
    type: typeSmall,
    size: 1,
    extraAttr: {
      label: "checkBox Small",
      required: false,
      name: "CheckBox Small",
    },
  }),
  designerBtnElement: { icon: IoIosCheckboxOutline, label: "1" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
export const CheckBoxFormElementMedium: FormElement = {
  type: typeMedium,
  construct: (id: string) => ({
    id,
    type: typeMedium,
    size: 2,
    extraAttr: {
      label: "checkBox Small",
      required: false,
      name: "CheckBox Small",
    },
  }),
  designerBtnElement: { icon: IoIosCheckboxOutline, label: "2" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
export const CheckBoxFormElementLarge: FormElement = {
  type: typeLarge,
  construct: (id: string) => ({
    id,
    type: typeLarge,
    size: 3,
    extraAttr: {
      label: "checkBox Small",
      required: false,
      name: "CheckBox Small",
    },
  }),
  designerBtnElement: { icon: IoIosCheckboxOutline, label: "3" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
