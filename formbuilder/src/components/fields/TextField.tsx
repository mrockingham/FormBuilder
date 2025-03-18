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
import { TextField, FormControl, Switch, Box, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { MdOutlineExpandMore } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import useBuilderStore from "../../stores/designBuilderStore";
import { capitalizeFirstLetter } from "../utils/utils";
import SidebarBtnElement from "../sidebar/SidebarBtnElement"; // import the component
import { addQuestion } from "../../services/controllers/questionController";

// Use one key for TextField.
const type: FormElementKey = "TextField";

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "lightblue",
      boxShadow: "0 0 10px lightgray",
      borderRadius: "16px",
      height: "90%",
    },
    "& input ": {
      padding: "12px",
      fontSize: "14px",
    },
  },
};

// Define the extra attributes for a TextField including new question options.
export type TextFieldExtraAttr = {
  label: string;
  required: boolean;
  name: string;
  placeholder: string;
  options?: string; // Could be a comma-separated string or JSON string
  question_text?: string;
  question_type_id?: number;
  min_length?: number;
  max_length?: number;
  validation_type?: string;
  validation_message?: string;
  image_path?: string;
  style?: string;
  is_ffs?: boolean;
  form_field_size?: string;
  question_type?: string;
};

type CustomInstance = FormElementInstance<TextFieldExtraAttr>;

interface PropertiesFormData {
  label: string;
  name: string;
  required: boolean;
  options: string;
  question_text: string;
  question_type_id: number;
  min_length: number;
  max_length: number;
  validation_type: string;
  validation_message: string;
  image_path: string;
  style: string;
  is_ffs: boolean;
  form_field_size: string;
  question_type: string;
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
      options: elementInstance.extraAttr.options || "",
      question_text: elementInstance.extraAttr.question_text || "",
      question_type_id: elementInstance.extraAttr.question_type_id || 0,
      min_length: elementInstance.extraAttr.min_length || 0,
      max_length: elementInstance.extraAttr.max_length || 0,
      validation_type: elementInstance.extraAttr.validation_type || "",
      validation_message: elementInstance.extraAttr.validation_message || "",
      image_path: elementInstance.extraAttr.image_path || "",
      style: elementInstance.extraAttr.style || "",
      is_ffs: elementInstance.extraAttr.is_ffs || false,
      form_field_size: elementInstance.extraAttr.form_field_size || "100%",
      question_type: elementInstance.extraAttr.question_type || "",
    },
  });

  useEffect(() => {
    form.reset({
      label: elementInstance.extraAttr.label,
      name: elementInstance.extraAttr.name,
      required: elementInstance.extraAttr.required,
      options: elementInstance.extraAttr.options || "",
      question_text: elementInstance.extraAttr.question_text || "",
      question_type_id: elementInstance.extraAttr.question_type_id || 0,
      min_length: elementInstance.extraAttr.min_length || 0,
      max_length: elementInstance.extraAttr.max_length || 0,
      validation_type: elementInstance.extraAttr.validation_type || "",
      validation_message: elementInstance.extraAttr.validation_message || "",
      image_path: elementInstance.extraAttr.image_path || "",
      style: elementInstance.extraAttr.style || "",
      is_ffs: elementInstance.extraAttr.is_ffs || false,
      form_field_size: elementInstance.extraAttr.form_field_size || "100%",
      question_type: elementInstance.extraAttr.question_type || "",
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
        options: values.options,
        question_text: values.question_text,
        question_type_id: values.question_type_id,
        min_length: values.min_length,
        max_length: values.max_length,
        validation_type: values.validation_type,
        validation_message: values.validation_message,
        image_path: values.image_path,
        style: values.style,
        is_ffs: values.is_ffs,
        form_field_size: values.form_field_size,
        question_type: values.question_type,
      },
    });
  };

  console.log("form", form.getValues());

  const formValues = form.getValues();

  const handleSaveQuestion = async () => {
    try {
      const payload = {
        question_text: formValues.label,
        question_type_id: formValues.question_type_id,
        min_length: formValues.min_length,
        max_length: formValues.max_length,
        validation_type: formValues.validation_type,
        validation_message: formValues.validation_message,
        image_path: formValues.image_path,
        style: formValues.style,
        is_ffs: formValues.is_ffs,
        question_name: "text-field", // or any other field you want to send
        form_field_size: formValues.form_field_size,
        question_type: formValues.question_type,
      };

      // Here, we're using addQuestion to save the question.
      // You might replace this with updateQuestion if the question exists.
      await addQuestion(payload);
      alert("Question saved successfully!");
      // Optionally navigate, e.g., navigate(`/builder/${selectedElement.id}`);
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save question.");
    }
  };

  return (
    <form
      onBlur={form.handleSubmit(applyChanges)}
      onSubmit={(e) => e.preventDefault()}
      // style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Box
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px ",
        }}
      >
        <Controller
          control={form.control}
          name="label"
          render={({ field }) => (
            <TextField
              sx={textFieldStyle}
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
              sx={textFieldStyle}
              label="Name"
              {...field}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          )}
        />

        {/* New fields */}
        {/* <Controller
          control={form.control}
          name="options"
          render={({ field }) => (
            <TextField
            sx={textFieldStyle}
              label="Options"
              {...field}
              helperText="Comma-separated values or JSON"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          )}
        /> */}

        {/* <Controller
          control={form.control}
          name="question_text"
          render={({ field }) => (
            <TextField
            sx={textFieldStyle}
              label="Question Text"
              {...field}
              helperText="The text of the question"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          )}
        /> */}

        {/* <Controller
          control={form.control}
          name="question_type_id"
          render={({ field }) => (
            <TextField
            sx={textFieldStyle}
              label="Question Type ID"
              type="number"
              {...field}
              helperText="Numeric identifier for question type"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          )}
        /> */}

        <Controller
          control={form.control}
          name="min_length"
          render={({ field }) => (
            <TextField
              sx={textFieldStyle}
              label="Minimum Length"
              type="number"
              {...field}
              helperText="Minimum allowed length"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="max_length"
          render={({ field }) => (
            <TextField
              sx={textFieldStyle}
              label="Maximum Length"
              type="number"
              {...field}
              helperText="Maximum allowed length"
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          )}
        />

        {/* <Controller
          control={form.control}
          name="validation_type"
          render={({ field }) => (
            <TextField
            sx={textFieldStyle}
              label="Validation Type"
              {...field}
              helperText="E.g., regex, email, etc."
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          )}
        /> */}

        {/* Size Selector using SidebarBtnElement */}
        <Box>
          <div>Size:</div>
          <Box display="flex" gap={1} flexWrap="wrap">
            {textInputSizes.map((option) => (
              <Box
                key={option.size}
                onClick={() => {
                  // Update the form value for form_field_size
                  form.setValue("form_field_size", option.size);
                  // Optionally, you can update the builder store immediately:
                  updateElement(elementInstance.id, {
                    ...elementInstance,
                    size: option.size,
                    extraAttr: {
                      ...elementInstance.extraAttr,
                      form_field_size: option.size,
                    },
                  });
                }}
                sx={{ cursor: "pointer" }}
              >
                <SidebarBtnElement
                  formElement={FormElements.TextField}
                  sizeOverride={option.size}
                  labelOverride={option.label}
                  disableDrag={true}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<MdOutlineExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">More Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Controller
              control={form.control}
              name="validation_message"
              render={({ field }) => (
                <TextField
                  sx={textFieldStyle}
                  label="Validation Message"
                  {...field}
                  helperText="Message when validation fails"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              )}
            />
            <Controller
              control={form.control}
              name="image_path"
              render={({ field }) => (
                <TextField
                  sx={textFieldStyle}
                  label="Image Pathhhhh"
                  {...field}
                  helperText="Path or URL to an image"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              )}
            />
            <Controller
              control={form.control}
              name="style"
              render={({ field }) => (
                <TextField
                  sx={textFieldStyle}
                  label="Style"
                  {...field}
                  helperText="Custom CSS styles"
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
            <Controller
              control={form.control}
              name="is_ffs"
              render={({ field }) => (
                <Box display="flex" alignItems="center" gap="8px">
                  <Switch checked={field.value} onChange={field.onChange} />
                  <span>Is FFS</span>
                </Box>
              )}
            />
          </AccordionDetails>
        </Accordion>

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveQuestion}
          >
            Save Question
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => removeElement(elementInstance.id)}
          >
            Delete Element
          </Button>
        </Box>
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
        // sx={textFieldStyle}
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
          sx={textFieldStyle}
          style={{ borderColor: "dodgerblue", backgroundColor: "white" }}
          size="small"
          fullWidth
          variant="outlined"
          // label={capitalizeFirstLetter(
          //   elementInstance.extraAttr.placeholder || "Placeholder..."
          // )}
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
      // New properties with default values:
      options: "",
      question_text: "",
      question_type_id: 0,
      min_length: 0,
      max_length: 0,
      validation_type: "",
      validation_message: "",
      image_path: "",
      style: "",
      is_ffs: false,
      form_field_size: sizeOverride || "100%",
    },
    formComponent: FormComponent,
    designerCompontent: DesignerComponent,
  }),
  designerBtnElement: { icon: MdTextFields, label: "TextField" },
  designerCompontent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};
