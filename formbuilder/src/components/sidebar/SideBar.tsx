import React from "react";
import { FormElements } from "../FormElements";
import SidebarBtnElement from "./SidebarBtnElement";
import useBuilderStore from "../../stores/designBuilderStore";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSideBar from "./PropertiesFormSidebar";

const SideBar = () => {
  const { selectedElement } = useBuilderStore();
  return (
    <aside
      style={{
        height: "100%",
        width: "400px",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "10px",
        border: "1px solid black",
        overflowY: "auto",
        backgroundColor: "gray",
      }}
    >
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSideBar />}
    </aside>
  );
};

export default SideBar;
