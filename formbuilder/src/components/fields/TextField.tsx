import React, { useEffect } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { FormControl, TextField, Switch } from "@mui/material";
import { Form } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";
import { capitalizeFirstLetter } from "../utils/utils";

const typeSmall: ElementsType = "TextFieldSmall";
const typeMedium: ElementsType = "TextFieldMedium";
const typeLarge: ElementsType = "TextFieldLarge";

const extraAttr = {
  label: "Text Field",
  required: false,
  name: "text-field",
};

type CustomInstance = FormElementInstance & { extraAttr: typeof extraAttr };

interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
}

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
          name="name"
          render={({ field }) => (
            <div>
              <TextField
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
                label="Name"
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

      {/* {element.type === "TextFieldSmall" && (
            <FormControl>
            <Switch checked={element.size === 1} />
            </FormControl>
        )} */}
    </form>
  );
  //   return <div>Form Properties for {element.extraAttr.label}</div>;
};

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;

  return (
    <div style={{ width: "100%" }}>
      <div>{capitalizeFirstLetter(element?.extraAttr?.name)}</div>

      <TextField
        size="small"
        style={{
          width: "100%",
          height: "40px",
        }}
        label={capitalizeFirstLetter(element?.extraAttr?.label)}
        required={element?.extraAttr?.required}
      />
    </div>
  );
};

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  console.log("element", element);
  return (
    <div style={{ width: "100%", marginRight: "30px", padding: "5px" }}>
      <div>{capitalizeFirstLetter(element.extraAttr.name)}</div>
      <div style={{ maxHeight: "30px", width: "100%" }}>
        <TextField
          // variant="standard"
          size="small"
          style={{
            // border: "1px solid limegreen",
            width: "100%",
            marginRight: "20px",
            marginTop: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.0)",
            border: "1px solid limegreen",

            boxShadow: `-2px 5px 16px #b8beb3,
             -16px -10px 16px #ffffff`,
          }}
          label={capitalizeFirstLetter(element.extraAttr.label)}
          required={element.extraAttr.required}
        />
        {/* <input
          type="text"
          style={{
            // border: "1px solid limegreen",
            width: "100%",
            marginRight: "20px",
            marginTop: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.0)",
            border: "1px solid limegreen",

            boxShadow: `1px 5px 16px #b8beb3,
             -16px -10px 16px #ffffff`,
          }}
          placeholder={`${capitalizeFirstLetter(element.extraAttr.label)}...`}
        /> */}
      </div>
    </div>
  );
};

export const TextFieldFormElementSmall: FormElement = {
  type: typeSmall,
  construct: (id: string) => ({
    id,
    type: typeSmall,
    size: 1,
    extraAttr: {
      label: "Text FieldSmall",
      required: false,
      name: "text-fieldSmall",
    },
  }),
  designerBtnElement: { icon: MdTextFields, label: "1" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

export const TextFieldFormElementMedium: FormElement = {
  type: typeMedium,
  construct: (id: string) => ({
    id,
    type: typeMedium,
    size: 2,

    extraAttr: {
      label: "Text Field Medium",
      required: false,
      name: "text-field Medium",
    },
  }),
  designerBtnElement: { icon: MdTextFields, label: "2" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
export const TextFieldFormElementLarge: FormElement = {
  type: typeLarge,
  construct: (id: string) => ({
    id,
    type: typeLarge,
    size: 3,
    extraAttr: {
      label: "Text Field Large",
      required: false,
      name: "text-field Large",
    },
  }),
  designerBtnElement: { icon: MdTextFields, label: "3" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
