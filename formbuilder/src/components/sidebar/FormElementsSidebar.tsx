import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "../FormElements";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

const FormElementsSidebar = () => {
  return (
    <div>
      <div style={{ padding: "10px" }}>Input Elements</div>
      <Accordion>
        <AccordionSummary
          expandIcon={<FaChevronDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Text Input</Typography>
        </AccordionSummary>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingBottom: "10px",
          }}
        >
          <SidebarBtnElement formElement={FormElements.TextFieldSmall} />
          <SidebarBtnElement formElement={FormElements.TextFieldMedium} />
          <SidebarBtnElement formElement={FormElements.TextFieldLarge} />
        </div>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<FaChevronDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Check Box</Typography>
        </AccordionSummary>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingBottom: "10px",
          }}
        >
          <SidebarBtnElement formElement={FormElements.CheckboxSmall} />
          <SidebarBtnElement formElement={FormElements.CheckboxMedium} />
          <SidebarBtnElement formElement={FormElements.CheckboxLarge} />
        </div>
      </Accordion>
    </div>
  );
};

export default FormElementsSidebar;
