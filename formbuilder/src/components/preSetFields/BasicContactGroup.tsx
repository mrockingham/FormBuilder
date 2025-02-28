// components/Presets/BasicContactPresetBtn.tsx
import React from "react";
import { Button, Box } from "@mui/material";
import { MdContacts } from "react-icons/md";
import useBuilderStore from "../../stores/designBuilderStore";
import { FormElements } from "../../components/FormElements";
import { idGenerator } from "../../components/utils/idGenerator";

const BasicContactPresetBtn: React.FC = () => {
  const { elements, addElement } = useBuilderStore();

  const handleAddPreset = () => {
    const currentLength = elements.length;
    const idPrefix = idGenerator(); // Generates a unique prefix

    // Create First Name field with default size "1/4"
    const firstNameField = FormElements.TextField.construct(
      `${idPrefix}-firstName`,
      "1/4"
    );
    firstNameField.extraAttr = {
      label: "First Name",
      required: true,
      name: "firstName",
    };

    // Create Last Name field with default size "1/4"
    const lastNameField = FormElements.TextField.construct(
      `${idPrefix}-lastName`,
      "1/4"
    );
    lastNameField.extraAttr = {
      label: "Last Name",
      required: true,
      name: "lastName",
    };

    // Create Email field with default size "1/4"
    const emailField = FormElements.TextField.construct(
      `${idPrefix}-email`,
      "1/4"
    );
    emailField.extraAttr = {
      label: "Email",
      required: true,
      name: "email",
    };

    // Add the fields to the designer.
    addElement(currentLength, firstNameField);
    addElement(currentLength + 1, lastNameField);
    addElement(currentLength + 2, emailField);
  };

  return (
    <Box>
      <Button
        onClick={handleAddPreset}
        variant="contained"
        startIcon={<MdContacts />}
      >
        Basic
      </Button>
    </Box>
  );
};

export default BasicContactPresetBtn;
