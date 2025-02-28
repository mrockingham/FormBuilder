import React, { useState } from "react";
import {
  Box,
  Divider,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

import SideBarTextInputBtn from "./Elements/SideBarTextInputBtn";
import SideBarMultiSelectInputBtn from "./Elements/SideBarMultiSelectInputBtn";
import SideBarDateTimeBtn from "./Elements/SideBarDateTimeBtn";
import SideBarImageInputBtn from "./Elements/SideBarImageInputBtn";
import SidebarBtnElement from "./SidebarBtnElement";
import BasicContactPresetBtn from "../preSetFields/BasicContactGroup";

// A helper component for rendering the tab panels.
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const FormElementsSidebar = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexGrow: 1,
        background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
      }}
    >
      {/* Tab switcher */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="form element tabs"
        >
          <Tab label="Scratch" />
          <Tab label="Preset" />
        </Tabs>
      </Box>

      {/* Scratch view: current elements */}
      <TabPanel value={tabValue} index={0}>
        <div style={{ padding: "10px" }}>Elements</div>
        <Divider style={{ marginBottom: "10px" }} />
        <SideBarTextInputBtn />
        <Divider style={{ marginBottom: "10px" }} />
        <SideBarMultiSelectInputBtn />
        <Divider style={{ marginBottom: "10px" }} />
        <SideBarDateTimeBtn />
        <Divider style={{ marginBottom: "10px" }} />
        <SideBarImageInputBtn />
      </TabPanel>

      {/* Preset view: preset form fields and groups */}
      <TabPanel value={tabValue} index={1}>
        <div style={{ padding: "10px" }}>Contacts</div>
        <Divider style={{ marginBottom: "10px" }} />

        <BasicContactPresetBtn />
        {/* Example preset group */}
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<FaChevronDown />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Contacts</Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion> */}
      </TabPanel>
    </div>
  );
};

export default FormElementsSidebar;
