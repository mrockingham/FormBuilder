import React from "react";
import useBuilderStore from "../../stores/designBuilderStore";
import { FormElements } from "../FormElements";
import { Button, Divider } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useBuilderStore();

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type]?.propertiesComponent;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Element Properties</h3>
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Divider style={{ marginBottom: "30px" }} />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSidebar;
