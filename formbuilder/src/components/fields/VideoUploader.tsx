// fields/VideoUploader.tsx
import React, { useState, useEffect } from "react";
import {
  FormElement,
  FormElementInstance,
  FormElementKey,
  InputSize,
} from "../FormElements";
import { MdVideocam } from "react-icons/md";
import { TextField, FormControl, Switch } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";
import { capitalizeFirstLetter } from "../utils/utils";

// Use one key for VideoUploader.
const type: FormElementKey = "Video";

// Define the extra attributes for a VideoUploader.
export type VideoUploaderExtraAttr = {
  label: string;
  required: boolean;
  name: string;
  videoUrl: string; // Default video URL (if any)
};

type CustomInstance = FormElementInstance<VideoUploaderExtraAttr>;

interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
  videoUrl: string;
}

// Properties editor for the VideoUploader.
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
      videoUrl: elementInstance.extraAttr.videoUrl,
    },
  });

  useEffect(() => {
    form.reset({
      label: elementInstance.extraAttr.label,
      name: elementInstance.extraAttr.name,
      required: elementInstance.extraAttr.required,
      videoUrl: elementInstance.extraAttr.videoUrl,
    });
  }, [elementInstance, form]);

  const applyChanges = (values: PropertiesFormData) => {
    updateElement(elementInstance.id, {
      ...elementInstance,
      extraAttr: {
        label: values.label,
        name: values.name,
        required: values.required,
        videoUrl: values.videoUrl,
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
        name="videoUrl"
        render={({ field }) => (
          <TextField
            label="Default Video URL"
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

// Form (preview) component for the VideoUploader.
const FormComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  const [preview, setPreview] = useState(elementInstance.extraAttr.videoUrl);

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
        <video
          controls
          src={preview}
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
          <span>No video uploaded</span>
        </div>
      )}
      <input type="file" accept="video/*" onChange={handleFileChange} />
    </FormControl>
  );
};

// Designer component for the VideoUploader.
const DesignerComponent: React.FC<{ elementInstance: CustomInstance }> = ({
  elementInstance,
}) => {
  return (
    <FormControl fullWidth required={elementInstance.extraAttr.required}>
      <div style={{ marginBottom: "8px" }}>
        <label>{capitalizeFirstLetter(elementInstance.extraAttr.label)}</label>
      </div>
      {elementInstance.extraAttr.videoUrl ? (
        <video
          controls
          src={elementInstance.extraAttr.videoUrl}
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
          <span>No video uploaded</span>
        </div>
      )}
    </FormControl>
  );
};

export const VideoUploaderFormElement: FormElement<VideoUploaderExtraAttr> = {
  type,
  construct: (id: string, sizeOverride?: InputSize) => ({
    id,
    type,
    size: sizeOverride || "100%",
    extraAttr: {
      label: "Video Uploader",
      required: false,
      name: "video-uploader",
      videoUrl: "",
    },
  }),
  designerBtnElement: { icon: MdVideocam, label: "Video" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
