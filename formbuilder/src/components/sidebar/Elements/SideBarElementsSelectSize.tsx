import React from "react";
import { FormElements } from "../../FormElements";
import SidebarBtnElement from "../SidebarBtnElement";
import { Box, Button, Divider } from "@mui/material";
import { CiHome } from "react-icons/ci";

const SideBarElementsSelectSize = (props: any) => {
  const { input, setShowSelectedElement } = props;

  const renderElementInputSizeButtons = () => {
    switch (input) {
      case "textInput":
        return (
          <>
            <SidebarBtnElement formElement={FormElements.TextFieldSmall} />
            <SidebarBtnElement formElement={FormElements.TextFieldMedium} />
            <SidebarBtnElement formElement={FormElements.TextFieldLarge} />
          </>
        );

      case "checkboxInput":
        return (
          <>
            <SidebarBtnElement formElement={FormElements.CheckboxSmall} />
            <SidebarBtnElement formElement={FormElements.CheckboxMedium} />
            <SidebarBtnElement formElement={FormElements.CheckboxLarge} />
          </>
        );
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <Divider style={{ marginBottom: "10px" }} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
        m={2}
      >
        <div>Input Size</div>

        <CiHome
          onClick={() => setShowSelectedElement(false)}
          size={20}
          color="limegreen"
          style={{ cursor: "pointer" }}
        />
      </Box>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: "10px",
        }}
      >
        {renderElementInputSizeButtons()}
      </div>
    </Box>
  );
};

export default SideBarElementsSelectSize;
