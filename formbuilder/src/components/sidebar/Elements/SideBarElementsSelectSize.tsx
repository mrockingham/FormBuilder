import React from "react";
import { FormElements, InputSize } from "../../FormElements";
import SidebarBtnElement from "../SidebarBtnElement";
import { Box, Divider } from "@mui/material";
import { CiHome } from "react-icons/ci";

interface SideBarElementsSelectSizeProps {
  input: string;
  setShowSelectedElement: any;
}

// Define the available sizes for each input type.
// You can adjust these arrays as needed.
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

const checkboxSizes: { label: string; size: InputSize }[] = [
  { label: "XX-S", size: "1/6" },
  { label: "X-S", size: "1/4" },
  { label: "S", size: "1/3" },
  { label: "M", size: "1/2" },
  { label: "L", size: "2/3" },
  { label: "X-L", size: "3/4" },
  { label: "XX-L", size: "5/6" },
  { label: "Full", size: "100%" },
];

const SideBarElementsSelectSize: React.FC<SideBarElementsSelectSizeProps> = ({
  input,
  setShowSelectedElement,
}) => {
  const renderElementInputSizeButtons = () => {
    switch (input) {
      case "textInput":
        return textInputSizes.map((option) => (
          <SidebarBtnElement
            key={`text-${option.size}`}
            formElement={FormElements.TextField}
            sizeOverride={option.size}
            labelOverride={option.label}
          />
        ));
      case "textAreaInput":
        return textInputSizes.map((option) => (
          <SidebarBtnElement
            key={`text-area-${option.size}`}
            formElement={FormElements.TextArea}
            sizeOverride={option.size}
            labelOverride={option.label}
          />
        ));
      case "checkboxInput":
        return checkboxSizes.map((option) => (
          <SidebarBtnElement
            key={`checkbox-${option.size}`}
            formElement={FormElements.Checkbox}
            sizeOverride={option.size}
            labelOverride={option.label}
          />
        ));
      case "radioInput":
        return checkboxSizes.map((option) => (
          <SidebarBtnElement
            key={`radio-${option.size}`}
            formElement={FormElements.Radio}
            sizeOverride={option.size}
            labelOverride={option.label}
          />
        ));
      case "selectInput":
        return textInputSizes.map((option) => (
          <SidebarBtnElement
            key={`select-${option.size}`}
            formElement={FormElements.Select}
            sizeOverride={option.size}
            labelOverride={option.label}
          />
        ));
      case "dateInput":
        return textInputSizes.map((option) => (
          <SidebarBtnElement
            key={`date-${option.size}`}
            formElement={FormElements.Date}
            sizeOverride={option.size}
            labelOverride={option.label}
          />
        ));
      case "timeInput":
        return textInputSizes.map((option) => (
          <SidebarBtnElement
            key={`time-${option.size}`}
            formElement={FormElements.Time}
            sizeOverride={option.size}
            labelOverride={option.label}
          />
        ));
      case "imageInput":
        return textInputSizes.map((option) => (
          <SidebarBtnElement
            key={`image-${option.size}`}
            formElement={FormElements.Image}
            sizeOverride={option.size}
            labelOverride={option.label}
          />
        ));
      case "videoInput":
        return textInputSizes.map((option) => (
          <SidebarBtnElement
            key={`video-${option.size}`}
            formElement={FormElements.Video}
            sizeOverride={option.size}
            labelOverride={option.label}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <Divider sx={{ mb: 2 }} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m={2}
      >
        <div>Input Size</div>
        <CiHome
          onClick={() => {
            setShowSelectedElement({ showElements: false, Element: "" });
          }}
          size={20}
          color="dodgerblue"
          style={{ cursor: "pointer" }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m={2}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          pb={1}
          gap={2}
          flexWrap="wrap"
        >
          {renderElementInputSizeButtons()}
        </Box>
      </Box>
    </Box>
  );
};

export default SideBarElementsSelectSize;
