import React, { useState } from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "../FormElements";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";

import SideBarTextInputBtn from "./Elements/SideBarTextInputBtn";

import SideBarMultiSelectInputBtn from "./Elements/SideBarMultiSelectInputBtn";
import SideBarDateTimeBtn from "./Elements/SideBarDateTimeBtn";

const FormElementsSidebar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexGrow: 1,
        // borderRadius: "50px",
        // backgroundColor: "white",
        background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
      }}
    >
      <div style={{ padding: "10px" }}>Input Elements</div>
      <Divider style={{ marginBottom: "10px" }} />
      <SideBarTextInputBtn />
      <SideBarMultiSelectInputBtn />
      <SideBarDateTimeBtn />

      {/* <Accordion>
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
      </Accordion> */}
    </div>
  );
};

export default FormElementsSidebar;
