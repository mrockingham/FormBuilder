// fields/ImageUploader.tsx
import React, { useState, useEffect } from "react";
import {
  FormElement,
  FormElementInstance,
  FormElementKey,
  InputSize,
} from "../FormElements";
import { MdImage } from "react-icons/md";
import { TextField, FormControl, Switch } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";
import { capitalizeFirstLetter } from "../utils/utils";

// Use one key for ImageUploader.
const type: FormElementKey = "Image";

// Define the extra attributes for an ImageUploader.
export type ImageUploaderExtraAttr = {
  label: string;
  required: boolean;
  name: string;
  imageUrl: string; // Default image URL (if any)
};

type CustomInstance = FormElementInstance<ImageUploaderExtraAttr>;

interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
  imageUrl: string;
}

// Properties editor for the ImageUploader.
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
      imageUrl: elementInstance.extraAttr.imageUrl,
    },
  });

  useEffect(() => {
    form.reset({
      label: elementInstance.extraAttr.label,
      name: elementInstance.extraAttr.name,
      required: elementInstance.extraAttr.required,
      imageUrl: elementInstance.extraAttr.imageUrl,
    });
  }, [elementInstance, form]);

  const applyChanges = (values: PropertiesFormData) => {
    updateElement(elementInstance.id, {
      ...elementInstance,
      extraAttr: {
        label: values.label,
        name: values.name,
        required: values.required,
        imageUrl: values.imageUrl,
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
        name="imageUrl"
        render={({ field }) => (
          <TextField
            label="Default Image URL"
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

// Form (preview) component for the ImageUploader.
const FormComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  const [preview, setPreview] = useState(elementInstance.extraAttr.imageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <FormControl fullWidth required={elementInstance.extraAttr.required}>
      <div style={{ marginBottom: "8px" }}>
        <label>{capitalizeFirstLetter(elementInstance.extraAttr.label)}</label>
      </div>
      {preview ? (
        <img
          src={preview}
          alt="Uploaded"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "contain",
            marginBottom: "8px",
          }}
        />
      ) : (
        <div
          style={{
            border: "1px dashed gray",
            padding: "20px",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          <span>No image uploaded</span>
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </FormControl>
  );
};

// Designer component for the ImageUploader.
const DesignerComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <FormControl fullWidth required={elementInstance.extraAttr.required}>
      <div style={{ marginBottom: "8px" }}>
        <label>{capitalizeFirstLetter(elementInstance.extraAttr.label)}</label>
      </div>
      {elementInstance.extraAttr.imageUrl ? (
        <img
          src={elementInstance.extraAttr.imageUrl}
          alt="Default"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "contain",
          }}
        />
      ) : (
        <div
          style={{
            border: "1px dashed gray",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <span>No image uploaded</span>
        </div>
      )}
    </FormControl>
  );
};

export const ImageUploaderFormElement: FormElement<ImageUploaderExtraAttr> = {
  type,
  construct: (id: string, sizeOverride?: InputSize) => ({
    id,
    type,
    size: sizeOverride || "100%",
    extraAttr: {
      label: "Image Uploader",
      required: false,
      name: "image-uploader",
      imageUrl: "",
    },
  }),
  designerBtnElement: { icon: MdImage, label: "Image" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
