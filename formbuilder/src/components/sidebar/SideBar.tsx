import React from "react";
import { FormElements } from "../FormElements";
import SidebarBtnElement from "./SidebarBtnElement";
import useBuilderStore from "../../stores/designBuilderStore";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSideBar from "./PropertiesFormSidebar";

const SideBar = () => {
  const { selectedElement } = useBuilderStore();
  return (
    <div
      style={{
        height: "100%",
        minWidth: "330px",
        maxWidth: "350px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "10px",
        boxShadow: `20px 20px 60px #c6cdc1,
             -20px -20px 60px #ffffff`,
        overflowY: "auto",
        backgroundColor: "white",
      }}
    >
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSideBar />}
    </div>
  );
};

export default SideBar;
